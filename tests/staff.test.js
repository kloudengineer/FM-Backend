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
// 1. STAFF GET
// 2. STAFF GET Profile
// 3. STAFF POST create
// 4. STAFF PUT update
// 5. STAFF DELETE

describe("STAFF APIs - LIST", () => {
    it("GET /staff  --> List Array of Staff objects", async() => {
        await request(app)
            .get("/api/v1/staff")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    staff: expect.arrayContaining([]),
                });
            });
    });
    it("GET /staff/id  --> Profile & return staff object", async() => {
        await request(app)
            .get("/api/v1/staff/6383313827cfe9310386bdf8")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    staff: expect.arrayContaining([]),
                });
            });
    });
    it("POST /api/staff --> Create & return Object staff", async() => {
        await request(app)
            .post("/api/v1/staff")
            .set("Authorization", userToken)
            .send({
                staff: {
                    firstName: chance.name(),
                    lastName: chance.name(),
                    email: chance.email(),
                    address: chance.address(),
                    workHistory: [{
                        companyName: chance.name(),
                        companyAddress: chance.string({ length: 10 }),
                        position: chance.string({ length: 7 }),
                        startDate: "",
                        endDate: "",
                        referenceName: "",
                        referencePhone: "",
                        referenceEmail: "",
                    }, ],
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    staff: expect.arrayContaining([]),
                });
            });
    });
    it("PUT /api/staff/id --> Update & return Object staff", async() => {
        await request(app)
            .post("/api/v1/staff/6383313827cfe9310386bdf8")
            .set("Authorization", userToken)
            .send({
                staff: {
                    firstName: chance.name(),
                    lastName: chance.name(),
                    email: chance.email(),
                    address: chance.address(),
                    workHistory: [{
                        companyName: chance.name(),
                        companyAddress: chance.string({ length: 10 }),
                        position: chance.string({ length: 7 }),
                    }, ],
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    staff: expect.arrayContaining([]),
                });
            });
    });
    it("DELETE /api/staff/:id --> Object Staff", async() => {
        await request(app)
            .delete("/api/v1/staff/6383313827cfe9310386bdf8")
            .set("Authorization", userToken)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    staff: expect.arrayContaining([]),
                });
            });
    });
});