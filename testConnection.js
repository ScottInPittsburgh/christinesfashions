const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://scottdrickman27:Fc1M6Jft6ycdVZvr@cluster0.gmyhuuh.mongodb.net/ChristinesFashions?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
