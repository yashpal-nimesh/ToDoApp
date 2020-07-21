const express = require('express');
const router = express.Router();


router.delete('/DeleteTopics', function (req, res) {
var db=req.app.locals.db;

    let data = Object.keys(req.body);
    let x = JSON.parse(data[0]);

    db.collection("Users").update(
        { token: x.token },
        { $pull: { Topics: { Topic_Id: x.Topic_id } } },
        { multi: true }
    )
    db.collection('Users').find({ token: x.token }).toArray(function (err, result) {
        res.json(result[0].Topics);
    })
});


module.exports=router;
