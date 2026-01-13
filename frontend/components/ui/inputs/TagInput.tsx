"use client";

import { useRef, useState, useEffect } from "react";
import { ResourceTag } from "@/types";
import Tags from "../tags/Tags";

interface TagInputProps {
    label?: string;
    name: string;
    type?: string;
    defaultValue?: string;
    resetSignal?: boolean;
    tags: ResourceTag[];
}

export default function TagInput({ label="", name, type="text", defaultValue, resetSignal, tags}: TagInputProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [inputValue, setInputValue] = useState(defaultValue || "");
    const [filteredTags, setFilteredTags] = useState<ResourceTag[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (resetSignal) {
            setSelectedTags([]);
            setInputValue("");
        }
    }, [resetSignal]);

    useEffect(() => {
        const handleButtonWidth = () => {
            if (!ref.current) return;

            setButtonWidth(ref.current.clientWidth);
        };

        handleButtonWidth();
        window.addEventListener("resize", handleButtonWidth);
        return () => window.removeEventListener("resize", handleButtonWidth);
    }, []);

    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = tags.filter(tag => 
                tag.name.toLowerCase().includes(inputValue.toLocaleLowerCase()) &&
                !selectedTags.includes(tag.name)
            );

            setFilteredTags(filtered);
            setShowDropdown(filtered.length > 0);
        } else {
            setFilteredTags([]);
            setShowDropdown(false);
        }
    }, [inputValue, tags, selectedTags]);

    const handleSelectExisting = (tagName: string) => {
        setSelectedTags(prev => [...prev, tagName]);
        setInputValue("");
        setShowDropdown(false);
    }

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleCreateNew = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !selectedTags.includes(trimmedValue)) {
            setSelectedTags(prev => [...prev, capitalizeFirstLetter(trimmedValue)]);
            setInputValue("");
            setShowDropdown(false);
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    }
 
    return (
        <label className="flex flex-col body text-sm">
            {label}
            <div className="relative">
                <input
                    className={`bg-white p-xs rounded-md w-full text-background ${showDropdown ? "rounded-bl-none" : "rounded-bl-md"}`}
                    style={{ paddingRight: `${buttonWidth + 8}px` }}
                    type={type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    defaultValue={defaultValue}
                    placeholder="React"
                    autoComplete="off"
                />

                <button
                    className={`bg-primary-700 absolute right-[-1px] text-sm body p-xs rounded-tr-md  cursor-pointer hover:bg-primary-600 ${showDropdown ? "rounded-br-none" : "rounded-br-md"}`}
                    type="button"
                    ref={ref}
                    onClick={handleCreateNew}
                >
                    Create
                </button>
            </div>
           
            <div>
                {showDropdown && (
                    <div className="bg-white text-background">
                        {filteredTags.map((tag) => (
                            <div
                                key={tag.id}
                                className="p-sm hover:bg-gray-100"
                                onClick={() => handleSelectExisting(tag.name)}
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedTags.map((tag, index) => (
                <input
                    key={index}
                    type="hidden"
                    name={name}
                    value={tag}
                />
            ))}

            <div className="flex flex-row gap-sm pt-md">
                <Tags tags={selectedTags} removeTag={handleRemoveTag} />
            </div>
        </label>
    );
}