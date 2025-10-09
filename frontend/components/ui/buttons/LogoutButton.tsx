import { logoutAction } from "@/actions/logout";

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
            >
                <p className="mb-0">Logout</p>
            </button>
        </form>
    )
}