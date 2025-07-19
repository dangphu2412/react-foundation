import {useEffect, useRef, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export function RefTrainingForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const input2Ref = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState('');

    useEffect(() => {
       console.log("refTrainingForm", value);

       return () => {
           console.log('Unmount', value)
       }
    }, [value]);

    return (<form className="grid gap-4 pt-32" noValidate>
        <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" name="name" ref={inputRef} />
        </div>
        <div className="grid gap-3">
            <Label htmlFor="username-1">Username</Label>
            <Input id="username-1" name="username" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        <Button onClick={(e) => {
            e.preventDefault();
            console.log(inputRef.current?.value)
        }}>Save</Button>
    </form>);
}
