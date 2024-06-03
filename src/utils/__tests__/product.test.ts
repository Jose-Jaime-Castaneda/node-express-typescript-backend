import request from "supertest";
import server from "../../server";

describe("POST /api/productos", () => {
  test("Should display validation errors", async () => {
    const response = await request(server).post("/api/productos").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(404);
  });

  test("Should display validation errors whrn price is lower than 0", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Teclado testing",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(404);
  });

  test("Should create a new product", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Teclado testing",
      price: 45,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/productos", () => {
  test("Get a JSON response with products", async () => {
    const response = await request(server).get("/api/productos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/productos/:id", () => {
  test("Should return a 404 response for non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/productos/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("Should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/productos/not-valid");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("Get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/productos/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/productos/:id", () => {
  test("Should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put("/api/productos/not-valid")
      .send({
        name: "Monitor Test",
        price: 300,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("Should display validation error message when updating", async () => {
    const response = await request(server).put("/api/productos/1").send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should display validation error message when price is not valid", async () => {
    const response = await request(server).put("/api/productos/1").send({
      name: "Monitor Test",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toBe("Precio no válido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should return a 404 if product does not exist", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/productos/${productId}`)
      .send({
        name: "Monitor Test",
        price: 300,
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should update an existing product with valid data", async () => {
    const response = await request(server).put("/api/productos/1").send({
      name: "Super Mega Tecaldo de testing",
      price: 10008000,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
  });
});

describe("PATCH /api/productos/:id", () => {
  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).patch(`/api/productos/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should update the prodcut availability", async () => {
    const response = await request(server).patch("/api/productos/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/productos/:id", () => {
  test("Should check a valid ID in the URL", async () => {
    const response = await request(server).delete("/api/productos/not-valid");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("Should retunr 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).delete(
      `/api/productos/${productId}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(200);
  });

  test("Should remove an existing product", async () => {
    const response = await request(server).delete("/api/productos/1");

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Producto Eliminado");
  });
});
