const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findAllNews() {
  return prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function findNewsById(id) {
  return prisma.news.findUnique({
    where: { id: Number(id) },
  });
}

async function createNews(data) {
  return prisma.news.create({
    data,
    include: { author: true },
  });
}

async function updateNews(id, data) {
  return prisma.news.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteNews(id) {
  return prisma.news.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  findAllNews,
  findNewsById,
  createNews,
  updateNews,
  deleteNews,
};
