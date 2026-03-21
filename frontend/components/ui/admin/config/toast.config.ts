import {
	CircleCheckBig,
	CircleX
} from "lucide-react";

export const toastContents = {
	error: {
		color: "var(--color-error)",
		icon: CircleX,
		text: "Something went wrong",
		timer: 5000,
	},
	success: {
		color: "var(--color-success)",
		icon: CircleCheckBig,
		text: "File uploaded successfully",
		timer: 1500,
	},
	deleted: {
		color: "var(--color-success)",
		icon: CircleCheckBig,
		text: "File was deleted successfully",
		timer: 1500,
	}
}