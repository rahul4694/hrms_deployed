const express = require("express");
require("./src/config/db/mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const userRouters = require("./src/api/users/user.routers");
// const users = require("./routes/api/users");
const app = express();
const departmentRouter = require("./src/api/department/department.router");
const notificationRouter = require("./src/api/notification/notifictaion.router");
const designationSeeder = require("./src/config/seeds/designationseeder");
const kraAttributesSeeder = require("./src/config/seeds/kra_attributesSeeder");
const adminSeeder = require("./src/config/seeds/adminseeder");
const notificationSeeder = require("./src/config/seeds/notificationseeder");
const departmentSeed = require("./src/config/seeds/departmentseeder");
const kraRouter = require("./src/api/kraSheets/krasheetRouters");
const showemploye = require("./src/api/admin/admin_routers/admin_router");
const posts=require("./src/api/posts/postrouters")
const cors = require("cors");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.get("/", (req, res, next) => {
  res.send("server is connected on 3006");
  next();
});

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
app.use(posts);
app.use(showemploye);
app.use(userRouters);
app.use(kraRouter);
app.use(departmentRouter);
app.use(notificationRouter);
app.use(departmentSeed);
app.use(kraAttributesSeeder);
app.use(designationSeeder);
app.use(adminSeeder);
app.use(notificationSeeder);

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
