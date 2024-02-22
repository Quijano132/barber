import express from 'express';
import morgan from 'morgan';
const app =express();

//routes import
import clienteRoute from "./routes/cliente.routes.js";

//settings
app.set("port", 4000);


//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ message: "Formato JSON inválido" });
    }
});


//routes 
app.use("/api/Usuarios",clienteRoute)



export default app;