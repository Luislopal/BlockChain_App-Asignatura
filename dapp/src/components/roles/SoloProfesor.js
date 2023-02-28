import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoloProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const addr = drizzleState.accounts[0];
    const nombre = useCacheCall("Asignatura", "datosProfesor", addr);

    if (!nombre) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoloProfesor;