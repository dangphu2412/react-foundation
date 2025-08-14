import {createContext, type PropsWithChildren, useState} from "react";

export function TestA() {
    const [a, setA] = useState('')
    console.log('render A')

    return <>
        <label>Input 1</label>
        <input className={'border w-32'} value={a} onChange={e => setA(e.target.value)} />
    </>
}

export function TestB() {
    const [b, setB] = useState('')
    console.log('render b')

    return  <>
        <label>Input 2</label>
        <input className={'border w-32'}  value={b} onChange={e => setB(e.target.value)} />
    </>
}

export function TestC() {
    const [c, setC] = useState('')
    console.log('render c')

    return  <>
        <label>Input 3</label>
        <input className={'border w-32'}  value={c} onChange={e => setC(e.target.value)} />
    </>
}

type Task = {
    id: string;
    name: string;
}
interface TaskDispatch {
    (action: AddAction | RemoveAction): void;
}

type AddAction = {
    type: 'add',
    task: Task,
}

type RemoveAction = {
    type: 'remove',
    id: string;
}

const TasksContext = createContext<Task[]>([]);
const TaskDispatchContext = createContext<TaskDispatch>(() => {});
