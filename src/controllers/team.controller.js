// controllers/team.controller.js
const teamRepository = require("../repositories/team.repository");

// GET ALL TEAMS
const getAllTeams = async (req, res) => {
  try {
    const teams = await teamRepository.findAllTeams();

    if (!teams.length) {
      return res.status(404).json({
        status: "error",
        message: "Tidak ada tim yang ditemukan.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil semua tim.",
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// GET TEAM BY ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamRepository.findTeamById(id);

    if (!team) {
      return res.status(404).json({
        status: "error",
        message: `Tim dengan ID ${id} tidak ditemukan.`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil data tim.",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// CREATE TEAM
const createTeam = async (req, res) => {
  try {
    const { name, short_name, image, description, played, win, draw, loss, points } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Field name wajib diisi.",
      });
    }

    const team = await teamRepository.createTeam({
      name,
      short_name: short_name || null,
      image: image || null,
      description: description || null,
      played: played ?? 0,
      win: win ?? 0,
      draw: draw ?? 0,
      loss: loss ?? 0,
      points: points ?? 0,
    });

    res.status(201).json({
      status: "success",
      message: "Tim berhasil dibuat.",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// UPDATE TEAM
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, short_name, image, description, played, win, draw, loss, points } = req.body;

    const existingTeam = await teamRepository.findTeamById(id);
    if (!existingTeam) {
      return res.status(404).json({
        status: "error",
        message: `Tim dengan ID ${id} tidak ditemukan.`,
      });
    }

    const updatedTeam = await teamRepository.updateTeam(id, {
      name: name || existingTeam.name,
      short_name: short_name ?? existingTeam.short_name,
      image: image ?? existingTeam.image,
      description: description ?? existingTeam.description,
      played: played ?? existingTeam.played,
      win: win ?? existingTeam.win,
      draw: draw ?? existingTeam.draw,
      loss: loss ?? existingTeam.loss,
      points: points ?? existingTeam.points,
    });

    res.status(200).json({
      status: "success",
      message: `Tim dengan ID ${id} berhasil diperbarui.`,
      data: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// DELETE TEAM
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTeam = await teamRepository.findTeamById(id);
    if (!existingTeam) {
      return res.status(404).json({
        status: "error",
        message: `Tim dengan ID ${id} tidak ditemukan.`,
      });
    }

    await teamRepository.deleteTeam(id);

    res.status(200).json({
      status: "success",
      message: "Tim berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
