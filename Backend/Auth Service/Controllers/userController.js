const poolPromise = require("../config/pool");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqp = require('amqplib')
//TOKEN = 2a$04$KcqhuNgF9kO

const userControllers = {
  Register: async (req, res) => {
    const { userName, email, Name, password } = req.body;

    try {
      let pool = await poolPromise();
      const hashedPwd = await bcrypt.hash(password, 1);
      let insertQry = await pool.request()
      .input('userName', userName)
      .input('email', email)
      .input('name', Name)
      .input('password', password)
      .execute(`dbo.RegisterUser`)
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
        // try {
        //   async function connect() {
        //     const amqpServer = "amqp://localhost:15672";
        //       connection = await amqp.connect(amqpServer);
        //      channel = await connection.createChannel();
        //     await channel.assertQueue("registrationDetails");
        //   }
        //   connect();
        //   channel.sendToQueue(
        //     "registrationDetails",
        //     Buffer.from(
        //         JSON.stringify({
        //             name,
        //             email,
        //         })
        //     )
        // )
        //  channel.assertQueue("registrationDetails");      
        //  channel.consume("registrationDetails", (data)=>{
        //   console.log(JSON.parse(data.content))
        //   channel.ack(data)
        // })
        // } catch (error) {
        //   console.log(error.message)
        // }
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
        console.log(error.message)
        res.status(503).json({
          message: error.message,
        });return;
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let pool = await poolPromise();
      let findUser =
        await pool.request()
        .input('email', email)
        .execute(`dbo.LoginUser`)
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
      await pool.request()
        .input('userName', userName)
        .input('name', Name)
        .input('email', email)
        .execute(`dbo.UpdateUser`)
        if(updateProfile){
          res.status(200).json({
            success: true,
            message: "Profile updated successfully",
          });
        }
        return;
    } catch (error) {
      if (//should be changed
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
