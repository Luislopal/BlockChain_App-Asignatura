import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesTotal = () => {

    return (
        <section className="AppCalificaciones">
            <h3>Todas las Calificaciones</h3>
            <table>
                <CalificacionesHead />
                <CalificacionesBody />
            </table>
        </section>
    );
};

export default CalificacionesTotal;
