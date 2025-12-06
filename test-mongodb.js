// Test MongoDB Atlas Connection
const mongoose = require('mongoose');
const fs = require('fs');

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const MONGODB_URI = envFile.match(/MONGODB_URI=(.*)/)?.[1]?.trim();

console.log('Testing MongoDB Atlas connection...');
console.log('Connection string:', MONGODB_URI ? MONGODB_URI.replace(/:[^:@]+@/, ':****@') : 'NOT FOUND');

async function testConnection() {
  try {
    console.log('\nAttempting to connect...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Successfully connected to MongoDB Atlas!');
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n✓ Available collections:', collections.map(c => c.name).join(', ') || '(none yet)');
    
    await mongoose.disconnect();
    console.log('\n✓ Connection test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.error('\n⚠ Authentication failed. Please check:');
      console.error('  1. Username is correct: eshwar091106_db_user');
      console.error('  2. Password is correct in .env.local');
      console.error('  3. Database user exists in MongoDB Atlas');
      console.error('  4. Password doesn\'t contain special characters that need URL encoding');
      console.error('\nTo fix:');
      console.error('  1. Go to MongoDB Atlas → Database Access');
      console.error('  2. Edit the user or create a new one');
      console.error('  3. Set a simple password (no special chars) or URL encode it');
      console.error('  4. Update MONGODB_URI in .env.local');
    }
    
    process.exit(1);
  }
}

testConnection();
