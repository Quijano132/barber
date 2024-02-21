
import { sequelize } from "./database/database.js";
import app from "./app.js"
import { port } from "./envairomentVariable.js";


const main= async ()=>{
    try{
        sequelize.sync({force : true});
        app.listen(port, () =>{
            console.log(
                `server listen on port: ${port},`,
                "url: http://localhost:4001/barberia"
            );
        });
    } catch (err){
        console.log(err);
    }
 

};

main();