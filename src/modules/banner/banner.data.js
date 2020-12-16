/* eslint-disable no-console */
import Users from "./banner.model";

const users = [
];


async function populateUser() {
  for (let i = 0; i < users.length; i++) {
    await Users.create(users[i]);
  }
}

Users.countDocuments((err, count) => {
  if (!err && count === 0) {
    populateUser();
  }
});
