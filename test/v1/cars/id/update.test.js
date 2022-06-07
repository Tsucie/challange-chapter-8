const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../../app/models');

describe('PUT /v1/cars/:id', () => {
  let car;
  beforeEach(async () => {
    car = await Car.create({
      name: "BMW",
      price: 100000,
      size: "Sedan",
      image: "https://www.bmw.co.id/content/dam/bmw/common/all-models/i-series/i4/navigation/bmw-i4-mini-landingpage-modelfinder.png",
      isCurrentlyRented: false,
    });
    return car;
  });
  afterEach(async () => car.destroy());

  it("should response with 200 as status code", async () => {
    const name = "BMW i9";
    const price = 120000;
    const size = "Sedan";
    const image = "https://www.bmw.co.id/content/dam/bmw/common/all-models/i-series/i4/navigation/bmw-i4-mini-landingpage-modelfinder.png";

    return request(app)
      .put(`/v1/cars/${car.id}`)
      .set("Content-Type", "application/json")
      .send({ name, price, size, image })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
            name,
            price,
            size,
            image,
            isCurrentlyRented,
          })
        );
      });
  });

  it("should response with 422 as status code", async () => {
    const name = "";
    const price = 0;
    const size = [];
    const image = null;

    return request(app)
      .put(`/v1/cars/${car.id}`)
      .set("Content-Type", "application/json")
      .send({ name, price, size, image })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(
          expect.objectContaining({
            err: {
              name: expect.any(String),
              message: expect.any(String),
            }
          })
        );
      });
  });
});