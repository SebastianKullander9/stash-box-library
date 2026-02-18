import { useState } from "react";

interface CodeBlockInputProps {
	index: number;
}

export default function CodeBlockInput({ index }: CodeBlockInputProps) {
    const [code, setCode] = useState("");

    return (
        <div>
            <textarea
                value={code}
				name={`codeblock[${index}]`}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code"
                rows={6}
                className="border p-2 w-full font-mono rounded-lg"
            />
        </div>
    );
}