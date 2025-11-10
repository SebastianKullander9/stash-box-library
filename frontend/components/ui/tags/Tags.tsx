import { Resource } from "@/types";
import { X } from "lucide-react";

type TagsProps = {
    resource?: Resource;
    tags?: string[];
    removeTag?: (tagToRemove: string) => void;
}

export default function Tags({ resource, tags, removeTag=() => null }: TagsProps) {
    return (
        <>
            {resource && resource.tags.map((tag) => (
                <p className="body-smallest bg-primary-800 inline-block rounded-xl px-sm" key={tag.name}>{tag.name}</p>
            ))}

            {tags && tags.map((tag) => (
                <div
                    className="body body-small px-sm py-2xs rounded-full bg-primary-800 flex flex-row items-center gap-sm" key={tag}
                >
                    <p>{tag}</p>
                    <div 
                        className="text-background hover:bg-primary-700 cursor-pointer rounded-full"
                        onClick={() => removeTag(tag)}
                    >
                        <X size={18} />
                    </div>
                </div>
            ))}
        </>
    );
}