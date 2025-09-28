"use client";

import { useState } from "react";
import BaseInput from "@/components/ui/inputs/baseInput";
import AnimatedButton from "@/components/ui/buttons/baseButton";

interface CreateCategoryProps {
    createCategoryAction: (input: { name: string }) => Promise<{ name: string}>;
}

export default function CreateCategory({ createCategoryAction }: CreateCategoryProps) {
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createCategoryAction({ name: category });
        } catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Unknown error");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="px-8">
            <h1>Add category</h1>
            <BaseInput label="Category name" type="text" state={category} setState={setCategory} />
            <AnimatedButton label={loading ? "Adding category..." : "Add category"} />
            { error && <p className="text-sm text-red-500">{error}</p> }
        </form>
    );
}