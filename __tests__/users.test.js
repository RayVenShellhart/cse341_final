const { MongoClient, ObjectId } = require('mongodb');
const mongodb = require('../data/database'); // path to your database.js
const { getAllUsers, getSingleUser } = require('../controllers/users');

describe('getAllUsers controller', () => {
  let connection;
  let db;

  beforeAll(async () => {
    // Connect to in-memory MongoDB
    connection = await MongoClient.connect(global.__MONGO_URI__, {});
    db = connection.db(global.__MONGO_DB_NAME__);

    // Override getDatabase to use in-memory DB
    mongodb.getDatabase = () => db;

    // Insert test data
    await db.collection('users').insertMany([
        {
    user_id: "asfeasqdf",
    username: "asdfarg",
    join_date: "aesfesfa",
    location: "afseaesf",
    bio: "aesfeasf"
        },
                {
    user_id: "adsfasdfdasdf",
    username: "asdasefsefefarg",
    join_date: "aesfeafsafefesfa",
    location: "eafesf",
    bio: "aeeafsfesfeasf"
        }
    ]);
  });

  afterAll(async () => {
    // Close connection after all tests
    await connection.close();
  });

  it('should fetch all users', async () => {
    const req = {};

    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const setHeaderMock = jest.fn();
    const res = { status: statusMock, setHeader: setHeaderMock };

    // Wait for controller to finish by resolving when res.json is called
    await new Promise((resolve) => {
      res.json = (data) => {
        jsonMock(data);
        resolve();
      };
      res.status = (code) => {
        statusMock(code);
        return res;
      };
      res.setHeader = setHeaderMock;

      getAllUsers(req, res);
    });

    // Fetch inserted documents to include _id automatically
    const insertedDocs = await db.collection('users').find().toArray();

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(jsonMock).toHaveBeenCalledWith(insertedDocs);
  });
});


// get single
describe('getSingleUser controller', () => {
    let connection;
    let db;
    let insertedUser;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {});
        db = connection.db(global.__MONGO_DB_NAME__);
        mongodb.getDatabase = () => db;

        // Insert a test user
        const result = await db.collection('users').insertOne(
            {
        user_id: "4235452352",
        username: "a43252345345ny",
        join_date: "an432532454325y",
        location: "a432543252345ny",
        bio: "an2345435234525y"
        }
        );

        insertedUser = { _id: result.insertedId, user_id: "4235452352", username: "a43252345345ny", join_date: "an432532454325y", location: "a432543252345ny", bio: "an2345435234525y" };
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should fetch a single user by id', async () => {
        const req = { params: { id: insertedUser._id.toString() } };

        const jsonMock = jest.fn();
        const statusMock = jest.fn(() => ({ json: jsonMock }));
        const setHeaderMock = jest.fn();
        const res = { status: statusMock, setHeader: setHeaderMock };

        await new Promise((resolve) => {
            res.json = (data) => { jsonMock(data); resolve(); };
            res.status = (code) => { statusMock(code); return res; };
            res.setHeader = setHeaderMock;

            getSingleUser(req, res);
        });

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(jsonMock).toHaveBeenCalledWith(insertedUser);
    });


});
