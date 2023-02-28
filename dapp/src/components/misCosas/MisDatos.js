import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const MisDatos = () => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[address];

    const datos = useCacheCall("Asignatura", "quienSoy", {from: address});

    const ownerAddr = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");
    const profesorName = useCacheCall("Asignatura", "datosProfesor", address);
    const alumnoName = useCacheCall("Asignatura", "datosAlumno", address);

    return (
        <article className="AppMisDatos">
            <h3>Mis Datos</h3>
            <ul>
                <li>Nombre: <span style={{color: "blue"}}>{datos?._nombre || "No matriculado"}</span></li>
                <li>Email: <span style={{color: "blue"}}>{datos?._email || "No matriculado"}</span></li>
                <li>Dirección: <span style={{color: "blue"}}>{address}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance}</span> weis</li>
                <li>Soy Owner: <span style={{color: "blue"}}>{ownerAddr === address ? "Sí" : "No"}</span></li>
                <li>Soy Coordinador: <span style={{color: "blue"}}>{coordinador === address ? "Sí" : "No"}</span></li>
                <li>Soy Profesor: <span style={{color: "blue"}}>{profesorName != 0 ? "Sí" : "No"}</span></li>
                <li>Soy Alumno: <span style={{color: "blue"}}>{alumnoName?.nombre != 0 ? "Sí" : "No"}</span></li>
            </ul>
        </article>);
};

export default MisDatos;