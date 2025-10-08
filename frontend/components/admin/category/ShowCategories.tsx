import { Category } from "@/actions/category";
import AnimatedButton from "@/components/ui/buttons/baseButton";
import DeleteButton from "@/components/ui/buttons/deleteButton";
import Modal from "@/components/ui/modal";

export default function ShowCategories( { categories }: { categories: Category[] } ) {
    return (
        <div className="h-full p-8 border-1">
            <h1 className="text-xl font-semibold uppercase pb-4">Existing categories</h1>
                {categories.map((category) => (
                    <div key={category.name} className="flex flex-row justify-between items-baseline gap-16 mt-4">
                        <p>{category.name}</p>
                        <div className="flex">
                            <div className="max-h-6">
                                <AnimatedButton label="Edit" />
                            </div>
                            <div>
                                <DeleteButton label="Delete category" />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}