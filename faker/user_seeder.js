import { faker } from "@faker-js/faker";
import _ from "lodash";
import fs from "fs";
 
const gender = ["male", "female"];
 
const userIds = [];
 
const generateUser = () => ({
  _id: faker.string.alphanumeric(24),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.string.alphanumeric(30),
  isAdmin: false,
  age: faker.number.int({ min: 22, max: 60 }),
  gender: faker.helpers.arrayElement(gender),
  dob: faker.date.between("1970-01-01", "2002-12-31"),
});
 
const users = _.times(5, generateUser);
 
users.forEach((data) => {
  userIds.push(data._id);
});
 
console.log(userIds);
 
const uidJSON = JSON.stringify(userIds, null, 2);
// Write JSON data to a file
fs.writeFile("user_ids.json", uidJSON, (err) => {
  if (err) throw err;
  console.log("Data has been written to uids.json");
});
 
// Convert data to JSON format
const jsonData = JSON.stringify(users, null, 2); // The second argument (null) is for replacer function, and the third argument (2) is for indentation
 
// Write JSON data to a file
fs.writeFile("user_data.json", jsonData, (err) => {
  if (err) throw err;
  console.log("Data has been written to data.json");
});