const poolPromise = require('../config/pool');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userControllers = {
    Register: async (req, res) => {
        const { userName, email, password } = req.body;
        try {
            let pool = await poolPromise();
            const hashedPwd = await bcrypt.hash(password, 4);
            console.log(hashedPwd)
            let insertQry = await pool.query(`INSERT INTO users(userName, email, userPassword) values ('${userName}','${email}', '${hashedPwd}')`)
            if (insertQry) {
                const token = jwt.sign({ email: email }, process.env.TOKEN, {
                    expiresIn: '20m'
                })
                res.status(201).json({
                    success: true,
                    user: { userName, email },
                    message: 'user added',
                    token:token,
                });

                try {
                    async function connect() {
                      const amqpServer = "amqp://localhost:15672";
                      connection = await amqp.connect(amqpServer);
                      channel = await connection.createChannel();
                      await channel.assertQueue("registrationDetails");
                    }
                    connect();
                    
                    channel.sendToQueue(
                      "registrationDetails",
                      Buffer.from(
                          JSON.stringify({
                              name,
                              email,
                          })
                      )
                  )
                   channel.assertQueue("registrationDetails");      
                  await channel.consume("registrationDetails", (data)=>{
                    console.log(JSON.parse(data.content))
                    channel.ack(data)
                  })
                  } catch (error) {
                    console.log(error.message)
                  }
            }


        } catch (error) {
            if(error.message === `Violation of UNIQUE KEY constraint 'UQ__users__AB6E61648CC458F1'. Cannot insert duplicate key in object 'dbo.users'. The duplicate key value is (${email}).`){
                res.status(404).json({
                    message:'email is already a user please login'
                }); return;
            } else if (error.message === `Violation of UNIQUE KEY constraint 'UQ__users__66DCF95C1778F959'. Cannot insert duplicate key in object 'dbo.users'. The duplicate key value is (${userName}).`){
                res.status(404).json({
                    message:'Username is already taken'
                }); return;
            }else{
               return res.status(503).json({
                    message:error.message
                }) 
            }
        }
    },

    login: async (req, res,) => {
        const { email, password } = req.body
        try {
            let pool = await poolPromise();
            let findUser = await pool.query`SELECT * FROM users WHERE email = ${email}`;
            console.log(findUser)
            if (findUser.recordset.length > 0) {
                const user = findUser.recordset[0];
                console.log(user)

                const auth = await bcrypt.compare( password,user.userPassword )

                if (auth) {
                    const token = jwt.sign({ email: email }, process.env.TOKEN, {
                        expiresIn: '20m'
                    })
                    res.status(200).json({
                        email:email,
                        message:'Successful login',
                        token:token
                    }); return;
                }
                else{
                    res.status(403).json({
                        message:'Wrong Password try again'
                    }); return;
                }

            }else{
                res.status(404).json({
                    message:'Email not found please signup'
                })
            }
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({
                message:error.message
            })

        }
    },
}

module.exports = { ...userControllers }