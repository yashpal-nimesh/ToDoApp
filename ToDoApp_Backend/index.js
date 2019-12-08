let express=require('express');
let app=express();
let bodyParser=require('body-parser');
var cors = require('cors');
const path=require('path');
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
let mongoClient=require('mongodb').MongoClient;
var db;
mongoClient.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',function(err,client){
    if(err) throw err;
    db=client.db('ToDoApp');
});
// let x=require('../ToDoApp_Frontend/public/')
// let x=path.join(__dirname+"/../"+'ToDoApp_Frontend','build','index.html')
// console.log(x)

// app.get('/ShowTopics',function(req,res){
//     console.log(req.body)
//     let data=Object.keys(req.body);
//     // console.log(JSON.parse(data[0]))
//     let x=JSON.parse(data[0]);
// console.log(x.token)
//     db.collection('Users').find( { token: x.token } ).toArray(function(err,result){
//         if(result.length===0){
//             let arr=[];
//             res.json(arr)
//         }
//         else{
//         res.json(result[0].Topics);
//         }
//     })
// })
app.post('/AddTopics',function(req,res){
    // console.log(req.body)
    let data=Object.keys(req.body);
    // console.log(JSON.parse(data[0]))
    let x=JSON.parse(data[0]);
    console.log(x)

db.collection("Users").update(
    { token: x.token },
    {
      $push: {
        Topics: {
           $each: [{Topic_Id : x.Topic_Id, Topic_Name : x.Topic_Name, Topic_Details : x.Topic_Details}]
        }
      }
    }
 )

 db.collection('Users').find( { token: x.token } ).toArray(function(err,result){
    // console.log(result)
    res.json(result[0].Topics);
})
});

app.delete('/DeleteTopics',function(req,res){
    console.log(req.body)
    let data=Object.keys(req.body);
    // console.log(JSON.parse(data[0]))
    let x=JSON.parse(data[0]);
    console.log(x)
    console.log(x.Topic_id);

db.collection("Users").update(
    { token: x.token },
    { $pull: { Topics: { Topic_Id:x.Topic_id} } },
    { multi: true }
 )
 db.collection('Users').find( { token: x.token } ).toArray(function(err,result){
    // console.log(result)
    res.json(result[0].Topics);
})
});


app.put('/UpdateTopics',function(req,res){
    // console.log(req.body)
    let data=Object.keys(req.body);
    // console.log(JSON.parse(data[0]))
    let x=JSON.parse(data[0]);
    console.log(x)

db.collection("Users").update(
    { token: x.token , "Topics.Topic_Id": x.id },
    { $set: { "Topics.$.Topic_Name" : x.New_Name } }
 )
 db.collection('Users').find( { token: x.token } ).toArray(function(err,result){
    // console.log(result)
    res.json(result[0].Topics);
})
});


app.put('/UpdateDetails',function(req,res){
    console.log(req.body)
    let data=Object.keys(req.body);
    // console.log(JSON.parse(data[0]))
    let x=JSON.parse(data[0]);
    console.log(x)

db.collection("Users").update(
    { token: x.token , "Topics.Topic_Id": x.Topic_id },
    { $set: { "Topics.$.Topic_Details" : x.Topic_Details } }
 )

 db.collection('Users').find( { token: x.token } ).toArray(function(err,result){
    // console.log(result)
    res.json(result[0].Topics);
})
});


app.post('/AddUsers',function(req,res){
// console.log(req.body)
    let data=(Object.keys(req.body));
    let main=(JSON.parse(data[0]));
    // console.log(main)
    let obj={Name:main.name,
        token :main.token,
        "Topics" : []
      }
db.collection('Users').find( { token: { $in: [obj.token] } } ).toArray(function(err,result){
    // console.log(result)
if(result.length===0){
       db.collection('Users').insert(obj,function(err,result){
    //    console.log(result);
   });
}
else{
    db.collection('Users').find( { token: obj.token } ).toArray(function(err,result){
        // console.log(result)
        res.json(result[0].Topics);
    })
}
})

});

if(process.env.NODE_ENV==="production"){
    app.use(express.static(__dirname+"/../"+'ToDoApp_Frontend','build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname+"/../"+'ToDoApp_Frontend','build','index.html'));
    })

}

const port =process.env.PORT || 9000;




app.listen(port);