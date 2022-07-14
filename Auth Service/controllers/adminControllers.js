const poolPromise = require('../config/pool');

const adminControllers = {
    addProduct: async(req, res)=>{
        let {productName, productDesc, productQuantity, productPrice } = req.body
        try {
            let pool = await poolPromise();
            const insertProduct = await pool.query(`INSERT INTO products VALUES('${productName}', '${productDesc}','${productQuantity}','${productPrice}')`)
            if(insertProduct){
                res.status(201).json({
                    message:`product ${productName} was added succesfully`
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    },

}