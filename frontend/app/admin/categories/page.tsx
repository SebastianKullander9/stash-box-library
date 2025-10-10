import AddCategoryForm from "@/components/forms/AddCategoryForm";
import CategoriesList from "@/components/admin/categories/CategoriesList";
import LinkButton from "@/components/ui/buttons/LinkButton";


export default function CategoriesPage() {
    return (
        <section className="main-x-padding min-h-[calc(100vh-48px)]">
            <CategoriesList />
            <AddCategoryForm />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-60">
                <LinkButton label="Go back to dashboard" href="/admin" />
            </div>
        </section>
    )
}