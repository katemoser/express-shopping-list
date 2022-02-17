"use strict";

const express = require("express");
const { NotFoundError } = require("./expressError");
const {
    grabItemFromDatabase,
    updateDatabase,
    removeFromDataBase
} = require("./utils");

const db = require("./fakeDb");
const router = new express.Router();


router.use(express.json());

/** returns an array of shopping items:
 * 
 * {items: [
 * {name: bread, price: 5},
 * {name: oranges, price: 3}
 * ]}
 * 
*/
router.get("/", function (req, res) {
    let data = db.items;
    return res.json({
        items: data
    })

});

/** Adds new item to shopping list, 
 * returns{name: beer, price: 3.00}
 */
router.post("/", function (req, res) {
    //console.log("REQ:", req.body);
    const newItem = req.body;
    //console.log(req.body);
    db.items.push(newItem);
    return res.json({
        added: newItem
    })
});

/** returns info on a single item: 
 * {name: beer, price: 3:00}*/
router.get("/:name", function (req, res) {
    let selectedItem = grabItemFromDatabase(req.params.name);
    return res.json(selectedItem);
});

/** updates a specific item, returns updated entry:
 * {name: beer, price: 3:00}
*/
router.patch("/:name", function (req, res) {
    let updatedItem = updateDatabase(req.params.name, req.body)
    return res.json(updatedItem)

});

/**deletes an item
 * returns confirmation message:
 * {message: deleted}
 */
router.delete("/:name", function (req, res) {
    const message = removeFromDataBase(req.params.name);
    return res.json(message);
})




module.exports = router;
