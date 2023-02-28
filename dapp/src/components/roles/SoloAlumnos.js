import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoloAlumnos = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const addr = drizzleState.accounts[0];

    const alumnoAddr = useCacheCall("Asignatura", "datosAlumno", addr);

    if (!alumnoAddr?.nombre) {
        return <></>
    }
    return <>
        {children}
    </>
};

export default SoloAlumnos;