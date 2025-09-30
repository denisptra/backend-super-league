const userData = require('../data/users');

const getAllUsers = (_req, res) => {
  if (userData && userData.length > 0) {
    res.status(200).json({
      status: "success",
      message: "Semua data user berhasil diambil.",
      data: userData,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Data user tidak ditemukan.",
      data: null,
    });
  }
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);

  const user = userData.find((n) => n.id === userId);

  if (user) {
    res.status(200).json({
      status: "success",
      message: "Data user berhasil ditemukan.",
      data: user,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: `user dengan ID ${userId} tidak ditemukan.`,
      data: null,
    });
  }
};
// const createUser = (req, res) => {
//   const { username, email, name, password, confirmPassword, role } = req.body;
//   const newId =
//     userData.length > 0 ? userData[userData.length - 1].id + 1 : 1;
//   const newUser = {
//     id: newId,
//     username,
//     email,
//     name,
//     password,
//     confirmPassword,
//     role,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
//   userData.push(newUser);
//   res.status(201).json({
//     status: "success",
//     message: "User berhasil ditambahkan.",
//     data: newUser,
//   });
// };
// const updateUser = (req, res) => {
//   const userId = parseInt(req.params.id);
//   const { username, email, name, password, confirmPassword, role } = req.body;
//   const userIndex = userData.findIndex((n) => n.id === userId);
//   if (userIndex !== -1) {
//     userData[userIndex] = {
//       id: userId,
//       username,
//       email,
//       name,
//       password,
//       confirmPassword,
//       role,
//       createdAt: userData[userIndex].createdAt,
//       updatedAt: new Date(),
//     };
//     res.status(200).json({
//       status: "success",
//       message: "Data user berhasil diperbarui.",
//       data: userData[userIndex],
//     });
//   } else {
//     res.status(404).json({
//       status: "error",
//       message: `user dengan ID ${userId} tidak ditemukan.`,
//       data: null,
//     });
//   }
// };
// const deleteUser = (req, res) => {
//   const userId = parseInt(req.params.id);
//   const userIndex = userData.findIndex((n) => n.id === userId);
//   if (userIndex !== -1) {
//     const deletedUser = userData.splice(userIndex, 1);
//     res.status(200).json({
//       status: "success",
//       message: "Data user berhasil dihapus.",
//       data: deletedUser[0],
//     });
//   } else {
//     res.status(404).json({
//       status: "error",
//       message: `user dengan ID ${userId} tidak ditemukan.`,
//       data: null,
//     });
//   }
// };

module.exports = {
  getAllUsers,
  getUserById
  // createUser,
  // updateUser,
  // deleteUser,
};
