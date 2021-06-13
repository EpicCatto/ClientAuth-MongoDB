require("dotenv").config();
const port = 6969;
const mongoose = require("./database/mongoose");
const redeemDatabaseManager = require("./database/impl/redeemDatabaseManager");
const loginDatabaseManager = require("./database/impl/loginDatabaseManager");

const express = require("express");
const app = express();

mongoose.init();

app.get("/redeemcodes/:code", async (req, res) => {
  let user = await redeemDatabaseManager.findOne({
    code: req.params.code,
  });
  if (user) {
    return res.send("Code is exist.")
  }else{
    return res.send("Code not found.")
  }
});

app.get("/auth/login/:username-:uid-:hwid", async (req, res) => {
  let user = await loginDatabaseManager.findOne({
    Username: req.params.username,
    UID: req.params.uid,
    HWID: req.params.hwid
  });
  if (user) {
    return res.send("Login Sucsess!")
  }else{
    return res.send("Login Faild!")
  }
});

app.get("/auth/user/getinfo/:hwid", async (req, res) => {
  let user = await loginDatabaseManager.findOne({
    HWID: req.params.hwid
  });
  if (user) {
    return res.send(user.Username + ":" + user.UID + ":" + user.HWID + ":" + user.DiscordID)
  }else{
    return res.send("Login Faild!")
  }
});

app.get("/auth/username/:username", async (req, res) => {
  let user = await loginDatabaseManager.findOne({
    Username: req.params.username,
  });
  if (user) {
    return res.send("Username Found!")
  }else{
    return res.send("Username Not Found!")
  }
});

app.get("/auth/uid/:uid", async (req, res) => {
  let user = await loginDatabaseManager.findOne({
    UID: req.params.uid,
  });
  if (user) {
    return res.send("UID Found!")
  }else{
    return res.send("UID Not Found!")
  }
});

app.get("/auth/hwid/:hwid", async (req, res) => {
  let user = await loginDatabaseManager.findOne({
    HWID: req.params.hwid,
  });
  if (user) {
    return res.send("HWID Found!")
  }else{
    return res.send("HWID Not Found!")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
