"use strict";

const express = require("express");
const itemRoutes = require("./itemRoutes")
const app = express();

let db = require("./fakeDb")


app.use("/items", itemRoutes);

app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// /** returns a list of shopping items */
// app.get("/items", function (req, res) {
//     let data = db.items;
//     return res.json({
//         items: data
//     })

// })

// /** Adds new item to shopping list: {name: beer, price: 3.00}
//  */
// app.post("/items", function(req, res) {
//     newItem = req.json;
//     db.items.push(newItem);
//     return res.json({
//         added: newItem
//     })

// })



/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });

module.exports = app;