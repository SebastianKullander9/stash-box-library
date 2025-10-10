import { deleteTag, getTags } from "@/actions/tag";
import { Tag } from "@/actions/tag";
import BaseButton from "@/components/ui/buttons/BaseButton";
import Input from "@/components/ui/inputs/Input";
import { updateTag } from "@/actions/tag";

export default async function TagList() {
    const tags: Tag[] = await getTags();
    console.log(tags);

    return (
        <div className="text-white text-normal text-sm mb-4">
            <ul>
                {tags.length === 0 && <li className="text-white text-normal">No tags added yet...</li>}
                {tags.map((tag) => (
                    <li key={tag.id} className="flex flex-row justify-between items-center">
                        <form action={updateTag} className="flex flex-row main-gap">
                            <input type="hidden" name="id" value={tag.id} />
                            <div className="max-w-40">
                                <Input name="tag" type="text" defaultValue={tag.name} />
                            </div>
                            <div>
                                <BaseButton label="Update" background={true} type="submit" />
                            </div>
                        </form>
                        <form action={deleteTag}>
                            <input type="hidden" name="id" value={tag.id} />
                            <BaseButton label="Delete" background={false} type="submit" />
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}