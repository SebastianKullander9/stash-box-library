import Header from "@/components/ui/header";
import AnimatedButton from "@/components/ui/buttons/baseButton";
import DeleteButton from "@/components/ui/buttons/deleteButton";

export default function Home() {
    return (
        <div>
			<Header />
			<div className="">
				<AnimatedButton label="Add Resource"/>
				<DeleteButton />
			</div>
			<div className="p-40">
			</div>
        </div>
    );
}
