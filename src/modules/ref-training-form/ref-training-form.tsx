import {useEffect, useRef, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FormProvider, useController, useForm, useFormContext, useWatch} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

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

export function HookFormZustand() {
    const form = useForm();

    console.log('render root');
    return <FormProvider {...form}>
        <form className="grid gap-4 pt-32" noValidate>
            <FormName />
            <FormUsername />
            <Cate />
            <Button>Save</Button>
        </form>
    </FormProvider>;
}

function FormName() {
    const { register, setValue } = useFormContext();
    console.log('render 1')

    return <div className="grid gap-3">
        <Label htmlFor="name-1">Name</Label>
        <Input {...register('name')}/>
        <button type={'button'} onClick={() => {
            setValue('username', 'abcde')
        }}>Manually set input 2</button>

        <button type={'button'} onClick={() => {
            setValue('cate', '1')
        }}>Manually set input 3</button>
    </div>
}

function FormUsername() {
    const { register, control } = useFormContext();
    const [name, cate] = useWatch({
        name: ['name', 'cate'],
        control
    })
    console.log('render 2')

    return <div className="grid gap-3">
        <Label htmlFor="name-1">FullName</Label>
        <Input {...register('username')}/>
    </div>
}
const categories = [
    {
        id: '1',
        value: 'Book'
    },
    {
        id: '2',
        value: 'Book2'
    }
]

function Cate() {
    const { control } = useFormContext();
    const { field } = useController({
        name: 'cate',
        control
    });
    console.log('render 3')

    return <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                    {category.value}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
}