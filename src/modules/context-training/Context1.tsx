import shortid from 'shortid';
import {createContext, type PropsWithChildren, useContext, useReducer, useRef, useState} from "react";

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

type TaskState = {
    tasks: Task[],
    dispatch: TaskDispatch,
}

const TasksContext = createContext<TaskState>({
    tasks: [],
    dispatch: () => {}
});

export function Context1() {
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

    return <TasksContext.Provider value={{tasks, dispatch}}>
        <h1 className={'text-2xl'}>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
    </TasksContext.Provider>
}

function AddTask() {
    const inputRef = useRef<HTMLInputElement>(null);
    const {dispatch} = useContext(TasksContext);

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

function TaskList() {
    const {tasks, dispatch} = useContext(TasksContext);

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
