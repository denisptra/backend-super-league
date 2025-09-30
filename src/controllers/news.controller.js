const newsData = require('../data/news');

const getAllNews = (_req, res) => {
  if (newsData && newsData.length > 0) {
    res.status(200).json({
        status: 'success',
        message: 'Semua data berita berhasil diambil.',
        data: newsData
    });
  }
    else {
    res.status(404).json({
        status: 'error',
        message: 'Data berita tidak ditemukan.',
        data: null
    });
  }
};

const getNewsById = (req, res) => {
    const newsId = parseInt(req.params.id);
    const news = newsData.find(n => n.id === newsId);

    if (news) {
        res.status(200).json({
            status: 'success',
            message: 'Data berita berhasil ditemukan.',
            data: news
        });
    }
    else {
        res.status(404).json({
            status: 'error',
            message: `Berita dengan ID ${newsId} tidak ditemukan.`,
            data: null
        });
    }
};

module.exports = {
    getAllNews,
    getNewsById
};