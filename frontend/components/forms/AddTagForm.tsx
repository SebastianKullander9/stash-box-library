import Input from "@/components/ui/inputs/Input";
import BaseButton from "@/components/ui/buttons/BaseButton";
import { createTagAction } from "@/actions/tag";

export default function AddTagForm() {
    return (
        <form action={createTagAction} className="border-t-1 border-[var(--color-white)] mt-6">
            <fieldset>
                <legend className="text-white text-normal text-sm py-4">Add a tag</legend>
                <Input label="Tag" name="tagName" type="text" />
                <BaseButton label="Add" type="submit" />
            </fieldset>
        </form>
    )
}