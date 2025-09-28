import Header from "@/components/ui/header";
import AnimatedButton from "@/components/ui/buttons/baseButton";
import DeleteButton from "@/components/ui/buttons/deleteButton";

export default function Home() {
    return (
        <div>
			<Header />
			<div className="bg-red-300">
				<AnimatedButton label="Add Resource"/>
				<DeleteButton label="test" />
			</div>
			<div className="p-40">
			</div>
        </div>
    );
}
