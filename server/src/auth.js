const jwt = require("jsonwebtoken")

const blogModel = require("./model/blogModel")
const userModel = require("./model/userModel")

//================================================ Authentication ======================================================//

const authenticate = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]

        if (!token) {
            return res.status(400).send({ status: false, message: "token must be present in headers" })
        }
        else {
            
            jwt.verify(token, "the-secret-key", function (err, decodedToken) {

                if (err) {
                    if(err.message=="invalid token"){
                        return res.status(401).send({ status: false, message: "Token in not valid" })}

                    if(err.message=="jwt expired"){
                        return res.status(401).send({ status: false, message: "Token has been expired" })
                    }
                    return res.status(401).send({ status: false, message: err.message })

                }
                else{
                    req.loginUserId = decodedToken.userId       // golbelly  in  decodedToken.id 
                    next()

                }
            })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//===============================================authorisation====================================================//

const authorisation = async function (req, res, next) {
    try {

        let idParams = req.params.blogId  

        if (!idParams)return res.status(400).send({ status: false, message: 'blogId should be in params' });
            
        let checkId = await blogModel.findById(idParams )
            
        if(!checkId){return res.status(404).send({ status: false, message: 'blogId does not exists' }) }

        let userId = checkId.userId

        let tokenUserId = req.loginUserId // token Id

        if (tokenUserId != userId) { return res.status(403).send({ status: false, message: "You are not authorised to perform this task 1" }) }
        
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}



module.exports.authenticate = authenticate
module.exports.authorisation = authorisation

