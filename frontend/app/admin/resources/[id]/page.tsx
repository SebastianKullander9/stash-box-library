import { getOneResource } from "@/actions/resource";
import LinkButton from "@/components/ui/buttons/LinkButton";
import FileRenderer from "@/components/fileRenderer/FileRendererAdmin";
import EditResourceForm from "@/components/forms/EditResourceForm";


export default async function EditResource({ params }: { params: { id: string } }) {
    const { id } = await params;
    const resource = await getOneResource(id);

    return (
        <div className="main-x-padding min-h-[calc(100vh-48px)] text-white text-normal p-normal">
            <div className="mb-4">
                <FileRenderer  files={resource.files} />
            </div>
            <EditResourceForm resource={resource} />
            <div className=" min-w-60"> 
                <LinkButton label="Go back to resources" href="/admin/resources" />
            </div>
        </div>
    );
}