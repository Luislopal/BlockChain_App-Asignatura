import {drizzleReactHooks} from '@drizzle/react-plugin'
import {newContextComponents} from "@drizzle/react-components";

import SoloCoordinador from '../roles/SoloCoordinador';
import SoloAbierta from "../roles/SoloAbierta";
import EvaluacionesList from "./EvaluacionesList";

const {useDrizzle} = drizzleReactHooks;
const {ContractForm} = newContextComponents;

const EvaluacionesPage = () => {
    const { drizzle, drizzleState } = useDrizzle();

    return(
        <section className="AppEvaluaciones">
            <h2>Evaluaciones</h2>
            <EvaluacionesList/>
            <SoloAbierta>              
                <SoloCoordinador>
                    <article className="AppMisDatos">
                        <h3>Añade una evaluación</h3>
                        <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Asignatura" method="creaEvaluacion" 
                        labels={["Nombre", "Fecha", "Puntos(0-100)", "Mínima"]}/>
                        <h3>Edita una evaluación existente</h3>
                        <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Asignatura" method="editaEvaluacion" 
                        labels={["Indice Evaluacion a reemplazar", "Nombre nuevo", "Fecha", "Puntos(0-100)", "Mínima"]}/>
                    </article>
                </SoloCoordinador>
            </SoloAbierta>
        </section>
    )  
};

export default EvaluacionesPage;
