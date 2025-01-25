const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/testdb';

const run = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Example: Create a collection and seed it
    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
    });

    const User = mongoose.model('User', UserSchema);

    // Clear the collection (if exists) and seed data
    await User.deleteMany({});
    await User.create([{ name: 'Alice', email: 'alice@example.com' }, { name: 'Bob', email: 'bob@example.com' }]);

    console.log('Database setup complete');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  }
};

run();
