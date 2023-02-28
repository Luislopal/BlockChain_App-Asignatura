module.exports = async callback => {
    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();
        //Identificar al profesor:
        let owner = await asignatura.owner();
        console.log("Cuenta del owner =", owner);

        await asignatura.setCoordinador(accounts[1]);
        let coordinador = await asignatura.coordinador();
        console.log("Cuenta del coordinador =", coordinador);

        await asignatura.addProfesor(accounts[2], "Luis", {from: owner});
        let profesor = await asignatura.profesores(0);
        let datosProfesor = await asignatura.datosProfesor(profesor);
        console.log("Cuenta del profesor =", profesor);
        console.log("Cuenta del profesor =", datosProfesor);
        
        console.log("Crear cuatro evaluaciones:");
        await asignatura.creaEvaluacion("Parcial 1", Date.now() + 60 * 24 * 3600000, 25, 5, {from: coordinador});
        await asignatura.creaEvaluacion("Parcial 2", Date.now() + 120 * 24 * 3600000, 30, 5, {from: coordinador});
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 50 * 24 * 3600000, 20, 4, {from: coordinador});
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 110 * 24 * 3600000, 25, 5, {from: coordinador});

        // Modificamos esta parte para que matricule el owner a los alumnos en vez de ellos mismos, pq nos daba error
        console.log("Matricular a dos alumnos:");
        let evaAccount = accounts[3];
        let pepeAccount = accounts[4];
        console.log("Cuenta de Eva =", evaAccount);
        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.matricular(evaAccount, "Eva Martinez", "04921928E", "em@dominio.es", {from: owner});
        await asignatura.matricular(pepeAccount, "Jose Redondo", "03847321W", "jr@stio.com", {from: owner});
    
        console.log("Añadir calificaciones:");
        await asignatura.califica(evaAccount,  0, 1, 0, {from: profesor});
        await asignatura.califica(evaAccount,  1, 2, 400, {from: profesor});
        await asignatura.califica(evaAccount,  2, 2, 750, {from: profesor});
        await asignatura.califica(evaAccount,  3, 2, 900, {from: profesor});
        await asignatura.califica(pepeAccount, 0, 0, 0, {from: profesor});
        await asignatura.califica(pepeAccount, 1, 1, 0, {from: profesor});
        await asignatura.califica(pepeAccount, 2, 2, 350, {from: profesor});
        await asignatura.califica(pepeAccount, 3, 2, 650, {from: profesor});
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};