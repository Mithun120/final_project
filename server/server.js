
let express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');
dotenv = require('dotenv')
nodemailer = require("nodemailer")
let User = require('./schema/User');
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")
const app = express();
app.use(cors());
const api = require('./routes/routes')
const projectapi=require("./routes/projects")
const allocateProject=require("./routes/allocateProjects")
const timesheet=require("./routes/timesheet")
const feedback=require("./routes/feedback")
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const bcrypt = require('bcrypt');
const saltRounds = 10;

//nodemailer

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mithunm.20cse@kongu.edu",
    pass: "Mithun123!!",
  },
})

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb+srv://finalproject:finalproject@finalproject.xa5ol.mongodb.net/')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

app.use("/",api)
app.use("/projectapi",projectapi)
app.use("/allocate",allocateProject)
app.use("/feedback",feedback)
app.use("/timesheet",timesheet)






const options={
  definition :{
    openapi:"3.0.0",
    info:{
      title:"TimeSheet and Feedback",
      version :"0.1.0",
      description:"Timesheet and feedback module with user login and registration"
    },
    servers:[
      {
        url:"http://localhost:4000/",
      },
    ],
  },
  apis :["./routes/*.js"],
}


const spacs = swaggerjsdoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))
app.listen(4000, () => console.log("server running"))