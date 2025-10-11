const { MongoClient, ObjectId } = require('mongodb');
const mongodb = require('../data/database'); // path to your database.js
const { getAllOrders, getSingleOrder } = require('../controllers/orders');

describe('getAllOrders', () => {
  let connection;
  let db;

  beforeAll(async () => {
    // Connect to in-memory MongoDB
    connection = await MongoClient.connect(global.__MONGO_URI__, {});
    db = connection.db(global.__MONGO_DB_NAME__);

    // Override getDatabase to use in-memory DB
    mongodb.getDatabase = () => db;

    // Insert test data
    await db.collection('orders').insertMany([
        {
    order_id: "frog shoes",
    user_id: "32423324",
    product_id: "123421432",
    quantity: "16",
    total_price: "51000",
    order_date: "today",
    status: "yes"
        },
        {
    order_id: "bucket",
    user_id: "9834298123",
    product_id: "8931409238",
    quantity: "2",
    total_price: "6541654",
    order_date: "juune 10th",
    status: "proccesing"
    }
    ]);
  });

  afterAll(async () => {
    // Close connection after all tests
    await connection.close();
  });

  it('should fetch all orders', async () => {
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

      getAllOrders(req, res);
    });

    // Fetch inserted documents to include _id automatically
    const insertedDocs = await db.collection('orders').find().toArray();

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(jsonMock).toHaveBeenCalledWith(insertedDocs);
  });
});


// get single
describe('getSingleOrder', () => {
    let connection;
    let db;
    let insertedOrder;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {});
        db = connection.db(global.__MONGO_DB_NAME__);
        mongodb.getDatabase = () => db;

        // Insert a test order
        const result = await db.collection('orders').insertOne({
            order_id: 'Test single order',
            user_id: 'yep',
            product_id: '5',
            quantity: 'sadf',
            total_price: 'asdf',
            order_date: "asdf",
            status: "dafasdf"
        });

        insertedOrder = { _id: result.insertedId, order_id: 'Test single order', user_id: 'yep', product_id: '5', quantity: 'sadf', total_price: 'asdf', order_date: "asdf", status: "dafasdf"};
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should fetch a single order by id', async () => {
        const req = { params: { id: insertedOrder._id.toString() } };

        const jsonMock = jest.fn();
        const statusMock = jest.fn(() => ({ json: jsonMock }));
        const setHeaderMock = jest.fn();
        const res = { status: statusMock, setHeader: setHeaderMock };

        await new Promise((resolve) => {
            res.json = (data) => { jsonMock(data); resolve(); };
            res.status = (code) => { statusMock(code); return res; };
            res.setHeader = setHeaderMock;

            getSingleOrder(req, res);
        });

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(jsonMock).toHaveBeenCalledWith(insertedOrder);
    });


});
