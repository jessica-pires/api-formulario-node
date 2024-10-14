import express from 'express';
import { mainRouter } from './Routes/main.js';
import { AppError } from './utils/AppError.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT);
console.log(`rodando na porta ${PORT}`)



app.use((error, req , res, next)  =>{
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Interval server error"
    }) 
});
app.use(mainRouter)