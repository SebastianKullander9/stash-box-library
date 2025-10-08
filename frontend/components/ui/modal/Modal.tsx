"use client";

import { useState } from "react";
import BaseInput from "../inputs/baseInput";
import AnimatedButton from "../buttons/baseButton";
import { updateCategory } from "@/actions/category";

interface ModalProps {
    id: string;
    initalState: string;
}

export default function Modal({ id, initalState}: ModalProps) {
    const [state, setState] = useState<string>(initalState);

    const handleSubmit = async() => {
        const input = {id: id, name: state}
        const data = updateCategory(input);
        
        console.log(data);
    }

    return (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-10">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-[300px] min-h-[200px] border-1 bg-white">
                <form action={handleSubmit}>
                    <BaseInput label="Category" state={state} setState={setState} />
                    <AnimatedButton label="Update" />
                </form>
            </div>
        </div>
    );
}