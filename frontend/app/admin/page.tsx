import Dashboard from "@/components/admin/dashboard/Dashboard";
import { getResources } from "@/actions/resource";

export default async function Admin() {
    const resources = await getResources(20, 8);

    return (
        <section>
            <Dashboard resources={resources.items}/>
        </section>
    );
}