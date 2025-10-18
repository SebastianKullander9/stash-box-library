type FormattedDateProps = {
    createdAt: Date;
}

export default function FormattedDate({ createdAt }: FormattedDateProps) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <p>{formattedDate}</p>
    );
}