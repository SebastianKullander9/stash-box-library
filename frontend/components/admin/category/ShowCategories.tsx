import { Category } from "@/actions/category";
import AnimatedButton from "@/components/ui/buttons/baseButton";
import DeleteButton from "@/components/ui/buttons/deleteButton";

export default function ShowCategories( { categories }: { categories: Category[] } ) {
    return (
        <div className="px-8 h-full">
            <h1>Existing categories</h1>
                {categories.map((category) => (
                    <div key={category.name} className="h-full flex flex-row justify-between items-center gap-4">
                        <p>{category.name}</p>
                        <div className="max-h-6">
                            <AnimatedButton label="Edit category" />
                        </div>
                        <DeleteButton label="Delete category" />
                    </div>
                ))}
        </div>
    );
}