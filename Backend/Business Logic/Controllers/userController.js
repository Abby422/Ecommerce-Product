const poolPromise = require("../config/pool");


module.exports = {
    search : async (req,res) => {
        try {
            const { Search } = req.body // need to change to query or body
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
        try {
            const {UserId, quantity, total, ProductId} = req.body
            let pool = await poolPromise()
            pool.request()
            .input('UserId', UserId)
            .input('Quantity', quantity)
            .input('total', total)
            .execute(`dbo.CreateOrder`)
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
    }
}