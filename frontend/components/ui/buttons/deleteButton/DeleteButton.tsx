export default function DeleteButton({label}: {label: string}) {
    return (
        <button className="relative px-4 py-2 cursor-pointer">
            <p className="relative z-10 text-black">{label}</p>
        </button>
    );
}