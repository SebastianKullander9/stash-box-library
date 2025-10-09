import BaseButton from "../ui/buttons/BaseButton";
import Input from "../ui/inputs/Input";

export default function LoginForm() {
    return (
        <form className="max-w-[450px] main-x-padding">
            <h1 className="text-white text-normal text-center">Login to dashboard</h1>
            <Input label="Username" name="username" type="text" />
            <Input label="Password" name="password" type="password" />
            <div className="pt-4">
                <BaseButton label="Login" type="submit" />
            </div>
            <p className="text-white text-normal text-[11px] text-center">Not admin? Want to check out the dashboard? <span className="underline">Click here.</span></p>
        </form>
    )
}