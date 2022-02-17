"use strict";

const db = require("./fakeDb");
const { NotFoundError } = require("./expressError");


/** finds item in array with itemName,
 * return entire object: {name: beer, price: 5}
 */
function grabItemFromDatabase(itemName) {
    let selectedItem;
    for (let item of db.items) {
        if (item["name"] === itemName) {
            selectedItem = item;
        }
    }
    if (!selectedItem) {
        throw new NotFoundError(
            `Could not find the item ${itemName}`);
    }
    return selectedItem;
}

/**looks up item from list
 * updates "database"
 * if successful, returns entire object:
 * {name: beer, price: 5}
 */
function updateDatabase(oldItemName, newItem) {
    for (let i = 0; i < db.items.length; i++) {
        if (db.items[i].name = oldItemName) {
            db.items[i].name = newItem.name;
            db.items[i].price = newItem.price;
            return db.items[i];
        }

    }
    throw new NotFoundError(`Could not find the item ${oldItemName}`);
}

/**
 * finds item in database and removes it
 * returns success message object, or throws an error
 */
function removeFromDataBase(itemName) {
    for (let i = 0; i < db.items.length; i++) {
        if (db.items[i].name === itemName) {
            //remove element at index i
            db.items.splice(i, 1);
            return { message: "Deleted" };
        }

    }
    throw new NotFoundError(`Could not find the item ${itemName}`);
}

module.exports = {
    grabItemFromDatabase,
    updateDatabase,
    removeFromDataBase
}