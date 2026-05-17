import { getTagsByCategory } from "@/actions/tag";
import SideBar from "@/components/ui/sidebar/SideBar";

export default async function CodeSidebar() {
    const tags = await getTagsByCategory("Code");

    return <SideBar tags={tags} />;
}
