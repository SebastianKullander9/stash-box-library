import LoginForm from "@/components/forms/LoginForm";
import { loginAction } from "@/actions/login";

export default function Login() {
    return (
        <section className="w-screen h-screen flex items-center justify-center">
            <div className="p-12 border-1 shadow-xl">
                <LoginForm loginAction={loginAction} />
            </div>
        </section>
    )
}