import {useState} from "react";

/**
 * 1. Every state update got re-render, how do we avoid this?
 * - Using ref
 * - ...
 * 2. In case of complex form, how should we organize state of data, each independent state seem too complex and hard to maintain
 */
export function Context2() {
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')

    return <div className={'flex flex-col'}>
        <label>Input 1</label>
        <input className={'border w-32'} value={a} onChange={e => setA(e.target.value)} />

        <label>Input 2</label>
        <input className={'border w-32'}  value={b} onChange={e => setB(e.target.value)} />

        <label>Input 3</label>
        <input className={'border w-32'}  value={c} onChange={e => setC(e.target.value)} />
    </div>
}
