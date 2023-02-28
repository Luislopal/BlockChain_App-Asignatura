import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoloOwner = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const ownerAddr = useCacheCall("Asignatura", "owner");
    if (ownerAddr !== drizzleState.accounts[0])
        return <></>
    return <>
        {children}
    </>
};

export default SoloOwner;