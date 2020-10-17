let request;
const supertest = require('supertest');
const { app, getServer } = require("../app");

describe('test my API', () => {
  beforeAll(() => {
    request = supertest(app);
  })
  afterAll(async(done) => {
    getServer().close(() => {
      console.log('server closed');
      done();
    })
  })

  test('all products', async() => {
    let products = [
      {
        id: 1,
        name: "book",
      },
      {
        id: 2,
        name: "book2",
      },
    ];

    const res = await request.get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(products);
  })

  test("get one product", async () => {
    let product = {
        id: 1,
        name: "book",
    };

    const res = await request.get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(product);
  });

  test("create one product", async () => {
    let product = {
      name: "book3",
    };

    const res = await request
      .post("/products")
      .send(product);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 3, ...product});

    const newRes = await request.get("/products");
    let products = [
      {
        id: 1,
        name: "book",
      },
      {
        id: 2,
        name: "book2",
      },
      {
        id: 3,
        name: "book3",
      },
    ];

     // console.log(newRes.body);
     expect(newRes.body).toEqual(products);
  });
})