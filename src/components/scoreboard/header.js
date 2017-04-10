import { h } from 'preact';

import { MAX_GAME_LENGTH } from './constants';

function buildDropdown (list, selectedItem) {
	return list.map(item => {
		let isSelected = (item === selectedItem) ? 'selected' : '';
		return (
			<option selected={isSelected} value={item}>{item}</option>
		);
	});
}

export function Header(props) {
	return (
	<header>
		{props.gameLength}
		<select onChange={props.setGameLength} id="gameLength">
			{buildDropdown(Array(MAX_GAME_LENGTH).fill().map((_, i) => i + 1), props.gameLength)}
		</select>
		<button onClick={props.resetScores}>reset score</button>
		{props.gameState}

	</header>
	);
}