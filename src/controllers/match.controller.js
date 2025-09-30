const matchesData = require("../data/matches");
const teamsData = require("../data/teams");

const populateMatchData = (match) => {
  const teamA = teamsData.find((team) => team.id === match.team_a);
  const teamB = teamsData.find((team) => team.id === match.team_b);
  return {
    ...match,
    team_a: teamA,
    team_b: teamB,
  };
};

const getAllMatches = (_req, res) => {
  const populatedMatches = matchesData.map(populateMatchData);

  res.status(200).json({
    status: "success",
    message: "Data semua pertandingan berhasil diambil.",
    data: populatedMatches,
  });
};

const getMatchById = (req, res) => {
  const matchId = parseInt(req.params.id);
  const match = matchesData.find((m) => m.id === matchId);

  if (match) {
    const populatedMatch = populateMatchData(match);
    res.status(200).json({
      status: "success",
      message: "Data pertandingan berhasil ditemukan.",
      data: populatedMatch,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: `Pertandingan dengan ID ${matchId} tidak ditemukan.`,
    });
  }
};

// const createMatch = (req, res) => {
// const { team_a, team_b, date, location } = req.body;

// // Validasi sederhana
// if (!team_a || !team_b || !date || !location) {
// return res.status(400).json({
// status: 'error',
// message: 'team_a, team_b, date, dan location wajib diisi.'
// });
// }

// const newId = matchesData.length > 0 ? Math.max(...matchesData.map(m => m.id)) + 1 : 1;
// const newMatch = {
// id: newId,
// team_a,
// team_b,
// score_a: null, // Skor default null untuk pertandingan baru
// score_b: null,
// date,
// status: 'upcoming', // Status default
// location,
// created_at: new Date().toISOString(),
// updated_at: new Date().toISOString()
// };

// matchesData.push(newMatch);

// // Kirim kembali data yang sudah di-populate agar lengkap
// const populatedMatch = populateMatchData(newMatch);

// res.status(201).json({
// status: 'success',
// message: 'Pertandingan baru berhasil dibuat.',
// data: populatedMatch
// });
// };

// const updateMatch = (req, res) => {
// const matchId = parseInt(req.params.id);
// const matchIndex = matchesData.findIndex(m => m.id === matchId);

// if (matchIndex === -1) {
// return res.status(404).json({
// status: 'error',
// message: `Pertandingan dengan ID ${matchId} tidak ditemukan.`
// });
// }

// // Ambil data lama dan gabungkan dengan data baru dari body
// const originalMatch = matchesData[matchIndex];
// const updatedMatch = {
// ...originalMatch, // Salin semua data lama
// ...req.body, // Timpa dengan data baru yang dikirim
// updated_at: new Date().toISOString()
// };

// matchesData[matchIndex] = updatedMatch;

// const populatedMatch = populateMatchData(updatedMatch);

// res.status(200).json({
// status: 'success',
// message: 'Data pertandingan berhasil diperbarui.',
// data: populatedMatch
// });
// };

// const deleteMatch = (req, res) => {
// const matchId = parseInt(req.params.id);
// const matchIndex = matchesData.findIndex(m => m.id === matchId);
// if (matchIndex === -1) {
// return res.status(404).json({
// status: 'error',
// message: `Pertandingan dengan ID ${matchId} tidak ditemukan.`
// });
// }
// matchesData.splice(matchIndex, 1);
// res.status(200).json({
// status: 'success',
// message: 'Pertandingan berhasil dihapus.'
// });
// };

module.exports = {
  getAllMatches,
  getMatchById,
  // createMatch,
  // updateMatch,
  // deleteMatch
};
