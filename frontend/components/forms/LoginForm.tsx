"use client";

import { useState } from "react";
import BaseInput from "../ui/inputs/baseInput";
import AnimatedButton from "../ui/buttons/baseButton";
import { useRouter } from "next/navigation";

interface LoginFormProps {
    loginAction: (email: string, password: string) => Promise<string>;
}

export default function LoginForm({ loginAction }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await loginAction(email, password);
            router.push("/admin");
        } catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Unknown error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <BaseInput label="Email" state={email} setState={setEmail} />
            <div className="flex flex-col gap-4">
                <BaseInput
                    label="Password"
                    type="password"
                    state={password}
                    setState={setPassword}
                />
                <AnimatedButton label={loading ? "Logging in..." : "Login"} />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        </form>
    );
}