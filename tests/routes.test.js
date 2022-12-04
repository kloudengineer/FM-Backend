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
// 1. ROUTE GET List
// 2. ROUTE POST find-routes
// 3. ROUTE GET Profile
// 4. ROUTE POST Create
// 5. ROUTE PUT Update
// 6. ROUTE Delete

describe("ROUTES APIs - LIST", () => {
    it("GET /routes  --> List Array of Route objects", async() => {
        await request(app)
            .get("/api/v1/routes")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    routes: expect.arrayContaining([]),
                });
            });
    });
    it("POST /routes  --> Find Route & return array of objects", async() => {
        await request(app)
            .post("/api/v1/find-routes")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    routes: expect.arrayContaining([]),
                });
            });
    });
    it("GET /routes/id  --> Profile Route & return array of objects", async() => {
        await request(app)
            .get("/api/v1/routes/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    route: expect.arrayContaining([]),
                });
            });
    });
    it("POST /routes  --> Create Route & return Array of objects", async() => {
        await request(app)
            .post("/api/v1/routes")
            .set("Authorization", userToken)
            .send({
                routes: {
                    routeID: `${chance.natural({ min: 0, max: 20 })}`,
                    routeNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    customer: `${chance.string({ length: 20 })}`,
                    startDateTime: chance.date(),
                    endDateTime: chance.date(),
                    origin: `${chance.word({ length: 6 })}`,
                    destination: `${chance.natural({ min: 0, max: 20 })}`,
                    distance: `${chance.natural({ min: 0, max: 20 })}`,
                    stopAddresses: `${chance.word({ length: 6 })}`,
                    driver: `${chance.word({ length: 6 })}`,
                    truck: `${chance.word({ length: 6 })}`,
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    route: expect.objectContaining({}),
                });
            });
    });
    it("POST /routes  --> Create Route & return Array of objects", async() => {
        await request(app)
            .put("/api/v1/routes/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .send({
                routes: {
                    routeID: `${chance.natural({ min: 0, max: 20 })}`,
                    routeNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    customer: `${chance.string({ length: 20 })}`,
                    startDateTime: chance.date(),
                    endDateTime: chance.date(),
                    origin: `${chance.word({ length: 6 })}`,
                    destination: `${chance.natural({ min: 0, max: 20 })}`,
                    distance: `${chance.natural({ min: 0, max: 20 })}`,
                    stopAddresses: `${chance.word({ length: 6 })}`,
                    driver: `${chance.word({ length: 6 })}`,
                    truck: `${chance.word({ length: 6 })}`,
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    route: expect.objectContaining({}),
                });
            });
    });
    it("DELETE /api/routes/:id --> Object Route", async() => {
        await request(app)
            .delete("/api/v1/routes/638c43ff425d2b7943f54172")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    route: expect.arrayContaining([]),
                });
            });
    });
});