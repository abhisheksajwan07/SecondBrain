import type { ReactElement } from "react";

interface ButtonProps {
    variant:"primary" | "secondary";
    size:"small" | "medium" | "large";
    text:string;
    onClick?: () => void;
    endIcon?:ReactElement;
    startIcon?:ReactElement;
}
export const Button =(props:ButtonProps)=>{
    return <button></button>
}
