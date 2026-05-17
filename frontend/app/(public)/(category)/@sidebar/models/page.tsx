import { getTagsByCategory } from "@/actions/tag";
import SideBar from "@/components/ui/sidebar/SideBar";

export default async function ModelsSidebar() {
    const tags = await getTagsByCategory("Models");

    return <SideBar tags={tags} />;
}
