const express = require("express")
const pokemon = express.Router();
const db = require('../config/database')


pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body)
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon")
    // console.log(pkmn)
    return res.status(200).json({code: 1, message: pkmn})
})


pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 722) {
        pkmn = await db.query("SELECT * FROM pokemon where pok_id="+id);
        return res.status(200).json({code: 1, message: pkmn})
    }
    return res.status(404).json({code: 404, message: "pokemon no encontado"})
    
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name
    
    const pkmn = await db.query("SELECT * FROM pokemon where pok_name='"+name+"'");

    (pkmn.length > 0) ? res.status(200).json({code: 1, message: pkmn}) : res.status(404).json({code: 404, message: "pokemon no encontado"})
})

module.exports = pokemon