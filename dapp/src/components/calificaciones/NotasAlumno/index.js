import NotasHead from "./NotasHead";
import NotasBody from "./NotasBody";

const NotasAlumno = () => {

    return (
        <section className="AppCalificaciones">
            <h3>Calificaciones de todas las evaluaciones</h3>
            <table>
                <NotasHead />
                <NotasBody />
            </table>
        </section>
    );
};

export default NotasAlumno;