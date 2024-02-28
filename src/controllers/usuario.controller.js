import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT DISTINCT * FROM usuario");
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

       const [result] = await connection.query(`SELECT * FROM usuario WHERE idUsuario = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreUsuario, apellidoUsuario} = req.body;

        if (nombreUsuario === undefined || apellidoUsuario === undefined ) {
            res.status(400).json({ message: "Llene los datos correctamente." });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreUsuario),
            connection.escape(apellidoUsuario)
        ];

        const query = `INSERT INTO usuario (nombreUsuario, apellidoUsuario) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreUsuario,
            apellidoUsuario,
            message: "Usuario añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreUsuario, apellidoUsuario} = req.body;

        if (nombreUsuario == undefined || apellidoUsuario == undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreUsuario = connection.escape(nombreUsuario);
        const escapeapellidoUusario = connection.escape(apellidoUsuario);

        const query = `UPDATE usuario SET 
                        nombreUsuario = ${escapenombreUsuario}, 
                        apellidoUsuario = ${escapeapellidoUusario}
                        WHERE idUsuario = ${id}`;

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

        const query = `DELETE FROM usuario WHERE idUsuario = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Usuario eliminado." });
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