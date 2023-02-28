import {drizzleReactHooks} from '@drizzle/react-plugin'

import ProfesorRow from "./ProfesorRow";

const {useDrizzle} = drizzleReactHooks;

const ProfesorBody = () => {
    const {useCacheCall} = useDrizzle();

    const profesoresLength = useCacheCall("Asignatura", "profesoresLength") || 0;

    let rows = [];
    for (let i = 0; i < profesoresLength; i++) {
        rows.push(<ProfesorRow key={"pb-"+i} profesorIndex={i}/>);
    }
    return <tbody>{rows}</tbody>;
};

export default ProfesorBody;
