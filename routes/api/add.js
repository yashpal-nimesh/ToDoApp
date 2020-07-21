const express = require('express');
const router = express.Router();


router.get('/ShowTopics', function (req, res) {
var db=req.app.locals.db;

    // let data = Object.keys(req.body);
    // let x = JSON.parse(data[0]);
    db.collection('Users').find().toArray(function (err, result) {
        if (result.length === 0) {
            let arr = [];
            res.json(arr)
        }
        else {
            res.json(result[0].Topics);
        }
    })
})

router.post('/AddUsers', function (req, res) {
var db=req.app.locals.db;

    let data = (Object.keys(req.body));
    let main = (JSON.parse(data[0]));
    let obj = {
        Name: main.name,
        token: main.token,
        "Topics": []
    }
    db.collection('Users').find({ token: { $in: [obj.token] } }).toArray(function (err, result) {
        if (result.length === 0) {
            db.collection('Users').insert(obj, function (err, result) {
            });
        }
        else {
            db.collection('Users').find({ token: obj.token }).toArray(function (err, result) {
                res.json(result[0].Topics);
            })
        }
    })

});

router.post('/AddTopics', function (req, res) {
    let data = Object.keys(req.body);
    let x = JSON.parse(data[0]);

    db.collection("Users").update(
        { token: x.token },
        {
            $push: {
                Topics: {
                    $each: [{ Topic_Id: x.Topic_Id, Topic_Name: x.Topic_Name, Topic_Details: x.Topic_Details }]
                }
            }
        }
    )

    db.collection('Users').find({ token: x.token }).toArray(function (err, result) {
        res.json(result[0].Topics);
    })
});


module.exports=router;
