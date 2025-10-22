const teamRepository = require("../repositories/team.repository");

const getLeagueStandings = async (req, res) => {
    try {
        const standings = await teamRepository.findStandings();
        
        const formattedStandings = standings.map((team, index) => ({
            rank: index + 1,
            id: team.id,
            name: team.name,
            short_name: team.short_name,
            image: team.image,
            ...team.standing,
        }));

        res.status(200).json({
            status: "success",
            message: "Klasemen berhasil diambil",
            data: formattedStandings,
        });

    } catch (error) {
        console.error("Error in getLeagueStandings:", error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

module.exports = {
    getLeagueStandings,
};