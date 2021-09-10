const express = require("express")
const pokemon = express.Router();
const db = require('../config/database')


pokemon.post("/", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)"
        query += ` VALUES ('${pok_name}',${pok_height},${pok_weight},${pok_base_experience}) `;
    
        const rows = await db.query(query)
        console.log(rows)
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Pokemon insertado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
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