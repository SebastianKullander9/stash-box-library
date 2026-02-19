interface CardWrapperProps {
    children: React.ReactNode;
    colSpan: string;
}

export default function CardWrapper({ children, colSpan }: CardWrapperProps) {
    return (
        <div className={`${colSpan} bg-surface border-border border-1 rounded-lg section-x-padding py-xl`}>
            {children}
        </div>
    )
}