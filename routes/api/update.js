const express = require('express');
const router = express.Router();


router.put('/UpdateDetails', function (req, res) {
var db=req.app.locals.db;

    let data = Object.keys(req.body);
    let x = JSON.parse(data[0]);

    db.collection("Users").update(
        { token: x.token, "Topics.Topic_Id": x.Topic_id },
        { $set: { "Topics.$.Topic_Details": x.Topic_Details } }
    )

    db.collection('Users').find({ token: x.token }).toArray(function (err, result) {
        res.json(result[0].Topics);
    })
});

router.put('/UpdateTopics', function (req, res) {
var db=req.app.locals.db;

    let data = Object.keys(req.body);
    let x = JSON.parse(data[0]);

    db.collection("Users").update(
        { token: x.token, "Topics.Topic_Id": x.id },
        { $set: { "Topics.$.Topic_Name": x.New_Name } }
    )
    db.collection('Users').find({ token: x.token }).toArray(function (err, result) {
        res.json(result[0].Topics);
    })
});

module.exports=router;
