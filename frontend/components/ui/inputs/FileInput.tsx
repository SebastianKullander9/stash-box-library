type FileInputProps = {
  label: string;
  name?: string;
};

export default function FileInput({ label, name="files"}: FileInputProps) {


    return (
        <>
            <label
                htmlFor="file-upload"
                className="p-2 text-black bg-[var(--color-white)] rounded-sm text-normal p-normal cursor-pointer"
            >
                {label}
            </label>
            <input
                id="file-upload"
                className="hidden" 
                name={name}
                type="file" 
                multiple 
            />
        </>
    )          
}