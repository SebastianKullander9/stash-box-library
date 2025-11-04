import { Resource } from "@/types"

type TagsProps = {
    resource: Resource;
}

export default function Tags({ resource }: TagsProps) {
    return (
        <>
            {resource.tags.map((tag) => (
                <p className="body-smallest bg-primary-800 inline-block rounded-xl px-sm" key={tag.name}>{tag.name}</p>
            ))}
        </>
    );
}