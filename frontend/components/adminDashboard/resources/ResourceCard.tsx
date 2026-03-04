import DeleteButton from "@/components/ui/buttons/DeleteButton"
import { deleteResource } from "@/actions/resource"
import LinkButton from "@/components/ui/buttons/LinkButton";

type ResourceCardProps = {
    key: number;
    title: string;
    description: string;
    category: string;
    id: string;
}

export default function ResourceCard({
    key,
    title,
    description,
    category,
    id,
}: ResourceCardProps) {
    return (
        <li key={key} className="text-white flex flex-row justify-between border-1 border-white main-x-padding main-y-padding">
            <div>
                <p className="">Title: {title}</p>
                <p className="">Description: {description}</p>
                <p className="">Category: {category}</p>
            </div>
            <div className="flex flex-col justify-between">   
                <LinkButton label="Edit" href={`/admin/resources/${id}`} />
                <form action={deleteResource}>
                    <input type="hidden" name="id" value={id} />
                    <DeleteButton />
                </form>
            </div>
        </li>
    )
}