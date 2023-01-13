require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const auth = require("./middleware/auth");
const fs = require("fs");

connectDB();

const app = express();
// __basedir
global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
// static file
app.use(express.static(path.join(__dirname, "public")));

// flash

app.use(cookieParser("ytuutuutrururru"));
app.use(
  session({
    secret: "sfffweffwefwrwenwfjwerg",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(flash());

app.set("view engine", "ejs");
// for use multer
app.use(methodOverride("_method"));
// Middleware
app.use(express.json());
// cors
app.use(cors());

// Routes

app.use("/user", require("./routes/userRoutes"));
app.use("/product", require("./routes/productRoutes"));
app.use(auth);
app.use("/order", require("./routes/orderRoutes"));

// Error Handler
app.use(errorHandler);

// not found route
app.all("*", async (req, res, next) => {
  res.send(
    "<h1 style='text-align: center ;margin-top:200;color:red;text-transform:capitalize'>page not found</h1>"
  );
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
