const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getAllNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!news.length) {
      return res.status(404).json({
        status: "error",
        message: "Tidak ada user yang ditemukan.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil semua data user.",
      data: news,
    });

  } catch (err) {
    console.error("Error getAllUsers:", err);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

const getNewsrById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({ where: { id: Number(id) } });

    if (!news) {
      return res.status(404).json({
        status: "Fail",
        message: `Berita dengan ID ${id} tidak ditemukan.`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Data Berita berhasil diambil.",
      data: news,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan saat mengambil data berita.",
      error: err.message,
    });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, description, date, status, authorId } = req.body;

    // Validasi input wajib
    if (!title || !description || !authorId) {
      return res.status(400).json({
        status: "error",
        message: "Field title, description, dan authorId wajib diisi.",
      });
    }

    const news = await prisma.news.create({
      data: {
        title,
        description,
        date: date ? new Date(date) : new Date(),
        status: status || "Pending",
        authorId: Number(authorId),
      },
      include: {
        author: true,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Berita berhasil dibuat.",
      data: news,
    });
  } catch (error) {
    console.error("🔥 Error createNews:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 🔍 Cek apakah berita dengan ID tersebut ada
    const newsExist = await prisma.news.findUnique({ where: { id } });
    if (!newsExist) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Berita tidak ditemukan."
      });
    }

    // 🔍 Jika authorId dikirim, pastikan user-nya ada
    if (req.body.authorId) {
      const author = await prisma.user.findUnique({
        where: { id: Number(req.body.authorId) },
      });
      if (!author) {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: `User dengan ID ${req.body.authorId} tidak ditemukan.`,
        });
      }
    }

    // 🛠️ Update berita
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: req.body.title ?? newsExist.title,
        description: req.body.description ?? newsExist.description,
        date: req.body.date ? new Date(req.body.date) : newsExist.date,
        status: req.body.status ?? newsExist.status,
        authorId: req.body.authorId
          ? Number(req.body.authorId)
          : newsExist.authorId,
      },
    });

    // ✅ Respons sukses
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Berita berhasil diperbarui.",
      data: updatedNews,
    });

  } catch (error) {
    console.error("🔥 Error updateNews:", error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const existingNews = await prisma.news.findUnique({ where: { id: Number(id) } });
    if (!existingNews) {
      return res.status(404).json({
        status: "Fail",
        message: `Berita dengan ID ${id} tidak ditemukan.`,
      });
    }

    await prisma.news.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      status: "Success",
      message: "Berita berhasil dihapus.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Gagal menghapus user.",
      error: err.message,
    });
  }
};


module.exports = { 
    getAllNews,
    getNewsrById,
    createNews,
    updateNews,
    deleteNews
};
