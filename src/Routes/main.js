import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/AppError.js";

const prisma = new PrismaClient();

const mainRouter  = Router();


mainRouter.post('/users' , async(req, res) => {


        const {name, email, contact} = req.body;

        try {
            const newUser = await prisma.user.create({
                data: { name, email , contact}

            })
            res.status(201).json(newUser)
        }catch (error){
            next(new AppError('Erro ao criar usuário', 500));
        }

    })



mainRouter.put('/users/:id' , async(req, res) => {
    const userId = parseInt(req.params.id)
    const {name, email, contact} = req.body;

    try {
        const updateUser = await prisma.user.update({
            where: { id: userId},
            data: {name, email, contact}

        })
        res.status(200).json(updateUser)
    }catch (error){
        next(new AppError('Erro ao atualizar usuário', 500));
    }

})



mainRouter.get('/users' , async(req, res) => {
    const {name, email, contact} = req.query

    try {
        let users = []
        if(name || email || contact){
            users  = await prisma.user.findMany({
                where: {
                    name: name || undefined,
                    email: email || undefined,
                    contact: contact || undefined
                }
            })
    
        }else{
            users = await prisma.user.findMany()
        }
        res.status(200).json(users)
        
    }catch (error) {
        next(new AppError('Erro ao buscar usuários', 500));
    }

})


//delete
mainRouter.delete('/users/:id' , async(req, res) => {
    const userId =  parseInt(req.params.id)

    try {
        await prisma.user.delete({
            where: { id: userId}
        })
        res.status(200).json({message: "Usuário deletado com sucesso"})
    }catch (error) {
        next(new AppError(`Erro ao deletar usuário ${userId}`, 500));
}

})

export {mainRouter}