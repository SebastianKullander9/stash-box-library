import { getTagsByCategory } from "@/actions/tag";
import SideBar from "@/components/ui/sidebar/SideBar";

export default async function ColorSidebar() {
    const tags = await getTagsByCategory("Colors");

    return <SideBar tags={tags} />;
}
