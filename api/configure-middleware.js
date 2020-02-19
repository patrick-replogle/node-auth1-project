const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const dbConfig = require("../data/dbConfig.js");

const sessionConfig = {
  name: "cookies",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: dbConfig,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24 * 7
  })
};

//still not working on front end
const corsOptions = {
  origin: "http://localhost:3000", // reqexp will match all prefixes
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  optionsSuccessStatus: 200
};

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  //server.options("*", cors(corsOptions));
  server.use(cors(corsOptions));
  server.use(session(sessionConfig));
};
