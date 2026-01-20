const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const utilities = require('./utilities');

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const staticRoutes = require('./routes/static');
app.use(staticRoutes);

const inventoryRoute = require('./routes/inventoryRoute');
app.use('/inv', inventoryRoute);

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

