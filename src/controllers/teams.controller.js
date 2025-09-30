const teamsData = require('../data/teams');

const getAllTeams = (_req, res) => {

  if (teamsData && teamsData.length > 0) {
    res.status(200).json({
        status: 'success',
        message: 'Semua data team berhasil diambil.',
        data: teamsData
    });
  }
    else {
    res.status(404).json({
        status: 'error',
        message: 'Data team tidak ditemukan.',
        data: null
    });
  }
};

const getTeamsById = (req, res) => {
    const teamsId = parseInt(req.params.id);
    const teams = teamsData.find(n => n.id === teamsId);
    if (teams) {
        res.status(200).json({
            status: 'success',
            message: 'Data team berhasil ditemukan.',
            data: teams
        });
    }
    else {
        res.status(404).json({
            status: 'error',
            message: `team dengan ID ${teamsId} tidak ditemukan.`,
            data: null
        });
    }
};

// const createTeams = (req, res) => {
//     const { name, city, stadium } = req.body;
//     const newId = teamsData.length > 0 ? teamsData[teamsData.length - 1].id + 1 : 1;
//     const newTeam = { id: newId, name, city, stadium };
//     teamsData.push(newTeam);
//     res.status(201).json({
//         status: 'success',
//         message: 'Team berhasil ditambahkan.',
//         data: newTeam
//     });
// }

// const updateTeams = (req, res) => {
//     const teamsId = parseInt(req.params.id);
//     const { name, city, stadium } = req.body;
//     const teamIndex = teamsData.findIndex(n => n.id === teamsId);
//     if (teamIndex !== -1) {
//         teamsData[teamIndex] = { id: teamsId, name, city, stadium };
//         res.status(200).json({
//             status: 'success',
//             message: 'Data team berhasil diperbarui.',
//             data: teamsData[teamIndex]
//         });
//     }   
//     else {
//         res.status(404).json({
//             status: 'error',
//             message: `team dengan ID ${teamsId} tidak ditemukan.`,
//             data: null
//         });
//     }
// };

// const deleteTeams = (req, res) => {
//     const teamsId = parseInt(req.params.id);
//     const teamIndex = teamsData.findIndex(n => n.id === teamsId);
//     if (teamIndex !== -1) {
//         const deletedTeam = teamsData.splice(teamIndex, 1);
//         res.status(200).json({
//             status: 'success',
//             message: 'Data team berhasil dihapus.',
//             data: deletedTeam[0]
//         });
//     }
//     else {
//         res.status(404).json({
//             status: 'error',
//             message: `team dengan ID ${teamsId} tidak ditemukan.`,
//             data: null
//         });
//     }
// };

module.exports = {
    getAllTeams,
    getTeamsById
    // createTeams,
    // updateTeams,
    // deleteTeams
};