// repositories/match.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findAllMatches(status) {
  const where = status ? { status } : {};
  return prisma.match.findMany({
    where,
    include: { homeTeam: true, awayTeam: true },
    orderBy: { date: "desc" },
  });
}

async function findMatchById(id) {
  return prisma.match.findUnique({
    where: { id: Number(id) },
    include: { homeTeam: true, awayTeam: true },
  });
}

// Create match
async function createMatch(data) {
  return prisma.match.create({
    data,
    include: { homeTeam: true, awayTeam: true },
  });
}

// Update match
async function updateMatch(id, data) {
  return prisma.match.update({
    where: { id: Number(id) },
    data,
    include: { homeTeam: true, awayTeam: true },
  });
}

// Delete match
async function deleteMatch(id) {
  return prisma.match.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  findAllMatches,
  findMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
