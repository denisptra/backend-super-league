// controllers/match.controller.js
const matchRepository = require("../repositories/match.repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function resultForTeamA(a, b) {
  if (a > b) return "W";
  if (a === b) return "D";
  return "L";
}

function resultForTeamB(resultA) {
  if (resultA === "W") return "L";
  if (resultA === "D") return "D";
  return "W";
}

function buildDeltas(scoreA, scoreB, mode = "apply") {
  const mul = mode === "rollback" ? -1 : 1;
  const resA = resultForTeamA(scoreA, scoreB);

  let winA = 0,
    drawA = 0,
    lossA = 0,
    ptsA = 0;
  let winB = 0,
    drawB = 0,
    lossB = 0,
    ptsB = 0;

  if (resA === "W") {
    winA = 1;
    lossB = 1;
    ptsA = 3;
  } else if (resA === "D") {
    drawA = 1;
    drawB = 1;
    ptsA = 1;
    ptsB = 1;
  } else {
    lossA = 1;
    winB = 1;
    ptsB = 3;
  }

  return {
    A: {
      played: 1 * mul,
      win: winA * mul,
      draw: drawA * mul,
      loss: lossA * mul,
      gf: scoreA * mul,
      ga: scoreB * mul,
      points: ptsA * mul,
    },
    B: {
      played: 1 * mul,
      win: winB * mul,
      draw: drawB * mul,
      loss: lossB * mul,
      gf: scoreB * mul,
      ga: scoreA * mul,
      points: ptsB * mul,
    },
  };
}

async function updateTeamStats(teamId, delta, matchResult, mode = "apply") {
  try {
    // 1. Ambil data Standing saat ini untuk memproses Form
    const standing = await prisma.standing.findUnique({
      where: { teamId: teamId },
      select: { form: true },
    });

    // JIKA STANDING TIDAK ADA, LEMPAR ERROR CUSTOM
    if (!standing) {
      throw new Error(
        `Standing record for team ID ${teamId} not found. Cannot update stats.`
      );
    }

    // ... (Sisa logika form (currentForm, newForm) tetap sama) ...
    const currentForm = standing?.form || "";
    let newForm = currentForm;
    const maxFormLength = 3;

    // Logika Pembaruan Form (mode 'apply'/'rollback')
    // ...
    if (mode === "apply") {
      newForm = matchResult + newForm;
      if (newForm.length > maxFormLength) {
        newForm = newForm.substring(0, maxFormLength);
      }
    } else if (mode === "rollback") {
      if (newForm.startsWith(matchResult) && newForm.length > 0) {
        newForm = newForm.substring(1);
      }
    }

    // 2. Lakukan update statistik
    return prisma.standing.update({
      where: { teamId: teamId }, // <-- Ini harus ada!
      data: {
        played: { increment: delta.played ?? 0 },
        // ... (statistik lainnya) ...
        gd: { increment: (delta.gf ?? 0) - (delta.ga ?? 0) },
        points: { increment: delta.points ?? 0 },
        form: newForm,
      },
    });
  } catch (error) {
    // Lempar ulang error dengan detail
    throw new Error(
      `[STANDING UPDATE FAILED for Team ${teamId}] Original Error: ${error.message}`
    );
  }
}

async function applyBoth(
  teamAId,
  teamBId,
  deltaA,
  deltaB,
  resultA,
  resultB,
  mode
) {
  await prisma.$transaction([
    updateTeamStats(teamAId, deltaA, resultA, mode),
    updateTeamStats(teamBId, deltaB, resultB, mode),
  ]);
}

const getAllMatches = async (req, res) => {
  try {
    const { status } = req.query;
    const matches = await matchRepository.findAllMatches(status);

    if (!matches || matches.length === 0) {
      return res
        .status(404)
        .json({
          status: "error",
          message: status
            ? `Tidak ada match dengan status ${status}.`
            : "Tidak ada match.",
          data: [],
        });
    }
    res.status(200).json({ status: "success", message: "OK", data: matches });
  } catch (error) {
    console.error("Error in getAllMatches:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getMatchById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const match = await matchRepository.findMatchById(id);
    if (!match) {
      return res
        .status(404)
        .json({ status: "error", message: "Match tidak ditemukan" });
    }
    res.status(200).json({ status: "success", data: match });
  } catch (error) {
    console.error("Error in getMatchById:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const createMatch = async (req, res) => {
  try {
    const { team_a, team_b, date, location, status, score_a, score_b } =
      req.body;

    if (!team_a || !team_b || !location || !date) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "team_a, team_b, location, dan date wajib diisi.",
        });
    }

    const matchDate = new Date(date);
    if (isNaN(matchDate.getTime())) {
      return res
        .status(400)
        .json({ status: "error", message: "Format tanggal tidak valid." });
    }

    const match = await matchRepository.createMatch({
      team_a: Number(team_a),
      team_b: Number(team_b),
      date: matchDate,
      location: String(location),
      status: status || "Incoming",
      score_a: Number(score_a) || 0,
      score_b: Number(score_b) || 0,
    });

    if (match.status === "Finished") {
      const resultA = resultForTeamA(match.score_a, match.score_b);
      const resultB = resultForTeamB(resultA);
      const { A, B } = buildDeltas(match.score_a, match.score_b, "apply");

      await applyBoth(
        match.team_a,
        match.team_b,
        A,
        B,
        resultA,
        resultB,
        "apply"
      );
    }

    res
      .status(201)
      .json({ status: "success", message: "Match dibuat", data: match });
  } catch (error) {
    console.error("Error in createMatch:", error);
    // Tambahkan penanganan error Foreign Key (P2003)
    if (error.code === "P2003") {
      return res
        .status(400)
        .json({
          status: "error",
          message: "ID Tim (team_a atau team_b) tidak ditemukan di database.",
        });
    }
    // Tambahkan penanganan error Record Not Found (P2025) - sangat mungkin dari updateTeamStats
    if (error.code === "P2025") {
      return res
        .status(400)
        .json({
          status: "error",
          message:
            "Statistik Standing untuk salah satu tim tidak ditemukan. Pastikan tim memiliki entri di Standing.",
        });
    }
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const updateMatch = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "ID harus angka" });
    }

    const before = await matchRepository.findMatchById(id);
    if (!before) {
      return res
        .status(404)
        .json({ status: "error", message: "Match tidak ditemukan" });
    }

    const nextStatus = req.body.status || before.status;
    const nextScoreA =
      req.body.score_a !== undefined
        ? Number(req.body.score_a)
        : before.score_a;
    const nextScoreB =
      req.body.score_b !== undefined
        ? Number(req.body.score_b)
        : before.score_b;
    const nextDate = req.body.date ? new Date(req.body.date) : before.date;
    const nextLocation = req.body.location ?? before.location;

    // ROLLBACK STANDING LAMA
    if (before.status === "Finished") {
      const resultA = resultForTeamA(before.score_a, before.score_b);
      const resultB = resultForTeamB(resultA);
      const { A, B } = buildDeltas(before.score_a, before.score_b, "rollback");
      await applyBoth(
        before.team_a,
        before.team_b,
        A,
        B,
        resultA,
        resultB,
        "rollback"
      );
    }

    const updated = await matchRepository.updateMatch(id, {
      status: nextStatus,
      score_a: nextScoreA,
      score_b: nextScoreB,
      date: nextDate,
      location: nextLocation,
    });

    // APPLY STANDING BARU
    if (updated.status === "Finished") {
      const resultA = resultForTeamA(updated.score_a, updated.score_b);
      const resultB = resultForTeamB(resultA);
      const { A, B } = buildDeltas(updated.score_a, updated.score_b, "apply");
      await applyBoth(
        updated.team_a,
        updated.team_b,
        A,
        B,
        resultA,
        resultB,
        "apply"
      );
    }

    res
      .status(200)
      .json({ status: "success", message: "Match diperbarui", data: updated });
  } catch (error) {
    console.error("Error in updateMatch:", error);
    if (error.code === "P2025") {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Statistik Standing untuk salah satu tim tidak ditemukan.",
        });
    }
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const before = await matchRepository.findMatchById(id);
    if (!before) {
      return res
        .status(404)
        .json({ status: "error", message: "Match tidak ditemukan" });
    }

    if (before.status === "Finished") {
      const resultA = resultForTeamA(before.score_a, before.score_b);
      const resultB = resultForTeamB(resultA);
      const { A, B } = buildDeltas(before.score_a, before.score_b, "rollback");
      await applyBoth(
        before.team_a,
        before.team_b,
        A,
        B,
        resultA,
        resultB,
        "rollback"
      );
    }

    await matchRepository.deleteMatch(id);
    res.status(200).json({ status: "success", message: "Match dihapus" });
  } catch (error) {
    console.error("Error in deleteMatch:", error);
    if (error.code === "P2025") {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Statistik Standing untuk salah satu tim tidak ditemukan.",
        });
    }
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
