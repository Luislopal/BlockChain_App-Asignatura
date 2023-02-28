import {drizzleReactHooks} from "@drizzle/react-plugin";

import NotasRow from "./NotasRow";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const NotasBody = () => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];

    const ml = useCacheCall("Asignatura", "matriculas", address) || 0;

    let rows = [];
    rows.push(<NotasRow key={"cb-"} alumnoIndex={ml}/>);

    return <tbody>{rows}</tbody>;
};

export default NotasBody;
