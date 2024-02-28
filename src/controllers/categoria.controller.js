import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT DISTINCT * FROM categoria");
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
        const sanitizedId = connection.escape(id);

       const [result] = await connection.query(`SELECT * FROM categoria WHERE idCategoria = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreCategoria, fotoCategoria} = req.body;

        if (nombreCategoria === undefined || fotoCategoria === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreCategoria),
            connection.escape(fotoCategoria)
        ];

        const query = `INSERT INTO categoria (nombreCategoria, fotoCategoria) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreCategoria,
            fotoCategoria,
            message: "Categoria añadida"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCategoria, fotoCategoria } = req.body;

        if (nombreCategoria, fotoCategoria) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreCategoria = connection.escape(nombreCategoria);
        const escapefotoCategoria = connection.escape(fotoCategoria);

        const query = `UPDATE categoria SET 
                        nombreCategoria = ${escapenombreCategoria}, 
                        apellidoBarbero = ${escapefotoCategoria} 
                        WHERE idCategoria = ${id}`;

        const result = await connection.query(query);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    
};



export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que id sea un número antes de utilizarlo
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            res.status(400).json({ message: "ID no válido" });
            return;
        }

        const connection = await getConnection();

        // Utilizar escape para el valor de id
        const escapedId = connection.escape(idNumber);

        const query = `DELETE FROM categoria WHERE idCategoria = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Categoria eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Categoria eliminada." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const methods={
    getClient,
    getClients,
    addClient,
    updateClient,
    deleteClient
};