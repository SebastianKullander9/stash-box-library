"use client";

import "./toast.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toastContents } from "../config/toast.config";
import { X } from "lucide-react";

interface ToastNotificationProps {
	status?: "success" | "error";
}

export default function ToastNotification({ status }: ToastNotificationProps) {
	const toast = status ? toastContents[status] : null;
	const Icon = toast.icon;
	const router = useRouter();
	const [animate, setAnimate] = useState(false);

	const handleClickToast = () => {
		setAnimate(false);
		router.replace("/admin");
	}

	useEffect(() => {
		setAnimate(true);

		const id = setTimeout(() => {
			setAnimate(false);
			router.replace("/admin");
		}, toast.timer);

		return () => clearTimeout(id);
	}, [toast.timer, router]); 

	return (
		<div 
			className="max-w-45 bg-surface rounded-t-md absolute top-0 left-1/2 -translate-x-1/2 z-[9999] transition-transform duration-350 ease-out"
			style={{ transform: `translateY(${animate ? "40%" : "-140%"})` }}
		>
			<div className="text-center p-lg flex flex-row items-center gap-xs relative">
				<div 
					className="absolute top-0 right-0 text-text-tertiary cursor-pointer hover:bg-surface-hover p-1 rounded-full"
					onClick={handleClickToast}
				>
					<X />
				</div>
				<div style={{ color: toast.color }}>
					<Icon />
				</div>
				<div >
					{toast.text}
				</div>
			</div>
			<div 
				className="h-[6px] w-full rounded-b-md overflow-hidden"
				style={{ backgroundColor: `color-mix(in srgb, ${toast.color} 50%, transparent)` }}
			>
				<div 
					className="h-full bg-success" 
					style={{ 
						animation: animate ? `shrink ${toast.timer}ms linear forwards` : undefined,
						backgroundColor: toast.color
					}}
				/>
			</div>
		</div>
	);
};