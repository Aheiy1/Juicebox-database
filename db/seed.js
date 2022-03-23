const { client, getAllUsers, createUser } = require("./index");
const users = require("../Database");
async function dropTables() {
  try {
    console.log("starting to drop tables....");
    await client.query(`DROP TABLE IF EXISTS users;`);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log(users, "users");
    for (const user of users) {
      await createUser(user);
    }
    console.log("finished creating users");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
    
    );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
    //   } finally {
    //     client.end();
    //   }
  }
}
async function testDB() {
  try {
    // connect the client to the database, finally
    console.log("Starting to test database...");

    // queries are promises, so we can await them
    const users = await getAllUsers();
    // for now, logging is a fine way to see what's up
    console.log(users, "getAllUsers");
    console.log("finished database test");
  } catch (error) {
    console.error("error testing database");
    throw error;
    //   } finally {
    //     // it's important to close out the client connection
    //     client.end();
    //   }
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
