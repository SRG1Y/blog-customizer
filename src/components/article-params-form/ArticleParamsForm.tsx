import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);

	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isArticleFormOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsArticleFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isArticleFormOpen]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isArticleFormOpen}
				onClick={() => setIsArticleFormOpen((prev) => !prev)}
			/>

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isArticleFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormState({
								...formState,
								fontFamilyOption: value,
							})
						}
					/>

					<Separator />

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({
								...formState,
								fontSizeOption: value,
							})
						}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) =>
							setFormState({
								...formState,
								fontColor: value,
							})
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							setFormState({
								...formState,
								backgroundColor: value,
							})
						}
					/>

					<Separator />

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) =>
							setFormState({
								...formState,
								contentWidth: value,
							})
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
