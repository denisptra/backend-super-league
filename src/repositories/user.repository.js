// repositories/user.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ambil semua user
async function findAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Ambil user by ID
async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
}

// Cari user by email
async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Buat user baru
async function createUser(data) {
  return prisma.user.create({ data });
}

// Update user
async function updateUser(id, data) {
  return prisma.user.update({
    where: { id: Number(id) },
    data,
  });
}

// Delete user
async function deleteUser(id) {
  return prisma.user.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
