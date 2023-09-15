const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const koalaRouter = require("./routes/koala.router");

// app.get("/", (req, res) => {
//   console.log("GET request at /koala");
//   res.sendStatus(200);
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

// ROUTES
app.use("/koalas", koalaRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
