import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Test funcional del router adoptions", () => {
    let adoptionId = "67be43b097c19b710dd4ade8";
    let userId = "67a1672e79ad7a0584b3b3d9";
    let petId = "67a1672e79ad7a0584b3b3dd";

    it("deberia obtener todas las adopciones", async () => { 
        const res = await requester.get("/api/adoptions");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.payload).to.be.an("array");
    });

    it("debería obtener una adopción por ID", async () => {
        const res = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(res.status).to.equal(200);
        expect(res.body.payload).to.have.property("_id").that.equals(adoptionId);
      });

    it("debería devolver un error para un ID de adopción inexistente", async () => { 
        const res = await requester.get("/api/adoptions/65f2abcd1234abcd5678ef99");
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "Adopción no encontrada");
    });

    it("debería crear una nueva solicitud de adopción ", async () => {
        const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body).to.have.property("message", "Mascota adoptada");
    });

    it("debe retornar un error para un usuario inexistente", async () => {
        const res = await requester.post(`/api/adoptions/65f2abcd1234abcd5678ef99/${petId}`);
        expect(res.status).to.equal(404); 
        expect(res.body).to.have.property("error", "Usuario no encontrado");
    });
    
    it("sdebe retornar un error para un mascota inexistente", async () => {
        const res = await requester.post(`/api/adoptions/${userId}/65f2abcd1234abcd5678ef99`);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "Mascota no encontrada");
    });

    it("debe retornar un error si la mascota ya fue adoptada", async () => {
        await requester.post(`/api/adoptions/${userId}/${petId}`); 
        const res = await requester.post(`/api/adoptions/${userId}/${petId}`); 
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Mascota ya adoptada");
    });
});
