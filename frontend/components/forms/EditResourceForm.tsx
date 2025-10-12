import Input from "@/components/ui/inputs/Input";
import Select from "@/components/ui/inputs/Select";
import { getCategories } from "@/actions/category";
import { getTags } from "@/actions/tag";
import { Resource } from "@/types";
import { updateResource } from "@/actions/resource";
import BaseButton from "../ui/buttons/BaseButton";

type EditResourceFormProps = {
    resource: Resource;
}

export default async function EditResourceForm({ resource }: EditResourceFormProps) {
    const categories = await getCategories();
    const tags = await getTags();

    return (
        <form action={updateResource}>
            <input hidden name="id" value={resource.id} readOnly/>
            <Input label="Title" name="title" type="text" defaultValue={resource.title} />
            <Input label="Description" name="description" type="text" defaultValue={resource.description} />
            {resource.textContent !== "" && (
                <Input
                    label="Additional text"
                    name="additionalText"
                    type="text"
                    defaultValue={resource.textContent}
                />
            )}
            <Select label="Category" name="category" options={categories} defaultValue={resource.category.id} passIds={true} />
            <Select label="Tags" name="tags" options={tags} defaultValue={resource.tags} multiple={true} />    
            <BaseButton label="Update resource" type="submit" />
        </form>
    );
}