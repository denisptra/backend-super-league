const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!users.length) {
      return res.status(404).json({
        status: "error",
        message: "Tidak ada user yang ditemukan.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil semua data user.",
      data: users,
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Data user berhasil diambil.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan saat mengambil data user.",
      error: err.message,
    });
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

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email sudah digunakan.",
      });
    }

    const user = await prisma.user.create({
      data: { name, email, password, role: role || "Writer" },
    });

    // sql : insert into User (name, email, password, role) values (values 1), (values 2), (values 3);

    res.status(201).json({
      status: "success",
      message: "User berhasil dibuat",
      data: user,
    });

  } catch (err) {
    console.error("Error createUser:", err);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        role: role || user.role,
      },
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: `User dengan ID ${id} berhasil diperbarui.`,
      data: updatedUser,
    });

  } catch (err) {
    console.error(" Error updateUser:", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi kesalahan pada server.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!existingUser) {
      return res.status(404).json({
        status: "Fail",
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      status: "Success",
      message: "User berhasil dihapus.",
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
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
