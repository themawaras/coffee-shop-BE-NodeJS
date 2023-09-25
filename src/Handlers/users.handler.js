const { showAll, insert, update, del } = require("../Models/users.models");

const getAllUsers = async (req, res) => {
  try {
    const data = await showAll();

    res.status(200).json({
      msg: "Success data retrieve",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// const addNewUser = async (req, res) => {
//   try {
//     const { body } = req;

//     const data = await insert(body.user_fullname, body.user_email, body.user_phone, body.user_password, body.user_address, body.user_admin);

//     res.status(201).json({
//       msg: "Success input user",
//       result: data.rows,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { body, params } = req;

    const data = await update(body.user_fullname, body.user_address, params.user_id);

    res.status(200).json({
      msg: `Data user ${body.user_fullname} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { params } = req;

    const data = await del(params.user_id);

    res.status(200).json({
      msg: `Data user dengan nama ${data.rows[0].user_name}, dengan ID = ${params.user_id} berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  getAllUsers,
  // addNewUser,
  updateUser,
  deleteUser,
};
