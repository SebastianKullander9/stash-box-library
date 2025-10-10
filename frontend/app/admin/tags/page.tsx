import TagList from "@/components/admin/tags/TagList";
import AddTagForm from "@/components/forms/AddTagForm";
import LinkButton from "@/components/ui/buttons/LinkButton";

export default function Tags() {
    return (
        <section className="main-x-padding min-h-[calc(100vh-48px)]">
            <TagList />
            <AddTagForm />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-60">
                <LinkButton label="Go back to dashboard" href="/admin" />
            </div>
        </section>
    )
}