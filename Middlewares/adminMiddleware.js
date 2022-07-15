const poolPromise = require('../Auth/config/pool.js');

const adminAuth = async (req, res, next)=>{
    const {email} = req.params

    try {
        let pool = await poolPromise()
        let adminQry = await pool.query(`SELECT * FROM users WHERE email = ${email}`)
        if(adminQry.recordset.length > 0){
            const user = admin.recordset[0];
            if( user.role === 'admin'){
                res.status(200).send('You are an admin')
            }else{
                res.status(503).send('You are not an admin')
            }
        }else{
            res.status(404).send('User not Found please Sign up')
        }
        next();
    } catch (error) {
      console.log(error.message)
      res.status(503).send(error.message)  
    }

}

module.exports = adminAuth;