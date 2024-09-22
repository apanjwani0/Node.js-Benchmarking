const { faker } = require('@faker-js/faker');

const generateData = ({ count = 1000, distinctIndexFields = 1000 }) => {
  const data = [];
    for (let i = 0; i < count; i++) {
    data.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      country: faker.address.country(),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.number('+91##########'),
      createdAt: faker.date.past(),
      indexField: faker.datatype.number({ min: 1, max: distinctIndexFields })
    });
  }
  return data;
};

module.exports = { generateData };
