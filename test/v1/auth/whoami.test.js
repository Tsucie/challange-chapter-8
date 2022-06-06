const request = require('supertest');
const app = require('../../../app');

describe('/v1/auth/whoami', () => {
  it("should response with 200 as status code", async () => {
    const userParam = { id: 1 };

    return request(app)
      .post("/v1/auth/whoami")
      .set("Content-Type", "application/json")
      .send({ user: userParam })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
            user
          })
        );
      });
  });

  it("should response with 404 as status code", async () => {
    const userParam = { id: 1 };

    return request(app)
      .post("/v1/auth/whoami")
      .set("Content-Type", "application/json")
      .send({ user: userParam })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            err: {
              name: expect.any(String),
              message: expect.any(String),
            },
          })
        );
      });
  });
});