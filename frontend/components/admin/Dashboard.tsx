import AddResource from "./add-resource/AddResource";
import LinkButton from "../ui/buttons/LinkButton";

export default function Dashboard() {
    return (
        <section className="main-x-padding">
            <AddResource />
            <LinkButton label="Handle resources" href="/admin/resources" />
            <LinkButton label="Handle categories" href="/admin/categories" />
            <LinkButton label="Handle tags" href="/admin/tags" />
        </section>
    );
}