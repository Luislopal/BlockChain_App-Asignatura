import {drizzleReactHooks} from '@drizzle/react-plugin'
import {newContextComponents} from "@drizzle/react-components";

import ProfesorHead from "./ProfesorHead";
import ProfesorBody from "./ProfesorBody";
import SoloOwner from '../../roles/SoloOwner';

const {useDrizzle} = drizzleReactHooks;
const {ContractForm} = newContextComponents;

const ProfesoresList = () => {
    const { drizzle, drizzleState } = useDrizzle();
    return(
        <section className="AppProfesores">
            <h3>Todos los Profesores</h3>
            <table>
                <ProfesorHead/>
                <ProfesorBody/>
            </table>

            <SoloOwner>
                <h3>Añadir profesor (Introducir address del contrato del nuevo profesor)</h3>
                <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Asignatura" method="addProfesor" labels={["Address", "Nombre"]}/>   
            </SoloOwner>
        </section>
    )
};
export default ProfesoresList;