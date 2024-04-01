const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const env = require('dotenv');
env.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
const USER_MAIL = process.env.USER_MAIL
const USER_PASSWORD = process.env.USER_PASSWORD
const ADMIN_MAIL = process.env.ADMIN_MAIL
app.post('/form', async (req, res) => {
    const formDetails = req.body;
    console.log(formDetails);
    try {
        // const createdFormData = await formModel.create(formDetails);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: USER_MAIL, // Replace with your email
                pass: USER_PASSWORD // Replace with your email password or use an app-specific password
            },
        });

        const mailOptions = {
            from: USER_MAIL,
            to: ADMIN_MAIL, // Replace with the admin's email address
            subject: 'New Form Submission',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: auto;
                  padding: 20px;
                  background-color: #14213d;
                }
                h1 {
                  color: #fca311;
                }
                p {
                  color: white;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>New Form Submission</h1>
                <p><strong>Name:</strong> ${formDetails.name}</p>
                <p><strong>Email:</strong> ${formDetails.email}</p>\
                <p><strong>Query:</strong> ${formDetails.message}</p>
              </div>
            </body>
            </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send({ message: "Form Submitted Successfully!" });
    }
    catch (error) {
        console.error({ error: "Error in form", error });
    }
})
app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})