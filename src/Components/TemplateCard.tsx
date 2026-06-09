import { RetroTemplate } from '@/types/RetroTemplate';
import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface TemplateCardProps {
	template: RetroTemplate;
	selected: boolean;
	onSelect: () => void;
}

export const TemplateCard = ({
	template,
	selected,
	onSelect,
}: TemplateCardProps) => {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={
				mergeTailwindClasses(
					'w-full text-left rounded-lg border bg-card p-4',
					'transition-all duration-150 ease-in-out',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
					selected ? 'bg-primary hover:bg-primary/90' : 'bg-transparent hover:bg-accent'
				)
			}
		>
			<div className="flex items-start justify-between gap-2">
				<div>
					<div className="font-medium text-card-foreground">
						{template.name}
					</div>

				</div>
			</div>

			<div className="mt-3 flex flex-wrap gap-2">
				{
					template.columns.length === 0
						? (
							<div className="text-xs text-muted-foreground italic">
								No columns (start from scratch)
							</div>
						)
						: (
							template.columns.map((column, index) => (
								<span
									key={index}
									className={
										mergeTailwindClasses(
											'rounded-md px-2 py-1 text-xs text-muted font-semibold',
											selected ? 'bg-foreground' : 'bg-muted text-muted-foreground'
										)
									}
								>
									{column.title}
								</span>
							))
						)}
			</div>
		</button>
	);
};