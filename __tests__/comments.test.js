const { MongoClient, ObjectId } = require('mongodb');
const mongodb = require('../data/database'); // path to your database.js
const { getAllComments, getSingleComment } = require('../controllers/comments');


// get all
describe('getAllComments', () => {
  let connection;
  let db;

  beforeAll(async () => {
    // Connect to in-memory MongoDB
    connection = await MongoClient.connect(global.__MONGO_URI__, {});
    db = connection.db(global.__MONGO_DB_NAME__);

    // Override getDatabase to use in-memory DB
    mongodb.getDatabase = () => db;

    // Insert test data
    await db.collection('comments').insertMany([
      {
        comment: 'nice',
        date_posted: 'today',
        rating: '4',
        user_id: '1233214',
        username: 'bill',
      },
      {
        comment: 'no',
        date_posted: 'tommorow',
        rating: '5',
        user_id: '534532542354354',
        username: 'alice',
      },
    ]);
  });

  afterAll(async () => {
    // Close connection after all tests
    await connection.close();
  });

  it('should fetch all comments', async () => {
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

      getAllComments(req, res);
    });

    // Fetch inserted documents to include _id automatically
    const insertedDocs = await db.collection('comments').find().toArray();

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(jsonMock).toHaveBeenCalledWith(insertedDocs);
  });
});


// get single
describe('getSingleComment', () => {
    let connection;
    let db;
    let insertedComment;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {});
        db = connection.db(global.__MONGO_DB_NAME__);
        mongodb.getDatabase = () => db;

        // Insert a test comment
        const result = await db.collection('comments').insertOne({
            comment: 'Test single comment',
            date_posted: 'today',
            rating: '5',
            user_id: 'abc123',
            username: 'tester'
        });

        insertedComment = { _id: result.insertedId, comment: 'Test single comment', date_posted: 'today', rating: '5', user_id: 'abc123', username: 'tester' };
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should fetch a single comment by id', async () => {
        const req = { params: { id: insertedComment._id.toString() } };

        const jsonMock = jest.fn();
        const statusMock = jest.fn(() => ({ json: jsonMock }));
        const setHeaderMock = jest.fn();
        const res = { status: statusMock, setHeader: setHeaderMock };

        await new Promise((resolve) => {
            res.json = (data) => { jsonMock(data); resolve(); };
            res.status = (code) => { statusMock(code); return res; };
            res.setHeader = setHeaderMock;

            getSingleComment(req, res);
        });

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(jsonMock).toHaveBeenCalledWith(insertedComment);
    });

});
