const mongoose=require('mongoose');
const mongouri='mongodb://127.0.0.1:27017/billingsystem?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

const connectToMongo=()=>{
    mongoose.connect(mongouri).then(()=>{
        console.log("successfully connected to mongodb");
    }).catch(()=>{
        console.log("sorry, don't connect to mongodb");
    })
}

module.exports=connectToMongo;