const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { createUser, getPwd } = require("../Models/auth.model");
const { jwtKey, jwtIssuer } = require("../Configs/environment");

const register = async (req, res) => {
  try {
    const { body } = req;
    const hashedPassword = await argon.hash(body.user_password);
    const data = await createUser(body.user_fullname, body.user_email, body.user_phone, hashedPassword, body.user_address);

    res.status(201).json({
      msg: "Success input user",
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
    if (err.code === "23505") {
      if (err.constraint.includes("phone_unique"))
        return res.status(400).json({
          msg: "Phone number has already been registered",
        });
      return res.status(400).json({
        msg: "Email has already been registered",
      });
    }
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const result = await getPwd(email);
    if (!result.rows.length)
      return res.status(404).json({
        msg: "Email or password is wrong",
      });
    const { user_password, ID, userName, isAdmin } = result.rows[0];
    const isValid = await argon.verify(user_password, password);
    if (!isValid)
      return res.status(401).json({
        msg: "Email or password is wrong",
      });

    const payload = {
      ID,
      isAdmin,
    };

    jwt.sign(
      payload,
      jwtKey,
      {
        expiresIn: "10m",
        issuer: jwtIssuer,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: `Welcome ${userName}!`,
          data: {
            token,
            userInfo: userName,
            email,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

module.exports = { register, login };
