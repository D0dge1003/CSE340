const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const utilities = require('./utilities');
const session = require("express-session")
const pool = require('./database/database')
const bodyParser = require("body-parser")

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("views", path.join(__dirname, "views"));


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool: pool.pool,
  }),
  secret: process.env.SESSION_SECRET || 'notagoodsecret',
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "public")));


const staticRoutes = require('./routes/static');
app.use(staticRoutes);

const inventoryRoute = require('./routes/inventoryRoute');
app.use('/inv', inventoryRoute);

const accountRoute = require('./routes/accountRoute')
app.use('/account', accountRoute)

const errorRoute = require('./routes/errorRoute');
app.use(errorRoute);

app.get("/", async (req, res, next) => {
  try {
    const nav = await utilities.buildClassificationList();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler.handle404);
app.use(errorHandler.handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

