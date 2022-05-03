const express = require("express");
// const session = require("express-session");
// const mongoose = require('mongoose');
const app = express();

// Parses the response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("Server is listening on port 3000"))
