const poolPromise = require("../Config/pool");


module.exports = {
    search : async (req,res) => {
        const { Search } = req.body // need to change to query or body
        try {
            let pool = await poolPromise()
            pool.request()
            .input('Search', Search)
            .execute(`dbo.SearchProduct`)
            .then(result => {
                if(result){
                    res.status(200).json({
                        Successful: true,
                        Message: "Results returned succesfully",
                        Data : result.recordset
                    })
                }else{
                res.status(404).json({
                    Message: "Results not found"
                })
            }
            }) 
        } catch (error) {
            console.log(error)
        }
    },

    order : async (req, res) => {
        const {UserId, quantity, total, ProductId} = req.body
        try {
            let pool = await poolPromise()
            pool.request()
            .input('UserId', UserId)
            .input('Quantity', quantity)
            .input('total', total)
            .execute(`dbo.CreateOrder`);

            pool.request()
            .input('ProductId', ProductId)
            .execute(`dbo.EnterProducts`)
            .then(result =>{
                    // console.log(pool);
                    console.log(result)
                    res.status(200).json({
                        Successful: true,
                        Message: "Order added succesfully",
                    })
                }
            )

        } catch (error) {
            console.log(error.message)
        }
    },
    setAdmin :async(req, res)=>{
        const{userID} = req.body
        try {
            let pool = await poolPromise()
           const setAdmin = pool.request()
            .input('UserId', userID)
            .execute('spAdmin');
            setAdmin.then(result=>{
                console.log(result)

          
            if(result.rowsAffected[0] > 0){
                // console.log('User is now admin')
                return res.status(200).json({
                    message:"User set to admin"
                });
            }else{
                return res.status(400).json({
                    message:"User not set to admin"
                });
            }

        })            
        } catch (error) {
           console.log(error.message) 
        }

    },
    addProduct:async(req, res)=>{

    }
}