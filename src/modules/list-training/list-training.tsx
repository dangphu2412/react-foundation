import {useRef, useState} from "react";

export function ListTraining() {
    const [count, setCount] = useState(0)

    return <div onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
            setCount(count + 1);
    }
    }>
        Hello world {count}
    </div>
}
function demo1() {
    const [count, setCount] = useState(0)

    return <div onClick={() => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }
    }>
        Hello world {count}
    </div>
}

function demo2() {
    const [items, setItems] = useState([]);
    const ref = useRef(null);

    return <div>
        <ul>
            {items.map((item, index) => {
                return <li key={index}>
                    {item.text}
                </li>
            })}
        </ul>

        <input ref={ref}/>
        <button onClick={() => {
            setItems(pre => [...pre, {
                text: ref.current.value,
                id: Math.random().toString(36).substr(2, 2),
            }])
        }} >
            Add
        </button>
    </div>
}