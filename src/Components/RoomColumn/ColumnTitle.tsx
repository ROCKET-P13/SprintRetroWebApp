import { useCallback, useEffect, useRef, useState } from 'react';

import { useUpdateColumnTitleMutation } from '@/hooks/mutations/useUpdateColumnTitleMutation';
import { roomStore } from '@/stores/roomStore';

interface ColumnTitleProps {
	columnId: string;
	title: string;
}

export const ColumnTitle = ({ columnId, title }: ColumnTitleProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState(title);

	const inputRef = useRef<HTMLInputElement>(null);

	const session = roomStore((state) => state.session);

	const { mutateAsync: updateTitle, isPending } = useUpdateColumnTitleMutation({ roomId: session.roomId });

	useEffect(() => {
		if (!isEditing) {
			return;
		}

		inputRef.current?.focus();
		inputRef.current?.select();
	}, [isEditing]);

	const save = useCallback(async () => {
		if (isPending) {
			return;
		}

		const newColumnTitle = updatedTitle.trim();

		if (!newColumnTitle) {
			setUpdatedTitle(title);
			setIsEditing(false);
			return;
		}

		if (newColumnTitle === title) {
			setIsEditing(false);
			return;
		}

		await updateTitle({ id: columnId, title: newColumnTitle });
		setIsEditing(false);
	}, [updatedTitle, title, updateTitle, columnId, isPending]);

	return (
		<input
			name='column-title'
			ref={inputRef}
			value={updatedTitle}
			disabled={isPending}
			onChange={(e) => setUpdatedTitle(e.target.value)}
			onBlur={save}
			onKeyDown={async (e) => {
				switch (e.key) {
					case 'Enter':
						e.preventDefault();
						await save();
						break;

					case 'Escape':
						e.preventDefault();

						inputRef.current?.blur();
						setUpdatedTitle(title);
						setIsEditing(false);
						break;
				}
			}}
			className="
				field-sizing-content
				min-w-12.5
				cursor-text
				rounded-md
				pl-1
				pr-1
				py-1
				font-medium
				text-left
				transition-colors
				focus-visible:outline-muted-foreground/70
				focus-visible:outline-1
			"
		/>
	);
};
