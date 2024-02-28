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
        const sanitizedId = connection.escape(id);

       const [result] = await connection.query(`SELECT * FROM barbero WHERE idBarbero = ${sanitizedId}`,[id]);
        

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
            message: "barbero añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreBarbero, apellidoBarbero, foto, nombrebarberia, horario, descripcion, numeroCelular } = req.body;

        if (id == undefined || nombreBarbero == undefined || apellidoBarbero == undefined || foto == undefined || nombrebarberia == undefined || horario == undefined || descripcion == undefined || numeroCelular == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapedNombreBarbero = connection.escape(nombreBarbero);
        const escapedApellidoBarbero = connection.escape(apellidoBarbero);
        const escapedFoto = connection.escape(foto);
        const escapedNombreBarberia = connection.escape(nombrebarberia);
        const escapedHorario = connection.escape(horario);
        const escapedDescripcion = connection.escape(descripcion);
        const escapedNumeroCelular = connection.escape(numeroCelular);

        const query = `UPDATE barbero SET 
                        nombreBarbero = ${escapedNombreBarbero}, 
                        apellidoBarbero = ${escapedApellidoBarbero}, 
                        foto = ${escapedFoto}, 
                        nombrebarberia = ${escapedNombreBarberia}, 
                        horario = ${escapedHorario}, 
                        descripcion = ${escapedDescripcion}, 
                        numeroCelular = ${escapedNumeroCelular} 
                        WHERE idBarbero = ${id}`;

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

        const query = `DELETE FROM barbero WHERE idBarbero = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Barbero eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Barbero no encontrado o ya eliminado" });
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