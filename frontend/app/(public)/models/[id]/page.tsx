import { getOneResource } from "@/actions/resource";
import Model from "@/components/fileRenderer/full/renderers/Model";
import GoBackButton from "@/components/ui/buttons/GoBackButton";

export default async function ViewModel({ params }: { params: { id: string } }) {
    const { id } = await params;
    const resource = await getOneResource(id);

    return (
        <div className="main-x-padding">
            <div className="inline-block">
                <GoBackButton label="Go back" href="/models" />
            </div>
            <Model resource={resource} />
        </div>
    )
}