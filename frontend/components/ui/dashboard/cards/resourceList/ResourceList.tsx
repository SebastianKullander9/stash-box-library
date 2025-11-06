import CardWrapper from "@/components/ui/dashboard/cardWrapper/CardWrapper";
import { Resource } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";
import { Ellipsis } from "lucide-react";

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
                            <div key={`${resource.title} ${index}`} className="relative grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0] border-b border-l border-r border-border-strong p-md body-small ">
                                <div>{resource.category.name}</div>
                                <div>{resource.title}</div>
                                <div>{resource.files[0].fileType}</div>
                                <div><FormattedDate createdAt={resource.createdAt} /></div>
                                <div className="absolute top-1/2 -translate-y-1/2 right-0 p-md ">
                                    <div className="hover:bg-surface-hover p-xs cursor-pointer rounded-md">
                                        <Ellipsis />
                                    </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </CardWrapper>
    )
}

/* 

<table className="table-auto w-full border border-border-strong">
    <thead className="border border-border-strong text-left">
        <tr>
            <th className="p-sm">Category</th>
            <th>Title</th>
            <th>File type</th>
            <th>Created</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {resources.map((resource, index) => (
            <tr key={`${resource.title} ${index}`} className="border border-border-strong">
                <td className="p-sm">{resource.category.name}</td>
                <td>{resource.title}</td>
                <td>{resource.files[0].fileType}</td>
                <td><FormattedDate createdAt={resource.createdAt} /></td>
                <td className=""><Ellipsis size={40} className="hover:bg-surface-hover px-xs cursor-pointer" /></td>
            </tr>
        ))}
    </tbody>
</table>
*/