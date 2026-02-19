import SidebarLink from "./SidebarLink";
import { sidebarSections } from "../config/navigation.config";
import ViewSiteButton from "../../buttons/ViewSiteButton";
import LogoutButton from "../../buttons/LogoutButton";

export default function SideBar() {
	return (
		<div className="w-[264px] bg-surface h-full p-md border-r-1 border-border flex flex-col justify-between">
			<nav 
				className="flex flex-col"
				aria-label="Admin navigation"
			>
				<div className="h-8 mb-4">
					<p className="text-lg font-bold">
						Admin Dashboard
					</p>
				</div>
				<div className="section-y-padding flex flex-col gap-md">
					{sidebarSections.map((section) => (
						<ul key={section.title}>
							<p className="text-base text-text-secondary select-none">
								{section.title}
							</p>
							{section.links.map((link, index) => (
								<SidebarLink 
									key={index}
									href={link.href}
									label={link.label}
									icon={link.icon}
								/>
							))}
						</ul>
					))}
				</div>
			</nav>
			<div className="flex flex-row">
				<ViewSiteButton />
				<LogoutButton />
			</div>
		</div>
	);
};