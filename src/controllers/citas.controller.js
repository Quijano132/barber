import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT DISTINCT * FROM citas");
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

       const [result] = await connection.query(`SELECT * FROM citas WHERE idCitas = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Cita no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { fecha, hora, idbarbero, idusuario, idcategoria} = req.body;

        if (fecha === undefined || hora === undefined || idbarbero === undefined || idusuario === undefined || idcategoria === undefined ) {
            res.status(400).json({ message: "Llene los datos correctamente." });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(fecha),
            connection.escape(hora),
            connection.escape(idbarbero),
            connection.escape(idusuario),
            connection.escape(idcategoria)
        ];

        const query = `INSERT INTO citas (fecha, hora, idbarbero, idusuario, idcategoria) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            fecha, 
            hora, 
            idbarbero, 
            idusuario, 
            idcategoria,
            message: "cita añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, hora, idbarbero, idusuario, idcategoria} = req.body;

        if (fecha == undefined || hora == undefined || idbarbero == undefined || idusuario == undefined || idcategoria == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapedfecha = connection.escape(fecha);
        const escapedhora = connection.escape(hora);
        const escapedidbarbero = connection.escape(idbarbero);
        const escapedidusuario = connection.escape(idusuario);
        const escapedidcategoria = connection.escape(idcategoria);

        const query = `UPDATE citas SET 
                        fecha = ${escapedfecha}, 
                        hora = ${escapedhora}, 
                        idbarbero = ${escapedidbarbero}, 
                        idusuario = ${escapedidusuario}, 
                        idcategoria = ${escapedidcategoria} 
                        WHERE idCitas = ${id}`;

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

        const query = `DELETE FROM citas WHERE idCitas = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Cita eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Cita no encontrado o ya eliminado" });
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