const app = require("../server");
const request = require("supertest");
const Chance = require("chance");
const axios = require("axios");
const mongoose = require("mongoose");

jest.setTimeout(30000);
let userToken;
var chance;

beforeAll(async() => {
    chance = new Chance();

    // Before all the tests start, we need to connect to our MongoDB cluster.
    await mongoose
        .connect(process.env.TEST_MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("connect to MongoDB");
        })
        .catch((e) => {
            console.log("Error: ", e);
        });

    // Creating a user and generating new user token to access all routes
    // Exchanging our custom token with firebase auth token
    const userLogin = await axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
        method: "post",
        data: {
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASS,
            returnSecureToken: true,
        },
        json: true,
    });
    userToken = `Bearer ${userLogin.data.idToken}`;
});

afterAll(async() => {
    await mongoose.connection.close();
});

// In this test we going to test
// 1. CARRIERS GET LIST
// 2. CARRIERS GET Profile
// 3. CARRIERS POST Create
// 4. CARRIERS PUT Update
// 5. CARRIERS DELETE

describe("Carriers APIs - LIST", () => {
    it("GET /carriers  --> List Array of Carrier objects", async() => {
        await request(app)
            .get("/api/v1/carriers")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    carrier: expect.arrayContaining([]),
                });
            });
    });
    it("GET /carriers/id  --> Profile Carrier & return array of objects", async() => {
        await request(app)
            .get("/api/v1/carriers/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    carrier: expect.arrayContaining([]),
                });
            });
    });
    it("POST /carriers  --> Create Carrier & return Array of objects", async() => {
        await request(app)
            .post("/api/v1/carriers")
            .set("Authorization", userToken)
            .send({
                carriers: {
                    firstName: chance.name(),
                    lastName: chance.name(),
                    phoneNumber: chance.address(),
                    email: ` ${chance.string({
            length: 15,
          })}`,
                    companyName: chance.string({ length: 7 }),
                    registration: { image: "Random", name: "Random", size: "12kb" },
                    ein: chance.natural({ min: 0, max: 20 }),
                    dot: chance.string({ length: 7 }),
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    carrier: expect.objectContaining({}),
                });
            });
    });
    it("PUT /carriers  --> Create Carrier & return Array of objects", async() => {
        await request(app)
            .put("/api/v1/carriers/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .send({
                carriers: {
                    firstName: chance.name(),
                    lastName: chance.name(),
                    phoneNumber: chance.address(),
                    email: ` ${chance.string({
            length: 15,
          })}`,
                    companyName: chance.string({ length: 7 }),
                    registration: { image: "Random", name: "Random", size: "12kb" },
                    ein: chance.natural({ min: 0, max: 20 }),
                    dot: chance.string({ length: 7 }),
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    carrier: expect.objectContaining({}),
                });
            });
    });
    it("DELETE /api/Carriers/:id --> Object Carrier", async() => {
        await request(app)
            .delete("/api/v1/carriers/638c43ff425d2b7943f54172")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    carrier: expect.arrayContaining([]),
                });
            });
    });
});