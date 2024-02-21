import{getConnection} from "../database/database.js";

export const getClients = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM barbero")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
    
};


export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query('SELECT id, customer name FROM barbero WHERE id = ?', [id]);
        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Barbero no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async(req, res)=>{
    try{
        const{nombreBarbero, apellidoBarbero, foto,nombrebarberia,horario,descripcion,numeroCelular}=req.body;
        
        if(nombreBarbero== undefined || apellidoBarbero == undefined || foto == undefined || nombrebarberia == undefined|| horario == undefined|| descripcion == undefined|| numeroCelular == undefined){
            res.status(400).json({message:"Bad Request. Please fill all field"});
        }
        const barbero= { nombreBarbero, apellidoBarbero, foto,nombrebarberia,horario,descripcion,numeroCelular }
        const connection = await getConnection();
        await connection.query("INSERT INTO barbero SET?", barbero)

        res.json({message: "barbero added"});
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
};

export const updateClient = async (req, res)=>{
    try{
        const {id} = req.params;
        const{ClientName, ClientLastName, NumberPhone,Age}=req.body;

        if(id == undefined ||ClientName== undefined || ClientLastName == undefined || NumberPhone == undefined || Age == undefined){
            res.status(400).json({message:"Bad Request. Please fill all field"});
        }
        const cliente= {id, ClientName, ClientLastName, NumberPhone,Age }
        const connection = await getConnection();
        const result = await connection.query("UPDATE Cliente SET ? WHERE id = ?", [cliente,id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
    
};

export const deleteClient = async (req, res)=>{
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM Cliente WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
    
};

export const methods={
    getClient,
    getClients,
    addClient,
    updateClient,
    deleteClient
};