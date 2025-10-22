const authService = require("../services/auth.service");

const registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  return res.status(200).json({
    message: "Logout berhasil. Silakan hapus token di client."
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
