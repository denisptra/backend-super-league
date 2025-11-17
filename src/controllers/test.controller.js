const { appendToSheet } = require('../services/googleSheet')

exports.testAppend = async (req, res, type) => {
  try {
    let values = []

    // Buat data dummy berdasarkan tipe
    if (type === 'teams') {
      const { name, city } = req.body
      values = [type, name, city, new Date().toISOString()]
    } else if (type === 'matches') {
      const { home, away, date } = req.body
      values = [type, home, away, date]
    } else if (type === 'news') {
      const { title, content } = req.body
      values = [type, title, content, new Date().toISOString()]
    } else if (type === 'user') {
      const { username, email } = req.body
      values = [type, username, email, new Date().toISOString()]
    }

    await appendToSheet(values)

    return res.json({ success: true, values })
  } catch (err) {
    console.error('Error append ke sheet:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
