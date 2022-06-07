const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../../app/models');

describe('POST /v1/cars/:id/rent', () => {
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

  it("should response with 201 as status code", async () => {
    return request(app)
      .post(`/v1/cars/${car.id}/rent`)
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
            userId,
            carId,
            rentStartedAt,
            rentEndedAt,
          })
        );
      });
  });

  it("should response with 422 as status code", async () => {
    return request(app)
      .post(`/v1/cars/${car.id}/rent`)
      .set("Content-Type", "application/json")
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