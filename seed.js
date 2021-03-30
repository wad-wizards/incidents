const faker = require("faker");
const db = require("./db");
const Incident = require("./models/incident.model");
const { generateRecordNumber } = require("./controllers/helpers");

const collect = (x) => (cb) => {
  const acc = [];
  for (let i = 0; i < x; i++) {
    acc.push(cb());
  }
  return acc;
};

const fakeInicident = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  priority: faker.random.arrayElement(["LOW", "MEDIUM", "HIGH"]),
  recordNumber: generateRecordNumber(),
  customer: faker.company.companyName(),
});

async function seed() {
  await db.connect();
  await Incident.deleteMany({});
  await Incident.insertMany(collect(20)(fakeInicident));
  await db.closeConnection();
}

seed();
