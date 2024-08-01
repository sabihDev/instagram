const mongoose = require('mongoose');
 
function Connect(url) {
    mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

module.exports = Connect;