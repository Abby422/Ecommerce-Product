const poolPromise = require('./config/pool');

const adminAuth = async (req, res, next)=>{
    const{email}= req.body;
    try {
        let pool = await poolPromise()
        let adminQry = await pool.query(`SELECT * FROM Users WHERE email = '${email}'`)
        if(adminQry.recordset.length > 0){
            const user = adminQry.recordset[0];
            if( user.User_role === 'Admin'){
                console.log('You are an admin')
            }else{
                console.log('You are not an admin')
                res.redirect('http://localhost:3000/notFound')
                return;
            }
        }else{
            console.log('User not Found please Sign up')
        }
        next();
    } catch (error) {
      console.log(error.message)
      res.status(503).send(error.message)  
    }

}

module.exports = adminAuth;