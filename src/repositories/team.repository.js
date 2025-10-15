// repositories/team.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findAllTeams() {
  return prisma.team.findMany({
    orderBy: { createdAt: "desc" },
  });
}
async function findTeamById(id) {
  return prisma.team.findUnique({
    where: { id: Number(id) },
  });
}
async function createTeam(data) {
  return prisma.team.create({
    data,
  });
}

async function updateTeam(id, data) {
  return prisma.team.update({
    where: { id: Number(id) },
    data,
  });
}
async function deleteTeam(id) {
  return prisma.team.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  findAllTeams,
  findTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
