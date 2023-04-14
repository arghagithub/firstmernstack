const jwt = require("jsonwebtoken");
const JWTSecret = "~!@#$%&*()_+";
const fetchadmin = (req,res,next) => {
    const admintoken=req.header('auth-admintoken');
    if(!admintoken){
        res.status(401).send({ error: "please authenticate a valid admintoken" });
    }
    else{
        try{
            const data=jwt.verify(admintoken,JWTSecret);
            req.admin=data.admin;
            next();
        }
        catch(error){
            res.status(401).send({ error: "please authenticate a valid token" });
        }
    }
}

module.exports = fetchadmin;
