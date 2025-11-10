import CardWrapper from "@/components/ui/dashboard/cardWrapper/CardWrapper";
import { Resource } from "@/types";
import ResourceRow from "./ResourceRow";

interface ResourceListProps {
    resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
    return (
        <CardWrapper colSpan="col-span-12">
            <div className="py-xl flex flex-col gap-sm">
                <h3 className="heading-6">
                    All resources
                </h3>
                <div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0] border-1 border-border-strong p-md body rounded-tr-lg rounded-tl-lg">
                        <div>Category</div>
                        <div>Title</div>
                        <div>File type</div>
                        <div>Created</div>
                    </div>
                    <div>
                        {resources.map((resource, index) => (
                            <ResourceRow
                                key={`${resource.title} ${index}`}
                                resource={resource}
                                index={index} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}