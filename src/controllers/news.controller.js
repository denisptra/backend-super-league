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
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID harus berupa angka.",
      });
    }

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

    const author = await userRepository.findUserById(Number(authorId));
    if (!author) {
      return res.status(404).json({
        status: "error",
        message: `Author dengan ID ${authorId} tidak ditemukan.`,
      });
    }

    const newsData = {
      title,
      description,
      image: req.body.image,
      date: date ? new Date(date) : new Date(),
      status: status || "Pending",
      authorId: Number(authorId),
    };

    const news = await newsRepository.createNews(newsData);

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
    if (isNaN(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID harus berupa angka.",
      });
    }

    const newsExist = await newsRepository.findNewsById(id);
    if (!newsExist) {
      return res.status(404).json({
        status: "error",
        message: "Berita tidak ditemukan.",
      });
    }

    const updateData = {};
    const allowedFields = [
      "title",
      "description",
      "image",
      "date",
      "status",
      "authorId",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.authorId) {
      const authorIdNum = Number(updateData.authorId);
      if (isNaN(authorIdNum)) {
        return res.status(400).json({
          status: "error",
          message: "Author ID harus berupa angka.",
        });
      }

      const author = await userRepository.findUserById(authorIdNum);
      if (!author) {
        return res.status(404).json({
          status: "error",
          message: `Author dengan ID ${authorIdNum} tidak ditemukan.`,
        });
      }
      updateData.authorId = authorIdNum;
    } 

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Tidak ada data yang dikirim untuk diperbarui.",
      });
    }

    const updatedNews = await newsRepository.updateNews(id, updateData);

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
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID harus berupa angka.",
      });
    }

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
