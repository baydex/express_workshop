const express = require("express")
const user = express.Router();


user.post("/", async (req, res, next) => {
    console.log(req.body)
    return res.status(201).json({code: 201, message: "Usuario registrado correctamente"})
});


module.exports = user