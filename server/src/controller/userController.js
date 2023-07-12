const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")



//<<<<<<<<------------------- Creat-User-Api -------------------->>>>>>>>>>>>>

const createUser = async (req, res) => {
    try {
        let data = req.body
        let { name, email, password} = data
        //  CHECK  if request body is empty
        if (!Object.keys(data).length > 0) return res.status(400).send({ status: false, error: "Please enter data" })

        if (!name) { return res.status(400).send({ status: false, message: "name is mandatory" }) }
        if (!email) { return res.status(400).send({ status: false, message: "email is mandatory" }) }
        if (!password) { return res.status(400).send({ status: false, message: "password is mandatory" }) }


        email = data.email = data.email.toLowerCase()
        const isEmailAlreadyUsed = await userModel.findOne({ email: email })
        if (isEmailAlreadyUsed) return res.status(400).send({ status: false, message: `This ${email} email is  already exists, please provide another email` })



        
        const createdUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: createdUser })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//<<<<<<<<------------------- LogIn User-Api -------------------->>>>>>>>>>>>>

let login = async function (req, res) {
    try {
        let credentials = req.body
        let { email, password } = credentials
        if (Object.keys(credentials).length == 0) {
            return res.status(400).send({ status: false, message: "email and password are required for Log in" })
        }
        if (!email) { return res.status(400).send({ status: false, message: "email is mandatory" }) }
        if (!password) { return res.status(400).send({ status: false, message: "password is mandatory" }) }

        if (email.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).send({ status: false, message: "both fields are required." })
        }

        let userDetail = await userModel.findOne({ email: email })
        if (!userDetail) {
            return res.status(404).send({ status: false, message: "User not found with this EmailId" })
        }

        let token = jwt.sign({
            userId: userDetail._id.toString(),

        }, "the-secret-key", { expiresIn: '10d' })
        res.setHeader("Authorization", token)

        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: userDetail._id, token: token } })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}
module.exports = {createUser, login}