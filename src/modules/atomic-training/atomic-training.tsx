import type {MouseEvent, PropsWithChildren} from "react";

export function AtomicTraining() {
    return <ButtonWithRightAddOn
        onClick={() => alert('Clicked')}
        addOn={<div>+</div>}
    >
        Hello
    </ButtonWithRightAddOn>
}


type ButtonProps = PropsWithChildren & {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    leftAddOn?: React.ReactNode;
    rightAddOn?: React.ReactNode;
};

function Button({children, leftIcon, rightIcon,rightAddOn, leftAddOn, ...props}: ButtonProps) {
    return <p className={'flex'}>
        {leftAddOn}
        <button className={'cursor-pointer border-2 border-solid p-4 flex space-x-2'} {...props}>
            {leftIcon}
            <span>{children}</span>
            {rightIcon}
        </button>
        {rightAddOn}
    </p>
}

type ButtonV2Props = PropsWithChildren & {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function ButtonV2({children, ...props}: ButtonV2Props) {
    return <button className={'cursor-pointer border-2 border-solid p-4'} {...props}>
        {children}
    </button>
}

type ButtonWithRightAddOnProps = PropsWithChildren & {
    addOn: React.ReactNode;
}

function ButtonWithRightAddOn({ addOn, children, ...restProps }: ButtonWithRightAddOnProps) {
    return <p className={'flex items-center'}>
        <ButtonV2 {...restProps}>
            {children}
        </ButtonV2>
        {addOn}
    </p>
}
