import { Code } from "@/types/code";
import FileSelector from "./FileSelector";
import EditCodeBlock from "./EditCodeBlock";
import { updateCodeFiles } from "@/actions/code";

interface EditCodeRendererProps {
	resource: Code;
}

export default function EditCodeRenderer({ resource }: EditCodeRendererProps) {
	const action = updateCodeFiles.bind(null, resource.id);

	return (
		<form 
			action={action} 
			className="contents"
		>
			<FileSelector id={resource.id} resource={resource.codeFiles} editMode={true}>
				{resource.codeFiles.map((file) => (
					<EditCodeBlock key={file.id} file={file} resource={resource} />
				))}
			</FileSelector>
		</form>
	);
};