import {drizzleReactHooks} from '@drizzle/react-plugin'

import {useState} from "react";

import NotasRow from './NotasRow';

const {useDrizzle} = drizzleReactHooks;

const NotasHead = () => {

    const {useCacheCall} = useDrizzle();

    let [indexEval, setEvalIndex] = useState("");

    let thead = [];
    thead.push(<th key={"chae"}>An</th>);
    thead.push(<th key={"chn"}>Nombre</th>);
    thead.push(<th key={"chno"}>Evaluación: <form><input key="evaluacion" type="number" name="evaluacion" 
        value={indexEval} placeholder="Indice de la evaluacion" onChange={ev => setEvalIndex(ev.target.value)}/></form></th>)

    const ml = useCacheCall("Asignatura", "matriculasLength") || 0;

    let rows = [];
    for (let i = 0; i < ml; i++) {
        rows.push(<NotasRow key={"cb-"+i} alumnoIndex={i} indexEval={indexEval}/>);
    }

    return (<div>
            <thead><tr>{thead}</tr></thead>
            <tbody>{rows}</tbody>
        </div>);
};

export default NotasHead;
