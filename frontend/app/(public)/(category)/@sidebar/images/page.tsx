import { getTagsByCategory } from "@/actions/tag";
import SideBar from "@/components/ui/sidebar/SideBar";

export default async function ImagesSidebar() {
    const tags = await getTagsByCategory("Images");

    return <SideBar tags={tags} />;
}
