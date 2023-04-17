const express = require("express")
const UserRouter = express.Router()
const { blacklist } = require("../blacklist")
const { UserModel } = require("../model/user.model")
const { auth } = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//to see  all the user
UserRouter.get("/alluser", async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})


//in this signup section we are register through  uiing email and hasing password
//signup section
UserRouter.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        bcrypt.hash(password, 3, async (req, hash) => {
            const user = new UserModel({ name, email, password: hash, role })
            await user.save()
            res.status(200).send("Register Has been Done")
        })
    }
    catch (error) {
        res.status(400).send({ "msg": "Sucessfully not registered" })
    }

})

//here we are creating a token as weel as refrerstoken the validity of that token is 1 m for tojken and 3 m for refresh token
//signin section
UserRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, resualt) => {
                if (resualt) {
                    const token = jwt.sign({ "userId": user._id }, "chandan", { expiresIn: "1m" })
                    const refreshtoken = jwt.sign({ "userId": user._id }, "kumar", { expiresIn: "3m" })
                    user.refreshtoken = refreshtoken
                    await user.save()
                    res.status(200).send({ "msg": "Register Has been Done", token, refreshtoken })
                }
                else {
                    res.status(200).send("Login Failed")

                }
            })
        }

    }
    catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


//here is logout section we are loging out using  the blacklist
//logout section
UserRouter.get("/logout", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    blacklist.push(token)
    res.send("LogOut Sucessfully")

})


module.exports = { UserRouter }