import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const SoloAbierta = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const cerrada = useCacheCall("Asignatura", "cerrada");
    if (cerrada)
        return <></>
    return <>
        {children}
    </>
};
export default SoloAbierta;