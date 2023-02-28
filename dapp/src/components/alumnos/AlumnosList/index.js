import {drizzleReactHooks} from '@drizzle/react-plugin'
import {newContextComponents} from "@drizzle/react-components";

import AlumnosHead from "./AlumnosHead";
import AlumnosBody from "./AlumnosBody";
import SoloAbierta from '../../roles/SoloAbierta';
import SoloNoMatriculados from '../../roles/SoloNoMatriculados';
import SoloOwner from '../../roles/SoloOwner';
import SoloProfesor from '../../roles/SoloProfesor';
import SoloCoordinador from '../../roles/SoloCoordinador';

const {useDrizzle} = drizzleReactHooks;
const {ContractForm} = newContextComponents;

const AlumnosList = () => {
    const { drizzle, drizzleState } = useDrizzle();
    return(
        <section className="AppAlumnos">
            <SoloOwner>
                <h3>Todos los Alumnos</h3>
                <table>
                    <AlumnosHead/>
                    <AlumnosBody/>
                </table>
            </SoloOwner>

            <SoloCoordinador>
                <h3>Todos los Alumnos</h3>
                <table>
                    <AlumnosHead/>
                    <AlumnosBody/>
                </table>
            </SoloCoordinador>

            <SoloProfesor>
                <h3>Todos los Alumnos</h3>
                <table>
                    <AlumnosHead/>
                    <AlumnosBody/>
                </table>
            </SoloProfesor>

            <SoloAbierta>
                <SoloNoMatriculados>
                    <h3>Automatricularse</h3>
                    <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Asignatura" method="automatricula" labels={["Nombre", "DNI", "Email"]}/>
                </SoloNoMatriculados>
            </SoloAbierta>
            <SoloOwner>
                <h3>Matricular alumno (Introducir address del contrato del nuevo alumno)</h3>
                <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Asignatura" method="matricular" labels={["Address", "Nombre", "DNI", "Email"]}/>   
            </SoloOwner>
        </section> 
    )
};
export default AlumnosList;