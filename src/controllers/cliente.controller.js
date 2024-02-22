import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT DISTINCT * FROM barbero");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sanitizedId = c(id);

       const [result] = await connection.query(`SELECT * FROM barbero WHERE idBarbero = ${sanitizedId}`);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Barbero no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreBarbero, apellidoBarbero, foto, nombrebarberia, horario, descripcion, numeroCelular } = req.body;

        if (nombreBarbero === undefined || apellidoBarbero === undefined || foto === undefined || nombrebarberia === undefined || horario === undefined || descripcion === undefined || numeroCelular === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreBarbero),
            connection.escape(apellidoBarbero),
            connection.escape(foto),
            connection.escape(nombrebarberia),
            connection.escape(horario),
            connection.escape(descripcion),
            connection.escape(numeroCelular)
        ];

        const query = `INSERT INTO barbero (nombreBarbero, apellidoBarbero, foto, nombrebarberia, horario, descripcion, numeroCelular) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreBarbero,
            apellidoBarbero,
            foto,
            nombrebarberia,
            horario,
            descripcion,
            numeroCelular,
            message: "barbero added"
        });
    } catch (error) {
        res.status(500).send(error.message);
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