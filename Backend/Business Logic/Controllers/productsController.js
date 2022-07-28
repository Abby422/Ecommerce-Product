const poolPromise = require("../Config/pool");


module.exports = {
    search: async (req, res) => {
        const Search = req.query.query
        try {
            let pool = await poolPromise()
            pool.request()
                .input('Search', Search)
                .execute(`dbo.SearchProduct`)
                .then(result => {
                    if (result) {
                        res.status(200).json({
                            Successful: true,
                            Message: "Results returned succesfully",
                            Data: result.recordset
                        })
                    } else {
                        res.status(404).json({
                            Message: "Results not found"
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },

    order: async (req, res) => {
        const { UserId, quantity, total, ProductId } = req.body
        try {
            let pool = await poolPromise()
            pool.request()
            .input('UserId', UserId)//should be a string
            .input('Quantity', quantity)
            .input('total', total)
            .execute(`dbo.CreateOrder`);

            pool.request()
                .input('ProductId', ProductId)
                .execute(`dbo.EnterProducts`)
                .then(result => {
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


    getAllProducts: async (req, res) => {
        const{pageNumber, rowNumber}= req.body;
        try {
            let pool = await poolPromise()
            const getAllProducts = pool.request()
                .input('pageNumber', pageNumber)
                .input('rowNumber', rowNumber)
                .execute('spPagination');

                getAllProducts.then(result=>{
                    
                    res.status(200).json({
                        message: "Successful",
                        data:result.recordset
                    })
                })
        }
        catch (error) {
            console.log(error.message)
        }
    },

    getProductDetails: async (req, res) => {
        try {
            let pool = await poolPromise()
            const {id} = req.params

            pool.request()
            .input('ProductId', parseInt(id))
            .execute(`spGetProduct`)
            .then(result => {
                if (result.length == 0) {
                    res.status(404).json({
                        message: "Not Found, try again later",
                    })
                } else {
                    res.status(200).json({
                        message: "Successful",
                        data: result.recordsets[0]
                    })
                }
            })
        } catch (error) {
            res.send(error.message)
        }
    },



}