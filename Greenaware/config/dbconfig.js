const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://anjumuzair46:Uzairanjum46@clusterfullstack.gdw6vxl.mongodb.net/Greenaware';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected successfully to MongoDB!")

});

module.exports = mongoose;
