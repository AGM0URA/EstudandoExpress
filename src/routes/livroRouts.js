import {Router } from "express";
import conn from "../config/conn.js";


const router = Router()

router.get("/",(request,response)=>{
    const sql = `SELECT * FROM LIVROS`

    conn.query(sql,(err,data)=>{

        if(err){
            response.status(500).json({msg:"erro ao buscar livros"})
            return
        }
        const livros = data
        response.status(200).json(livros)
    })
})

export default router