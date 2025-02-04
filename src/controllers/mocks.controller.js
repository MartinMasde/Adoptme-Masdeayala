import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
  const pets = await MockingService.generateMockingPets(50);
  res.send({ status: "success", payload: pets });
};

const getMockingUsers = async (req, res) => {
  const users = await MockingService.generateMockingUsers(50);
  res.send({ status: "success", payload: users });
};

const generateData = async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).send({ status: "error", message: "Missing parameters" });
    }
    const generatedUsers = await MockingService.generateMockingUsers(Number(users));
    const generatedPets = await MockingService.generateMockingPets(Number(pets));

    await MockingService.insertUsersIntoDB(generatedUsers); // Para insertar los users en la base de datos
    await MockingService.insertPetsIntoDB(generatedPets); // Para insertar los pets en la base de datos

    res.send({ status: "success", payload: { generatedUsers, generatedPets } });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export default {
  getMockingPets,
  getMockingUsers,
  generateData,
};
