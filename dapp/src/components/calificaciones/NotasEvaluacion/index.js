import NotasHead from "./NotasHead";

const NotasEvaluacion = () => {

    return (
        <section className="AppCalificaciones">
            <h3>Calificaciones por evaluación</h3>
            <table>
                <NotasHead />
            </table>
        </section>
    );
};

export default NotasEvaluacion;