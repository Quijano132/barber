import express from 'express';
import morgan from 'morgan';
const app =express();

//routes import
import barberoRoute from "./routes/barbero.routes.js";
import citasRoute from "./routes/citas.routes.js"
import usuarioRoutes from "./routes/usuarios.routes.js"
import categoriaRoutes from "./routes/categoria.routes.js"
import serviciosRoutes from "./routes/servicios.routes.js"

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
app.use("/api/Barbero",barberoRoute)
app.use("/api/Citas",citasRoute)
app.use("/api/Usuarios",usuarioRoutes)
app.use("/api/Categorias",categoriaRoutes)
app.use("/api/Servicios", serviciosRoutes)



export default app;