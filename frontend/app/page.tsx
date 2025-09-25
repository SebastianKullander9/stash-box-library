import Header from "@/ui/header";
import AnimatedButton from "@/ui/buttons/baseButton";
import DeleteButton from "@/ui/buttons/deleteButton";

export default function Home() {
    return (
        <div>
			<Header />
			<div className="p-80">
				<AnimatedButton />
				<DeleteButton />
			</div>
        </div>
    );
}
