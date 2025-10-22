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

const updateNews = async (id, updateData) => {
  try {
    const updatedNews = await prisma.news.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    return updatedNews;
  } catch (error) {
    throw new Error(`Gagal memperbarui berita: ${error.message}`);
  }
};

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
