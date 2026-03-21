interface EmptyStateProps {
	message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
	return (
		<section className="container section-x-padding">
			<p>
				{message}
			</p>
		</section>
	);
};