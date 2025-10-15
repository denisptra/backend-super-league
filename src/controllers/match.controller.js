// controllers/match.controller.js
const matchRepository = require("../repositories/match.repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ===================== UTIL: Hitung Result =====================
function resultForTeamA(a, b) {
  if (a > b) return "W";
  if (a === b) return "D";
  return "L";
}

function buildDeltas(scoreA, scoreB, mode = "apply") {
  const mul = mode === "rollback" ? -1 : 1;
  const resA = resultForTeamA(scoreA, scoreB);

  let winA = 0, drawA = 0, lossA = 0, ptsA = 0;
  let winB = 0, drawB = 0, lossB = 0, ptsB = 0;

  if (resA === "W") { winA = 1; lossB = 1; ptsA = 3; }
  else if (resA === "D") { drawA = 1; drawB = 1; ptsA = 1; ptsB = 1; }
  else { lossA = 1; winB = 1; ptsB = 3; }

  return {
    A: { played: 1*mul, win: winA*mul, draw: drawA*mul, loss: lossA*mul, gf: scoreA*mul, ga: scoreB*mul, points: ptsA*mul },
    B: { played: 1*mul, win: winB*mul, draw: drawB*mul, loss: lossB*mul, gf: scoreB*mul, ga: scoreA*mul, points: ptsB*mul }
  };
}

async function updateTeamStats(teamId, delta) {
  return prisma.team.update({
    where: { id: teamId },
    data: {
      played:  { increment: delta.played ?? 0 },
      win:     { increment: delta.win ?? 0 },
      draw:    { increment: delta.draw ?? 0 },
      loss:    { increment: delta.loss ?? 0 },
      gf:      { increment: delta.gf ?? 0 },
      ga:      { increment: delta.ga ?? 0 },
      gd:      { increment: (delta.gf ?? 0) - (delta.ga ?? 0) },
      points:  { increment: delta.points ?? 0 },
    },
  });
}

async function applyBoth(teamAId, teamBId, deltaA, deltaB) {
  await prisma.$transaction([
    updateTeamStats(teamAId, deltaA),
    updateTeamStats(teamBId, deltaB)
  ]);
}

// ===================== CONTROLLER =====================

// GET ALL MATCHES (WITH STATUS FILTER)
const getAllMatches = async (req, res) => {
  try {
    const { status } = req.query;
    const matches = await matchRepository.findAllMatches(status);

    if (!matches.length) {
      return res.status(404).json({
        status: "error",
        message: status ? `Tidak ada match dengan status ${status}.` : "Tidak ada match.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "OK",
      data: matches,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// GET MATCH BY ID
const getMatchById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const match = await matchRepository.findMatchById(id);

    if (!match) {
      return res.status(404).json({ status: "error", message: "Match tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: match });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// CREATE MATCH
const createMatch = async (req, res) => {
  try {
    const { team_a, team_b, date, location, status, score_a, score_b } = req.body;
    if (!team_a || !team_b || !date || !location) {
      return res.status(400).json({
        status: "error",
        message: "team_a, team_b, date, location wajib",
      });
    }

    const match = await matchRepository.createMatch({
      team_a: Number(team_a),
      team_b: Number(team_b),
      date: new Date(date),
      location,
      status: status || "Incoming",
      score_a: Number(score_a) || 0,
      score_b: Number(score_b) || 0,
    });

    if (match.status === "Finished") {
      const { A, B } = buildDeltas(match.score_a, match.score_b, "apply");
      await applyBoth(match.team_a, match.team_b, A, B);
    }

    res.status(201).json({ status: "success", message: "Match dibuat", data: match });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// UPDATE MATCH
const updateMatch = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const before = await matchRepository.findMatchById(id);
    if (!before) {
      return res.status(404).json({ status: "error", message: "Match tidak ditemukan" });
    }

    const nextStatus = req.body.status ?? before.status;
    const nextScoreA = Number(req.body.score_a) || before.score_a;
    const nextScoreB = Number(req.body.score_b) || before.score_b;

    if (before.status === "Finished") {
      const { A, B } = buildDeltas(before.score_a, before.score_b, "rollback");
      await applyBoth(before.team_a, before.team_b, A, B);
    }

    const updated = await matchRepository.updateMatch(id, {
      status: nextStatus,
      score_a: nextScoreA,
      score_b: nextScoreB,
    });

    if (updated.status === "Finished") {
      const { A, B } = buildDeltas(updated.score_a, updated.score_b, "apply");
      await applyBoth(updated.team_a, updated.team_b, A, B);
    }

    res.status(200).json({ status: "success", message: "Match diperbarui", data: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// DELETE MATCH
const deleteMatch = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const before = await matchRepository.findMatchById(id);
    if (!before) {
      return res.status(404).json({ status: "error", message: "Match tidak ditemukan" });
    }

    if (before.status === "Finished") {
      const { A, B } = buildDeltas(before.score_a, before.score_b, "rollback");
      await applyBoth(before.team_a, before.team_b, A, B);
    }

    await matchRepository.deleteMatch(id);
    res.status(200).json({ status: "success", message: "Match dihapus" });
  } catch (error) {
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
