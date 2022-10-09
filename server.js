const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const root = require("path").join(__dirname, "build");
app.use(express.static(root));

app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => {
    console.log("FE server is listening at port 3000..");
});
