const nodemailer = require('nodemailer')
const path = require('path')
const imgLink =  path.resolve(`${__dirname}../images/welcome.png`);


const registrationMailController = {
    sendEmail: async(req,res)=>{
        let content = `Hi victor


        Welcome aboard to our E-Commerce site hope you are 
        able to shop with us. Our website is the # 1 E-commerce 
        Website for trending products.`


        let HTML =  `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
                
            </style>
          </head>
          <body style="color: white;">
          <h2>Hi Victor</h2>
          </br>
          </br>
          <p>Welcome aboard to our E-Commerce site hope you are 
          able to shop with us. Our website is the # 1 E-commerce 
          Website for trending products.</p>

            <p><img src="${imgLink}" alt="Welcome Picture" width="200px" height="150px"/></p>
          </body>
        </html>`


        try {
            let transporter = nodemailer.createTransport({
                host:'smtp.outlook.com',
                port:587,
                secure:false, // true for 465, false for other ports
                auth:{
                     user: 'sekanixv@outlook.com',
                     pass:'p#B4^J+KkH,dVKu'
                }
            });
            let message = {
                from:'sekanixv@outlook.com',
                to:`vmuriithi10@gmail.com`,
                subject:'Thank you for choosing us',
                html:HTML
   
            }
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log(error);
                    return;
                }
                res.send(info);
            });


        } catch (error) {
            console.log(error.message)
        }
    },
}

module.exports = {...registrationMailController}