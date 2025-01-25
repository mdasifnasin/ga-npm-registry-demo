const mongoose = require('mongoose');
const { expect } = require('chai');

// Define the MongoDB URI
const uri = 'mongodb://localhost:27017/testdb';

// Define a sample schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);

describe('MongoDB Integration Tests', function () {
  // Connect to MongoDB before running tests
  before(async function () {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect after all tests
  after(async function () {
    await mongoose.disconnect();
  });

  it('should retrieve seeded users from the database', async function () {
    const users = await User.find();
    expect(users).to.have.lengthOf(2);
    expect(users[0]).to.have.property('name', 'Alice');
    expect(users[1]).to.have.property('email', 'bob@example.com');
  });

  it('should insert a new user into the database', async function () {
    const newUser = await User.create({ name: 'Charlie', email: 'charlie@example.com' });
    expect(newUser).to.have.property('name', 'Charlie');

    const users = await User.find();
    expect(users).to.have.lengthOf(3); // Including 2 seeded users
  });
});
