import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Link} from "react-router-dom";

const {useDrizzle} = drizzleReactHooks;

const ProfesorRow = ({profesorIndex}) => {
    const {useCacheCall} = useDrizzle();

    let {addr, datos} = useCacheCall(['Asignatura'],
        call => {
            const addr = call("Asignatura", "profesores", profesorIndex);
            const datos = addr && call("Asignatura", "datosProfesor", addr);
            return {addr, datos};
        }
    );

    return <tr key={"PROF-" + profesorIndex}>
        <th>A<sub>{profesorIndex}</sub></th>
        <td>{datos}</td>
        <td><Link to={`/profesores/${addr}`}>Info</Link></td>
    </tr>;
};

export default ProfesorRow;
