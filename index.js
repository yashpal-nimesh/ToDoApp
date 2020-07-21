let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
let mongoClient = require('mongodb').MongoClient;

var url
if (process.env.DB_URL) {
    url = process.env.DB_URL
} else {
    url = 'mongodb://127.0.0.1:27017'
}
var db;
mongoClient.connect(url, function (err, client) {
    if (err) throw err
    app.locals.db = client.db("ToDoApp")
})



var addTopics = require('./routes/api/add');
app.use('/add', addTopics);
var deleteTopics = require('./routes/api/delete');
app.use('/delete', deleteTopics);
var updateTopics = require('./routes/api/update');
app.use('/add', updateTopics);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname + 'client', 'build', 'index.html'));
    })

}

const port = process.env.PORT || 5000;




app.listen(port);