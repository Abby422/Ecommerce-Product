const poolPromise = require("../Config/pool");

module.exports = {
    
    setAdmin: async (req, res) => {
        const { userID, role} = req.body
        try {
            let pool = await poolPromise()
            const setAdmin = pool.request()
                .input('userId', userID)
                .input('role', role)
                .execute('spAdmin');
            setAdmin.then(result => {
                console.log(result)


                if (result.rowsAffected[0] > 0) {
                    // console.log('User is now admin')
                    // return res.status(200).json({
                    //     message: "User set to admin"
                    // });
                    console.log('changed')
                    res.send('changed')
                } else {
                    // return res.status(400).json({
                    //     message: "User is Already an Admin"
                    // });
                    console.log('not changed')
                    res.send('not changed')

                }

            })
        } catch (error) {
            console.log(error.message)
        }

    },

    addProduct: async (req, res) => {
        const{categoryName, productName, productDesc, productImg, productPrice, quantity} = req.body
        try {
          let pool = await poolPromise();
          pool.request()
          .input('categoryName', categoryName)
          .input('productName',productName)
          .input('productDesc', productDesc)
          .input('productImg',productImg)
          .input('productPrice',productPrice)
          .input('quantity',quantity)
          .execute('spAddProduct').then(result=>{
              if(result.rowsAffected[0] >0){
                  return res.status(200).json({
                      message:"Item added successfully"
                  })
              }else{
                  return res.status(400).json({
                      message:"Item has not been added"
                  })    
              }
          })
        } catch (error) {
          console.log(error.message)
          res.send(error.message)
        } 
      },

      getAdminProducts:async(req, res)=>{
        try {
            let pool = await poolPromise()
            pool.request()
            .execute(`spGetAdminProducts`)
            .then(result => {
                res.status(200).json({
                    data:result.recordset
                })
            }) 
        } catch (error) {
            console.log(error.message)
            res.status(400).send('cannot get products')
        }

    },

    getOneProduct: async(req,res)=>{
        const{id}=req.params
        try {
            let pool = await poolPromise()
            pool.request()
             .input('productID', id)
             .execute('spOneProduct')
             .then(result=>{
                console.log(result)
                if(result.recordset.length > 0){
                    res.status(200).json({
                        data:result.recordset[0]
                    })
                }else{
                    res.status(400).json({
                        message:"Product doesn't exist"
                    })
                }
             })
        } catch (error) {
            console.log(error.message)

        }
    },

    deleteProduct: async(req, res)=>{
        const{id} = req.body
        try {
            let pool = await poolPromise()
            pool.request()
             .input('productID', id)
             .execute('spDeleteProduct')
             .then(result=>{
                console.log(result)
                if(result.rowsAffected[0] > 0){
                    res.status(200).json({
                        message:'product deleted'
                    })
                    console.log('done')
                }else{
                    res.status(400).json({
                        message:"Product not deleted"
                    })
                    console.log('not done')
                }
             })
        } catch (error) {
            console.log(error.message)

        }
    },

    updateProduct:async(req, res)=>{
        const{id, name, desc, quantity, price, discount} = req.body
        try {
            let pool = await poolPromise()
            pool.request()
            .input('productID', id)
            .input('productName', name)
            .input('productDesc', desc)
            .input('productPrice', price)
            .input('quantity', quantity)
            .input('discount', discount)
            .execute(`spUpdateProduct`)
            .then(result=>{
                if (result.rowsAffected[0] > 0) {
                    // console.log('User is now admin')
                    // return res.status(200).json({
                    //     message: "User set to admin"
                    // });
                    console.log('changed')
                    res.send('changed')
                } else {
                    // return res.status(400).json({
                    //     message: "User is Already an Admin"
                    // });
                    console.log('not changed')
                    res.send('not changed')

                }
            })

        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    },

}