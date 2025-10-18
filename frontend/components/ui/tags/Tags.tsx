import { Resource } from "@/types"

type TagsProps = {
    resource: Resource;
}

export default function Tags({ resource }: TagsProps) {
    return (
        <>
            {resource.tags.map((tag) => (
                <p className="px-3 py-2 bg-[var(--color-white)] text-black inline-block rounded-full" key={tag.name}>{tag.name}</p>
            ))}
        </>
    );
}