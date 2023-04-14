const jwt = require("jsonwebtoken");
const JWTSecret = "~!@#$%&*()_+";
const fetchuser= (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({ error: "please authenticate a valid token" });
    }
    else{
        try{
            const data=jwt.verify(token,JWTSecret);
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({ error: "please authenticate a valid token" });
        }
    }
}

module.exports = fetchuser;