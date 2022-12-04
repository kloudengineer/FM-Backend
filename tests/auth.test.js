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
// 1. Auth POST Register

describe("AUTH APIs - LIST", () => {
    it("POST /auth/register  --> Create Auth & return Array of objects", async() => {
        await request(app)
            .post("/api/v1/auth/register")
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
});