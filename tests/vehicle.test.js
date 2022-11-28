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
// 1. VEHICLE GET List
// 2. VEHICLE POST Find-VEHICLES
// 3. VEHICLE GET Profile
// 4. VEHICLE POST Create
// 5. VEHICLE PUT Update
// 6. VEHICLE DELETE

describe("VEHICLE APIs - LIST", () => {
    it("GET /vehicles  --> List Array of vehicle objects", async() => {
        await request(app)
            .get("/api/v1/vehicles")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    vehicles: expect.arrayContaining([]),
                });
            });
    });
    it("POST /vehicles  --> Find Array of vehicle objects", async() => {
        await request(app)
            .post("/api/v1/find-vehicles")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    vehicles: expect.arrayContaining([]),
                });
            });
    });
    it("GET/vehicles/id  --> Profile of vehicle array of object", async() => {
        await request(app)
            .get("/api/v1/vehicles/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    vehicle: expect.arrayContaining([]),
                });
            });
    });
    it("POST /vehicles  --> Create & return Array of objects", async() => {
        await request(app)
            .post("/api/v1/vehicles")
            .set("Authorization", userToken)
            .send({
                vehicle: {
                    vehicleId: `${chance.natural({ min: 0, max: 20 })}`,
                    truckNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    vinNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    model: `${chance.word({ length: 6 })}`,
                    year: chance.year({ min: 2001, max: 2025 }),
                    plateNumber: `${chance.natural({ min: 0, max: 10 })}`,
                    make: `${chance.string({ length: 20 })}`,
                    latestInspectionDate: chance.date(),
                    latestMaintenanceDate: chance.date(),
                    latestAcquiryDate: chance.date(),
                    latestReturnDate: chance.date(),
                    vehicleType: "Owned",
                    buyOrRentalDate: "Rental",
                    soldOrReturnDate: chance.date(),
                    carrierId: "61a1e4c55224cb48326dc3b5",
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    vehicle: expect.objectContaining({}),
                });
            });
    });
    it("PUT /vehicles/id --> Update & return Object Vehicle", async() => {
        await request(app)
            .put("/api/v1/vehicles/63847d2f180485d83df9f9f2")
            .set("Authorization", userToken)
            .send({
                vehicle: {
                    vehicleId: `${chance.natural({ min: 0, max: 20 })}`,
                    truckNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    vinNumber: `${chance.natural({ min: 0, max: 20 })}`,
                    model: `${chance.word({ length: 6 })}`,
                    year: chance.year({ min: 2001, max: 2025 }),
                    plateNumber: `${chance.natural({ min: 0, max: 10 })}`,
                    make: `${chance.string({ length: 20 })}`,
                    latestInspectionDate: chance.date(),
                    latestMaintenanceDate: chance.date(),
                    latestAcquiryDate: chance.date(),
                    latestReturnDate: chance.date(),
                    vehicleType: "Owned",
                    buyOrRentalDate: "Rental",
                    soldOrReturnDate: chance.date(),
                    carrierId: "61a1e4c55224cb48326dc3b5",
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    vehicle: expect.objectContaining({}),
                });
            });
    });
    it("DELETE /api/vehicles/id --> Object Vehicle", async() => {
        await request(app)
            .delete("/api/v1/vehicles/63848129a12bd412c25e1cdf")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({}));
            });
    });
});