// repositories/team.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTeamWithStanding = async (data) => {
    const teamData = {
        name: data.name,
        short_name: data.short_name,
        image: data.image,
        description: data.description,
    };

    return prisma.$transaction(async (tx) => {
        const team = await tx.team.create({ data: teamData });
        await tx.standing.create({ data: { teamId: team.id } });
        return team;
    });
};

const findAllTeams = async () => {
    return prisma.team.findMany({
        include: { standing: true },
        orderBy: { name: 'asc' }
    });
};

const findTeamById = async (id) => {
    return prisma.team.findUnique({
        where: { id: id },
        include: { standing: true },
    });
};

const updateTeam = async (id, data) => {
    return prisma.team.update({
        where: { id: id },
        data,
    });
};

const deleteTeam = async (id) => {
    const team = await prisma.team.delete({ where: { id: id } });
    return team;
};

const findStandings = async () => {
    return prisma.team.findMany({
        select: {
            id: true,
            name: true,
            short_name: true,
            image: true,
            standing: {
                select: { played: true, win: true, draw: true, loss: true, gf: true, ga: true, gd: true, points: true, form: true }
            }
        },
        orderBy: [
            { standing: { points: 'desc' } },
            { standing: { gd: 'desc' } },   
            { standing: { gf: 'desc' } },   
        ],
    });
};

module.exports = {
    createTeamWithStanding,
    findAllTeams,
    findTeamById,
    updateTeam,
    deleteTeam,
    findStandings,
};