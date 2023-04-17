const express = require("express")
const { connection } = require("./db")
const { UserRouter } = require("./routes/blog.route")
const { BlogRouter } = require("./routes/blog.route")
const { auth } = require("./middleware/auth.middleware")
require("dotenv").config()
const app = express()
app.use(express.json())
//accroding to role divided the permission
const role = {
    user: {
        permissions: ['read', 'write', 'delete', 'update']
    },
    Moderator: {
        permissions: ['delete']
    }
};


function Access_to_different_roles(role) {
    return function (req, res, next) {
        if (req.user && role[req.user.role] && role[req.user.role].permissions.includes(req.method.toLowerCase())) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    };
}


app.use('/user', Access_to_different_roles('user'), BlogRouter)

app.get('/Morderator', Access_to_different_roles('Morderator'), BlogRouter)

//user routes
app.use("/user", UserRouter)

//after authentication 
app.use(auth)
//blog routes
app.use("./blog", BlogRouter)

//server
app.listen(process.env.port, async (res, err) => {
    try {
        await connection
        console.log("Connected to the DB")

    }
    catch (err) {
        console.log(err)
    }
    console.log(`Server are running at port ${process.env.port}`)
})
