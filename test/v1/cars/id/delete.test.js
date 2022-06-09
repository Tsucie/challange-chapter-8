const request = require('supertest');
const app = require('../../../../app');
const { Car } = require('../../../../app/models');

describe('DELETE /v1/cars/:id', () => {
  let token;
  beforeAll((done) => {
    request(app)
      .post('/v1/auth/login')
      .send({
        email: 'adji@binar.com',
        password: 'rahasia',
      })
      .expect(201)
      .end((err, res) => {
        if(err) throw err;
        token = res.body.token;
        done();
      });
  });

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
  afterEach(() => car.destroy());

  it("should response with 204 as status code", async () => {
    return request(app)
      .delete(`/v1/cars/${car.id}`)
      .set("authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(204);
      });
  });
});