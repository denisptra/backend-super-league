const newsRepository = require("../repositories/news.repository");
const userRepository = require("../repositories/user.repository");

const getAllNews = async (req, res) => {
  try {
    const news = await newsRepository.findAllNews();

    if (!news.length) {
      return res.status(404).json({
        status: "error",
        message: "Tidak ada berita yang ditemukan.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil semua data berita.",
      data: news,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
    });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsRepository.findNewsById(id);

    if (!news) {
      return res.status(404).json({
        status: "fail",
        message: `Berita dengan ID ${id} tidak ditemukan.`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data berita berhasil diambil.",
      data: news,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, description, date, status, authorId } = req.body;

    if (!title || !description || !authorId) {
      return res.status(400).json({
        status: "error",
        message: "Field title, description, dan authorId wajib diisi.",
      });
    }

    const author = await userRepository.findUserById(authorId);
    if (!author) {
      return res.status(404).json({
        status: "error",
        message: `Author dengan ID ${authorId} tidak ditemukan.`,
      });
    }

    const news = await newsRepository.createNews({
      title,
      description,
      date: date ? new Date(date) : new Date(),
      status: status || "Pending",
      authorId: Number(authorId),
    });

    res.status(201).json({
      status: "success",
      message: "Berita berhasil dibuat.",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const newsExist = await newsRepository.findNewsById(id);
    if (!newsExist) {
      return res.status(404).json({
        status: "error",
        message: "Berita tidak ditemukan.",
      });
    }

    if (req.body.authorId) {
      const author = await userRepository.findUserById(req.body.authorId);
      if (!author) {
        return res.status(404).json({
          status: "error",
          message: `Author dengan ID ${req.body.authorId} tidak ditemukan.`,
        });
      }
    }

    const updatedNews = await newsRepository.updateNews(id, {
      title: req.body.title ?? newsExist.title,
      description: req.body.description ?? newsExist.description,
      date: req.body.date ? new Date(req.body.date) : newsExist.date,
      status: req.body.status ?? newsExist.status,
      authorId: req.body.authorId
        ? Number(req.body.authorId)
        : newsExist.authorId,
    });

    res.status(200).json({
      status: "success",
      message: "Berita berhasil diperbarui.",
      data: updatedNews,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const existingNews = await newsRepository.findNewsById(id);
    if (!existingNews) {
      return res.status(404).json({
        status: "fail",
        message: `Berita dengan ID ${id} tidak ditemukan.`,
      });
    }

    await newsRepository.deleteNews(id);

    res.status(200).json({
      status: "success",
      message: "Berita berhasil dihapus.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
