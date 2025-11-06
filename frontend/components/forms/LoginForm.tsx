"use client";

import { useActionState } from "react";
import BaseButton from "../ui/buttons/BaseButton";
import Input from "../ui/inputs/Input";
import PasswordInput from "../ui/inputs/PasswordInput";
import { loginAction } from "@/actions/login";

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(loginAction, null);

    return (
        <form action={formAction} className="min-w-[450px] flex flex-col gap-xl bg-surface p-2xl rounded-xl border-1 border-border">
            <h1 className="heading-4 text-center whitespace-nowrap">Login to dashboard</h1>
            <Input label="Email" name="email" type="email" />
            <PasswordInput />
            {state?.error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-2 py-2 rounded text-normal">
                    <p className="mb-0">{state.error}</p>
                </div>
            )}
            <div className="pt-4">
                <BaseButton label={pending ? "Logging in..." : "Login"} type="submit" />
            </div>
            <p className="text-white text-normal text-[11px] text-center">Not admin? Want to check out the dashboard? <span className="underline">Click here.</span></p>
        </form>
    )
}