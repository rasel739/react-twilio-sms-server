const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
app.use(cors());
app.use(express.json());
