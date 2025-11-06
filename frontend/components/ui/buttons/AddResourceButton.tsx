import { SetStateAction } from "react";

interface AddResourceButtonProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function AddResourceButton({ isModalOpen, setIsModalOpen }: AddResourceButtonProps) {
    return (
        <button 
            className="bg-primary-700 py-xs px-md rounded-md hover:bg-primary-600 cursor-pointer body"
            onClick={() => setIsModalOpen(!isModalOpen)}
        >
            Add resource
        </button>
    )
}