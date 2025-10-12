import { getResources } from "@/actions/resource";
import { Resource } from "@/types";
import ResourceCard from "./ResourceCard";

export default async function ResourcesList() {
    const resources: Resource[] = await getResources();
    console.log(resources)

    return (
        <div>
            <h2 className="text-white text-normal text-sm mb-4">Resources</h2>
            <ul className="flex flex-col main-gap text-black">
                {resources.length === 0 && <li className="text-white text-normal">No resources added yet...</li>}
                {resources.map((resource, index) => (
                    <ResourceCard 
                        key={index} 
                        title={resource.title} 
                        description={resource.description} 
                        category={resource.category.name} 
                        id={resource.id} 
                    />
                ))}
            </ul>
        </div>
    )
}