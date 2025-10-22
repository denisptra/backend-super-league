// controllers/team.controller.js
const teamRepository = require("../repositories/team.repository");

const getAllTeams = async (req, res) => {
    try {
        const teams = await teamRepository.findAllTeams();
        if (!teams || teams.length === 0) {
            return res.status(404).json({ status: "error", message: "Tidak ada tim.", data: [] });
        }
        res.status(200).json({ status: "success", message: "OK", data: teams });
    } catch (error) {
        console.error("Error in getAllTeams:", error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

const getTeamById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const team = await teamRepository.findTeamById(id);
        if (!team) {
            return res.status(404).json({ status: "error", message: "Tim tidak ditemukan" });
        }
        res.status(200).json({ status: "success", data: team });
    } catch (error) {
        console.error("Error in getTeamById:", error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

const createTeam = async (req, res) => {
    try {
        const { name, short_name, image, description } = req.body;
        if (!name || !short_name) {
            return res.status(400).json({ status: "error", message: "name dan short_name wajib" });
        }

        const team = await teamRepository.createTeamWithStanding({
            name: String(name),
            short_name: String(short_name),
            image: image ? String(image) : null,
            description: description ? String(description) : null,
        });

        res.status(201).json({ status: "success", message: "Tim dan Standing berhasil dibuat", data: team });
    } catch (error) {
        console.error("Error in createTeam:", error);
        if (error.code === 'P2002') {
             return res.status(409).json({ status: "error", message: "Tim dengan nama atau short_name tersebut sudah ada." });
        }
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

const updateTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, short_name, image, description } = req.body;
        
        const updated = await teamRepository.updateTeam(id, { name, short_name, image, description });

        res.status(200).json({ status: "success", message: "Tim berhasil diperbarui", data: updated });
    } catch (error) {
        console.error("Error in updateTeam:", error);
        if (error.code === 'P2002') {
             return res.status(409).json({ status: "error", message: "Nama atau short_name sudah digunakan oleh tim lain." });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ status: "error", message: "Tim tidak ditemukan" });
        }
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await teamRepository.deleteTeam(id);
        
        res.status(200).json({ status: "success", message: "Tim dan data terkait berhasil dihapus" });
    } catch (error) {
        console.error("Error in deleteTeam:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ status: "error", message: "Tim tidak ditemukan" });
        }
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
};