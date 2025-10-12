"use client";

import { useFormStatus } from "react-dom";
import BaseButton from "./BaseButton";

export default function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <BaseButton 
            label={pending ? "Deleting..." : "Delete"}
            type="submit"
            background={false}
            disabled={pending}
        />
    )
}