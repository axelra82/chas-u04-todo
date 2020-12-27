/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useState } from 'react';
import './style.scss';

export default ({
	props: {
		task,
		selectCard,
		updateTask,
		saveTask,
	},
}) => {

	const {
		id,
		title,
		description,
		createdAt,
		updatedAt,
	} = task;
	const [saveButton, setSaveButton] = useState(false);
	const titleRef = useRef();
	const descriptionRef = useRef();
	// Date format function
	const formatDate = (date) => {

		// Fix missing T declaration
		const dateTime = new Date(date.replace(' ', 'T'));

		// Format according to en-US
		const options = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};

		// Return beautiful date
		return dateTime.toLocaleDateString("en-US", options);
	}

	return (
		<article className="task-card">
			<input
				id={id}
				type="checkbox"
				name={`card-${id}`}
				className="input-checkbox"
				onChange={(e) => selectCard(e.target)}
			/>

			<h1
				ref={titleRef}
				className="title"
				onClick={() => updateTask(false, titleRef, setSaveButton)}
			>
				{title}
			</h1>
			<p className="task-created">
				{createdAt === updatedAt ?
					<>
						created <time dateTime={createdAt}>{formatDate(createdAt)}</time>
					</>
					:
					<>
						updated < time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
					</>
				}
			</p>
			<p
				ref={descriptionRef}
				className="description"
				onClick={() => updateTask(false, descriptionRef, setSaveButton)}
			>
				{description}
			</p>
			{saveButton &&
				<button className="update-task" onClick={() => saveTask(id, titleRef, descriptionRef, setSaveButton)}>save</button>
			}
		</article>
	);
}