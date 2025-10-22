// repositories/match.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findAllMatches = async (status) => {
  const whereClause = status ? { status: status } : {};
  return prisma.match.findMany({
    where: whereClause,
    include: {
      homeTeam: { select: { id: true, name: true, short_name: true } },
      awayTeam: { select: { id: true, name: true, short_name: true } },
    },
    orderBy: { date: 'asc' },
  });
};

const findMatchById = async (id) => {
  return prisma.match.findUnique({
    where: { id: id },
    include: {
      homeTeam: { select: { id: true, name: true, short_name: true } },
      awayTeam: { select: { id: true, name: true, short_name: true } },
    },
  });
};

const createMatch = async (data) => {
  return prisma.match.create({ data });
};

const updateMatch = async (id, data) => {
  return prisma.match.update({
    where: { id: id },
    data,
  });
};

const deleteMatch = async (id) => {
  return prisma.match.delete({ where: { id: id } });
};

module.exports = {
  findAllMatches,
  findMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};