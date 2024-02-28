import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT DISTINCT * FROM servicios");
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

       const [result] = await connection.query(`SELECT * FROM servicios WHERE idServicio = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreServicio, precioServicio, categoriaServicio} = req.body;

        if (nombreServicio === undefined || precioServicio === undefined || categoriaServicio === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreServicio),
            connection.escape(precioServicio),
            connection.escape(categoriaServicio)
        ];

        const query = `INSERT INTO servicios (nombreServicio, precioServicio, categoriaServicio) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreServicio,
            precioServicio,
            categoriaServicio,
            message: "Servicios añadidos"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreServicio, precioServicio, categoriaServicio} = req.body;

        if (nombreServicio == undefined || precioServicio == undefined || categoriaServicio == undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreServicio = connection.escape(nombreServicio);
        const escapeprecioServicio = connection.escape(precioServicio);
        const escapecategoriaServicio = connection.escape(categoriaServicio);
       

        const query = `UPDATE servicios SET 
                        nombreServicio = ${escapenombreServicio}, 
                        categoriaServicio = ${escapeprecioServicio}, 
                        categoriaServicio = ${escapecategoriaServicio}
                        WHERE idServicio = ${id}`;

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
            res.json({ message: "categoria eliminado exitosamente" });
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