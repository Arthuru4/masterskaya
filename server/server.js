const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
const creds = require("./config");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const db             = require('./config/db');

const transport = {
  host: creds.HOST,
  port: creds.PORT,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify(error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages on port: 3002");
  }
});

router.post("/order", (req, res) => {
  //  name?: string;
  //   mobile: string;
  //   city?: string;
  //   deliveryType: delivery;
  //   deliveryData?: string
  const {name, mobile, city, deliveryType, deliveryData} = req.body.userInfo;
  const content = `name: ${name} \n mobile: ${mobile} \n city: ${city} \n deliveryType: ${deliveryType}  \n deliveryData: ${deliveryData} `;
  console.log(`GOT ORDER from user name[${name}], mobile[${mobile}].`);

  const positions = JSON.stringify(req.body.positions);

  const mail = {
    from: name,
    to: creds.MAIL_TO,
    subject: `New ORDER from ${name}, mob: ${mobile}`,
    text: `${content} \n\n ЗАКАЗ:\n${positions}`
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(
        `ORDER from user name[${name}], mobile[${mobile}] FALL WITH ERROR\n${err}`
      );

      res.json({
        status: "fail"
      });
    } else {
      console.log(
        `ORDER from user name[${name}], mobile[${mobile}] SUCCESSFULLY SENT`
      );

      res.json({
        status: "success"
      });
    }
  });
});
router.post("/send", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.msg;
  const content = `name: ${name} \n email: ${email} \n message: ${message} `;
  console.log(`GOT message from user name[${name}], email[${email}].`);

  const mail = {
    from: name,
    to: creds.MAIL_TO,
    subject: "New Message from Contact Form",
    text: content
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(
        `Message from user name[${name}], email[${email}] FALL WITH ERROR\n${err}`
      );

      res.json({
        status: "fail"
      });
    } else {
      console.log(
        `Message from user name[${name}], email[${email}] SUCCESSFULLY SENT`
      );

      res.json({
        status: "success"
      });
    }
  });
});
router.get("/notes", (req, res) => {
  console.log(`GOT NOTES`);
  res.json({
    status: "success"
  });
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use("/", router);


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes')(app, database);

  app.listen(3002);
});
