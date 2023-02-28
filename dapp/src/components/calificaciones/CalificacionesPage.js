import SoloAlumnos from "../roles/SoloAlumnos";
import SoloCoordinador from "../roles/SoloCoordinador";
import SoloProfesor from "../roles/SoloProfesor";
import CalificacionesTotal from "./CalificacionesTotal";
import NotasAlumno from "./NotasAlumno";
import NotasEvaluacion from "./NotasEvaluacion";

const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>
            <CalificacionesTotal/>

            <SoloProfesor>
                <NotasEvaluacion/>
            </SoloProfesor>

            <SoloCoordinador>
                <NotasEvaluacion/>
            </SoloCoordinador>

            <SoloAlumnos>
                <NotasAlumno/>
            </SoloAlumnos>
            
        </section>
    );
};

export default CalificacionesPage;