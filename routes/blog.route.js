const express = require("express")
const BlogRouter = express.Router
const { BlogModel } = require("../model/blog.model")
const jwt = require("jsonwebtoken")

//to see  all the blog
BlogRouter.get("/allblog", async (req, res) => {
    try {
        const user = await BlogModel.find();
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

//to catch by particular id
BlogRouter.get("/blog/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await BlogModel.find({ _id: id });
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send({ "msg": error.message })
    }
});

//to add a blog
BlogRouter.post("/postblog", async (req, res) => {
    const payload = req.body
    try {
        const blog = new BlogModel(payload)
        res.status(200).send(await blog.save())

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

//to update blog
BlogRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.body
    const update = req.body
    const data = await BlogModel.findOne({ _id: id }, update)
    const blogid = data.userId;
    const blogidreq = req.body.userId;

    try {
        if (blogidreq !== blogid) {
            res.send({ msg: "You not Eligible to do this " })
        }
        else {
            await BlogModel.findByIdAndUpdate({ _id: id }, update)
            res.send("Updated Sucessfully")
        }

    } catch (error) {
        res.status(400).send({ "msg": "wrong crediantial", err: error.message })

    }


})

//delete by the id 
BlogRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.body
    const update = req.body
    const data = await BlogModel.findOne({ _id: id }, update)
    const blogid = data.userId;
    const blogidreq = req.body.userId;

    try {
        if (blogidreq !== blogid) {
            res.send({ msg: "You not Eligible to do this " })
        }
        else {
            await BlogModel.findByIdAndDelete({ _id: id }, update)
            res.send("Deleted Sucessfully")
        }

    } catch (error) {
        res.status(400).send({ "msg": "wrong crediantial", err: error.message })

    }


})

module.exports = { BlogRouter }