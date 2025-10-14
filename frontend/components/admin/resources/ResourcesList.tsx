import { getResources } from "@/actions/resource";
import { ResourcePage } from "@/types";
import ResourceCard from "./ResourceCard";

export default async function ResourcesList() {
    const resources: ResourcePage = await getResources(20, 0);
    console.log(resources)

    return (
        <div>
            <h2 className="text-white text-normal text-sm mb-4">Resources</h2>
            <ul className="flex flex-col main-gap text-black">
                {resources.items.length === 0 && <li className="text-white text-normal">No resources added yet...</li>}
                {resources.items.map((resource, index) => (
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