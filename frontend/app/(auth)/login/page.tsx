import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
    return (
        <section className="w-full h-[100dvh] flex flex-row p-md">
			<div className="w-1/2 hidden md:block">

			</div>
			<div className="w-full md:w-1/2 flex items-center justify-center">
				<LoginForm />
			</div>
        </section>
    );
}