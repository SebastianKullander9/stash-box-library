import ResourceList from "../../ui/dashboard/cards/resourceList/ResourceList";
import { Resource } from "@/types";

interface DashboardProps {
    resources: Resource[];
}

export default function Dashboard({ resources }: DashboardProps) {
    return (
        <section className="grid grid-cols-12 section-x-padding">
            <ResourceList resources={resources} />
        </section>
    )
}