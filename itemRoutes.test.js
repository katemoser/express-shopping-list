"use strict";

const { hasUncaughtExceptionCaptureCallback } = require("process");
const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let bread = {name: "bread", price: 3.00 };
let oranges = {name: "oranges", price: 5.50};

beforeEach(function(){
    db.items.push(bread);
    db.items.push(oranges);
});

afterEach(function(){
    db.items = [];
})

describe("GET /items", function() {
    it("Gets a list of items on shopping list", async function() {
        const resp = await request(app).get("/items/");

        expect(resp.body.items.length).toEqual(2);
        expect(resp.body.items).toEqual([
            {name: "bread", price: 3.00 },
            {name: "oranges", price: 5.50}
        ])
    })
})

describe("POST /items", function() {
    it("adds an item toshopping list", async function() {
        const resp = await request(app)
            .post("/items/")
            .send({name: "beer", price: 10});
        console.log( resp.body);
        expect(resp.body).toEqual({
            added:
            {name: "beer", price: 10}
        });
        expect(db.items).toEqual([
            {name: "bread", price: 3.00 },
            {name: "oranges", price: 5.50},
            {name: "beer", price: 10}
        ])
    })
})