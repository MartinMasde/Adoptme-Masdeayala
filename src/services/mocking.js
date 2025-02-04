import { faker, th } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

class MockingService {
    static async generateMockingUsers(num) {
        const users = [];
        for (let i = 0; i < num; i++) {
            users.push ({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(['admin', 'user']),
                pets: []
            })
        }
        return users;
    }

    static async generateMockingPets(num) {
        const pets = [];
        for (let i = 0; i < num; i++) {
            pets.push({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                adopted: false,
                birthDate: faker.date.past(),
                image: "https://via.placeholder.com/150"
            })
        }
        return pets;
    }

    static async insertUsersIntoDB(users) {
        try {
            await userModel.insertMany(users);
            console.log(`${users.lenght} Users inserted successfully`);
        } catch (error) {
            console.error('Error inserting users', error);
            throw error;
        }
    }

    static async insertPetsIntoDB(pets) {
        try {
            await petModel.insertMany(pets);
            console.log(`${pets.lenght} Pets inserted successfully`);
        } catch (error) {
            console.error('Error inserting pets', error);
            throw error;
        }
    }
}

export default MockingService;

