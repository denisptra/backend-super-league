const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.findAllUsers();
    if (!users.length) {
      return res.status(404).json({
        status: "error",
        message: "Tidak ada user yang ditemukan.",
        data: [],
      });
    }

    users.forEach((user) => delete user.password);

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil semua data user.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findUserById(id);
    if (!user) {
      return res.status(404).json({
        status: "Tidak ditemukan",
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    delete user.password;
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Field name, email, dan password wajib diisi.",
      });
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email sudah digunakan.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const safeRole = ["Writer", "Editor"].includes(role) ? role : "Writer";

    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
    });

    delete user.password;
    res.status(201).json({
      status: "success",
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const existingUser = await userRepository.findUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : existingUser.password;

    const safeRole = ["Writer", "Editor"].includes(role)
      ? role
      : existingUser.role;

    const updatedUser = await userRepository.updateUser(id, {
      name: name || existingUser.name,
      email: email || existingUser.email,
      password: hashedPassword,
      role: safeRole,
    });

    delete updatedUser.password;

    res.status(200).json({
      status: "success",
      message: `User dengan ID ${id} berhasil diperbarui.`,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await userRepository.findUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        status: "fail",
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    await userRepository.deleteUser(id);
    res.status(200).json({
      status: "success",
      message: "User berhasil dihapus.",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
