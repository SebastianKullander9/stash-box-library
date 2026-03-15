"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { CopyCheck } from "lucide-react";

interface IconCopyButtonProps {
	code: string;
	fileTitle: string;
	isAdmin: boolean;
}

export default function IconCopyButton({ code, fileTitle, isAdmin }: IconCopyButtonProps) {
	const [copied, setCopied] = useState(false);
	const [shrink, setShrink] = useState(false);
	const Icon = copied ? CopyCheck : Copy;

	const handleClick = async () => {
		if (copied) return;

		await navigator.clipboard.writeText(code);

		setCopied(true);
		setShrink(true);
    	setTimeout(() => setShrink(false), 100);
	}
 
	useEffect(() => {
		if (!copied) return;

		const id = setTimeout(() => {
			setCopied(false);
		}, 700);

		return () => clearTimeout(id);
	}, [copied]);

	return (
		<button 
			aria-label={`Copy ${fileTitle} to clipboard`}
			onClick={handleClick}
			className={`
				relative flex flex-row items-center p-xs  border border-border hover:bg-surface-hover cursor-pointer
				${isAdmin ? "rounded-tr-lg rounded-br-lg" : "rounded-lg"}
			`}
		>
			{copied && (
				<div
					role="status"
					aria-live="polite"
					className="absolute right-8  text-xs text-center"
				>
					<p>Copied!</p>
				</div>
			)}
			<div className={`transition-transform duration-150 cursor-pointer ${shrink ? "scale-85" : "scale-100"}`}>
				<Icon size={22} aria-hidden="true" />
			</div>
		</button>
	);
};