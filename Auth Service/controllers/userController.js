const poolPromise = require("../config/pool");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userControllers = {
  Register: async (req, res) => {
    const { userName, email, name, password } = req.body;
    try {
      let pool = await poolPromise();
      const hashedPwd = await bcrypt.hash(password, 1);
      console.log(hashedPwd);
      let insertQry = await pool.query(
        `INSERT INTO Users(Username, Email, Name, Password) VALUES ('${userName}','${email}','${name}', '${hashedPwd}')`
      );
      if (insertQry) {
        const token = jwt.sign({ email: email }, process.env.TOKEN, {
          expiresIn: "20m",
        });
        res.status(201).json({
          success: true,
          user: { userName, email },
          message: "user added",
          token: token,
        });
        return;
      }
    } catch (error) {
      if (
        error.message ===
        `Violation of UNIQUE KEY constraint 'UQ__Users__737584F6AB5E7840'. Cannot insert duplicate key in object 'dbo.Users'. The duplicate key value is (${email}).`
      ) {
        res.status(404).json({
          message: "email is already a user please login",
        });
        return;
      } else if (
        error.message ===
        `Violation of UNIQUE KEY constraint 'UQ__Users__737584F6AB5E7840'. Cannot insert duplicate key in object 'dbo.Users'. The duplicate key value is (${userName}).`
      ) {
        res.status(404).json({
          message: "Username is already taken",
        });
        return;
      } else {
        return res.status(503).json({
          message: error.message,
        });
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let pool = await poolPromise();
      let findUser =
        await pool.query(`SELECT *FROM Users WHERE Email = '${email}'`);
      if (findUser.recordset.length > 0) {
        const user = findUser.recordset[0];

        const auth = await bcrypt.compare(password, user.Password);

        if (auth) {
          const token = jwt.sign({ email: email }, process.env.TOKEN, {
            expiresIn: "20m",
          });
          res.status(200).json({
            email: email,
            message: "Successful login",
            token: token,
          });
          return;
        } else {
          res.status(403).json({
            message: "Wrong Password try again",
          });
          return;
        }
      } else {
        res.status(404).json({
          message: "Email not found please signup",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  ProfileUpdate: async (req, res) => {
    //should be a required field in the frontend so that each value should be filled.
    const { userName, Name, email } = req.body;
    try {
      let pool = await poolPromise();
      const updateProfile = 
      await pool
        .query(
          `UPDATE Users SET Username = '${userName}', Name = '${Name}' WHERE Email = '${email}'`
        )
        if(updateProfile){
          res.status(200).json({
            success: true,
            message: "Profile updated successfully",
          });
        }
        return;
    } catch (error) {
      if (
        error.message ===
        `Violation of UNIQUE KEY constraint 'UQ__Users__737584F6AB5E7840'. Cannot insert duplicate key in object 'dbo.Users'. The duplicate key value is (${userName}).`
      ) {
        res.status(404).json({
          message: "Username is already taken",
        });
        return;
      } else {
        return res.status(503).json({
          message: error.message,
        });
      }
    }
  },
};

module.exports = { ...userControllers };
