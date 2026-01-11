import Dashboard from "@/components/admin/dashboard/Dashboard";
import { getResources } from "@/actions/resource";

export default async function Admin() {
    const resources = await getResources(20, 0);
    console.log(resources)

    return (
        <section>
            <Dashboard resources={resources.items}/>
        </section>
    );
}