import {useState} from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin';
import SoloCoordinador from "./roles/SoloCoordinador";
import SoloOwner from "./roles/SoloOwner";
import SoloAbierta from "./roles/SoloAbierta";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const HomePage = () => {
    
    const { drizzle, useCacheCall } = useDrizzle();
    let owner = useCacheCall("Asignatura", "owner");
    let coordinador = useCacheCall("Asignatura", "coordinador");
    owner = (coordinador !== "0x0000000000000000000000000000000000000000") ? owner : "No se ha asignado owner";
    coordinador = (coordinador !== "0x0000000000000000000000000000000000000000") ? coordinador : "No se ha asignado coordinador";

    const estadoAsignatura = useCacheCall("Asignatura", "cerrada") ? "Cerrada" : "Abierta";

    const {transactionStack, transactions} = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));

    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;
    let [cordDir, setCordDir] = useState("")

    return (
        <div>
            <h1>Página Home de la Asignatura</h1>
            <ul>
                <li> Dirección del usuario owner: {owner} </li>
                <li> Dirección del coordinador de la Asignatura: {coordinador}</li>
                <li> La asignatura está: {estadoAsignatura} </li>
            </ul>

                    
            <SoloAbierta>
                <SoloOwner>
                    <form>
                        <h2> Nuevo Coordinador: &nbsp;
                        <input
                            value={cordDir} placeholder="Dirección del Coordinador"
                            onChange={ev => setCordDir(ev.target.value)} /> </h2>
                        <button key="submit" className="pure-button" type="button"
                            onClick={ev => {
                                ev.preventDefault();
                                const stackId = drizzle.contracts.Asignatura.methods.setCoordinador.cacheSend(cordDir);
                                setLastStackID(stackId);
                            }}> Añadir Coordinador </button>
                        <p> Último estado = {status} </p>
                    </form>
                </SoloOwner>
                <SoloCoordinador>
                    <form>
                        <h3> Acción permitida: &nbsp;</h3>
                        <button key="submit" className="pure-button" type="button"
                            onClick={ev => {
                                ev.preventDefault();
                                const stackId = drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
                                setLastStackID(stackId);
                            }}> Cerrar Asignatura </button>
                        <p> Último estado: {status} </p>
                    </form>
                </SoloCoordinador>
            </SoloAbierta>
        </div>
        
    );
}

export default HomePage;
