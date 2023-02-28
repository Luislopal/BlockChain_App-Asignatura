import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const NotasRow = ({alumnoIndex, indexEval}) => {
    const {useCacheCall} = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);
    const evaluacionesLength = useCacheCall("Asignatura", "evaluacionesLength");

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        let cells = [];
        let ei = indexEval;

        if(ei < evaluacionesLength) {
            const nota = call("Asignatura", "calificaciones", alumnoAddr, ei);
            cells.push(
                <td key={"p2-" + alumnoIndex + "-" + ei}>
                    {nota?.tipo === "0" ? "" : ""}
                    {nota?.tipo === "1" ? "N.P." : ""}
                    {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                </td>
            );
        } else {
            cells.push("La evaluacion no existe");
        }
        return cells;
    });
    return <tr key={"d" + alumnoIndex}>
            <th>A<sub>{alumnoIndex}</sub></th>
            <td>{alumnoName}</td>
            {cells}
        </tr>;
};

export default NotasRow;