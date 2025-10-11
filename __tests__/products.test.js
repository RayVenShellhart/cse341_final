const { MongoClient, ObjectId } = require('mongodb');
const mongodb = require('../data/database'); // path to your database.js
const { getAllProducts, getSingleProduct } = require('../controllers/products');

describe('getAllProducts controller', () => {
  let connection;
  let db;

  beforeAll(async () => {
    // Connect to in-memory MongoDB
    connection = await MongoClient.connect(global.__MONGO_URI__, {});
    db = connection.db(global.__MONGO_DB_NAME__);

    // Override getDatabase to use in-memory DB
    mongodb.getDatabase = () => db;

    // Insert test data
    await db.collection('products').insertMany([
        {
    product_id: "12313134134",
    product_name: "not frog shoes",
    category: "not shoes",
    price: "we owe you",
    release_date: "no",
    description: "a"
    },
    {
    product_id: "1324231",
    product_name: "dfasf",
    category: "adsfasfsadf",
    price: "easfaswf",
    release_date: "easf",
    description: "sass"
    }
    ]);
  });

  afterAll(async () => {
    // Close connection after all tests
    await connection.close();
  });

  it('should fetch all products', async () => {
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

      getAllProducts(req, res);
    });

    // Fetch inserted documents to include _id automatically
    const insertedDocs = await db.collection('products').find().toArray();

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(jsonMock).toHaveBeenCalledWith(insertedDocs);
  });
});



// get single
describe('getSingleProduct', () => {
    let connection;
    let db;
    let insertedProduct;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {});
        db = connection.db(global.__MONGO_DB_NAME__);
        mongodb.getDatabase = () => db;

        // Insert a test product
        const result = await db.collection('products').insertOne({
            product_id: "RSGDSRDGRSDG",
            product_name: "anyrsgrdgsrdgrdsg",
            category: "rsdgsdrgrdgrd",
            price: "anrsdgrdgrdgy",
            release_date: "arsdgdsrgrdgny",
            description: "anrdsgsdrgsdrgy"
        });

        insertedProduct = { _id: result.insertedId, product_id: "RSGDSRDGRSDG", product_name: "anyrsgrdgsrdgrdsg", category: "rsdgsdrgrdgrd", price: "anrsdgrdgrdgy", release_date: "arsdgdsrgrdgny", description: "anrdsgsdrgsdrgy"};
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should fetch a single product by id', async () => {
        const req = { params: { id: insertedProduct._id.toString() } };

        const jsonMock = jest.fn();
        const statusMock = jest.fn(() => ({ json: jsonMock }));
        const setHeaderMock = jest.fn();
        const res = { status: statusMock, setHeader: setHeaderMock };

        await new Promise((resolve) => {
            res.json = (data) => { jsonMock(data); resolve(); };
            res.status = (code) => { statusMock(code); return res; };
            res.setHeader = setHeaderMock;

            getSingleProduct(req, res);
        });

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(jsonMock).toHaveBeenCalledWith(insertedProduct);
    });


});
