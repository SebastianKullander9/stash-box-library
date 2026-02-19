"use client";

import { logoutAction } from "@/actions/logout";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
	const handleLogout = async () => {
		await logoutAction();
	}

    return (
		<button 
			onClick={handleLogout}
			className="px-md py-xs rounded-lg flex flex-row items-center gap-xs cursor-pointer"
		>
			<LogOut size={16} color="white" />
			Logout
		</button>
    )
}