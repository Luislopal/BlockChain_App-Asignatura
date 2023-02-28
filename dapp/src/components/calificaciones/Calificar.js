import {useState} from "react";
import {useParams} from "react-router-dom";
import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoloProfesor from "../roles/SoloProfesor";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
// Versión usando cachesend
const Calificar = () => {
    const {drizzle} = useDrizzle();
    const {addr, evindex} = useParams();

    // Obtener el status de la ultima transaccion enviada:
    const {transactionStack, transactions} = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;

    // Conservar los valores metidos en el formulario
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState("");

    return (<article className="AppMisDatos">
        <SoloProfesor>
            <h3>Calificar</h3>
            <form>
                <p>
                    Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
                           onChange={ev => setTipo(ev.target.value)}/>
                </p>
                <p>
                    Nota (x100):  &nbsp;
                    <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
                           onChange={ev => setCalificacion(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.califica.cacheSend(addr, evindex, tipo, calificacion);
                            setLastStackID(stackId);
                        }}>
                    Calificar
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoloProfesor>               
    </article>);
};

export default Calificar;
