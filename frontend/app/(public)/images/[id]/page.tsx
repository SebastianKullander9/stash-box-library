import { getOneResource } from "@/actions/resource";
import Img from "@/components/fileRenderer/full/renderers/Img";
import GoBackButton from "@/components/ui/buttons/GoBackButton";

export default async function ViewImage({ params }: { params: { id: string } }) {
    const { id } = params;
    const resource = await getOneResource(id);

    return (
        <div>
            <div className="inline-block">
                <GoBackButton label="Go back" href="/images" />
            </div>
            <Img resource={resource} />
        </div>
    )
}