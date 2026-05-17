import { getTagsByCategory } from "@/actions/tag";
import SideBar from "@/components/ui/sidebar/SideBar";

export default async function FontSidebar() {
    const tags = await getTagsByCategory("Fonts");

    return <SideBar tags={tags} />;
}
