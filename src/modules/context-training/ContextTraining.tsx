import shortid from 'shortid';
import {createContext, type PropsWithChildren, useContext, useReducer, useRef, useState} from "react";

const TasksContext = createContext<Task[]>([]);
const TaskDispatchContext = createContext<TaskDispatch>(() => {});

interface TaskDispatch {
    (action: AddAction): void;
    (action: RemoveAction): void;
}

type AddAction = {
    type: 'add',
    task: Task,
}

type RemoveAction = {
    type: 'remove',
    id: string;
}

function RootProvider({ children }: PropsWithChildren) {
    const [tasks, dispatch] = useReducer<Task[], any>((state, action: AddAction | RemoveAction) => {
        switch (action.type) {
            case 'add':
                return [...state, action.task];
            case 'remove':
                return state.filter(task => action.id !== task.id)
            default:
                return [];
        }
    }, [])
    console.log('re-render provider')

    return <TasksContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
            {children}
        </TaskDispatchContext.Provider>
    </TasksContext.Provider>
}

export function ContextTraining() {
    return <RootProvider>
        <h1 className={'text-2xl'}>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
    </RootProvider>

    // return <TestC>
    //     <TestA />
    //     <TestB />
    // </TestC>
}

function TestA() {
    const [a, setA] = useState('')
    console.log('render A')

    return <input value={a} onChange={e => setA(e.target.value)}/>
}

function TestB() {
    const [b, setB] = useState('')
    console.log('render b')

    return <input value={b} onChange={e => setB(e.target.value)}/>
}

function TestC({ children }: PropsWithChildren) {
    const [b, setB] = useState('')

    console.log('render c')
    return <div>
        <input value={b} onChange={e => setB(e.target.value)} />
        {children}
        {/*<TestA />*/}
        {/*<TestB />*/}
    </div>
}

function AddTask() {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useContext(TaskDispatchContext);

    function add() {
        dispatch({
            type: 'add',
            task: {name: inputRef.current?.value || "", id: shortid.generate()}
        });
    }

    console.log('render add')

    return (
        <>
            <input
                name={'new-task'}
                placeholder="Add task"
                ref={inputRef}
            />

            <button onClick={add}>Add</button>
        </>
    )
}

type Task = {
    id: string;
    name: string;
}

function TaskList() {
    const tasks = useContext(TasksContext);
    const dispatch = useContext(TaskDispatchContext);

    console.log('render lists')

    return <>
        {tasks.map((task) => (
            <Task {...task} key={task.id} onDelete={() => {
                dispatch({
                    type: 'remove',
                    id: task.id
                })
            }}/>
        ))}
    </>
}

type TaskProps = Task & {
    onDelete: () => void;
}
function Task({ name, onDelete }: TaskProps) {
    return <li className={'space-x-4'}>
        <span>{name}</span>
        <button className={'border-2 border-solid p-4 cursor-pointer'}>edit</button>
        <button onClick={onDelete}>X</button>
    </li>
}
