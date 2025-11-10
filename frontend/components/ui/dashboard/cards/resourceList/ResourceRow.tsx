import { Resource } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";
import ActionsButton from "./ActionsButton";

interface ResourceRowProps {
    resource: Resource;
    index: number;
}

export default function ResourceRow({ resource }: ResourceRowProps) {
    return (
        <div className="relative grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] border-b border-l border-r border-border-strong p-md body-small ">
            <div>{resource.category.name}</div>
            <div>{resource.title}</div>
            <div>{resource.files[0] && resource.files[0].fileType}</div>
            <div><FormattedDate createdAt={resource.createdAt} /></div>
            <ActionsButton id={resource.id} />
        </div>
    );
}