import { h, Component } from 'preact';
import { ScoreBox } from './scorebox';
import style from './style';

export default class ScoreBoard extends Component {

	state = {
		gameLength: 3,
		userScore: 0,
		opponentScore: 0
	}

	updateScore(scoreProperty, isDecreace, e) {
		const modifier = isDecreace ? -1 : +1;

		if (isDecreace && this.state[scoreProperty] === 0) {
			return false;
		}
		this.setState(previousState => ({ [scoreProperty]: previousState[scoreProperty] + modifier }));

	}

	resetScores () {
		this.setState({
			userScore: 0,
			opponentScore: 0
		});
	}

	setGameLength (e) {
		const gameLength = e.currentTarget.value;
		this.setState({
			gameLength
		});
	}

	render({}, {userScore, opponentScore, gameLength}) {
		return (
			<div class={style.scoreBoxes}>
				{gameLength}
				<ScoreBox
					score={userScore}
					increaseScore={this.updateScore.bind(this, 'userScore', false)}
					decreaseScore={this.updateScore.bind(this, 'userScore', true)}
				/>
				<ScoreBox
					score={opponentScore}
					increaseScore={this.updateScore.bind(this, 'opponentScore', false)}
					decreaseScore={this.updateScore.bind(this, 'opponentScore', true)}
				/>
				<button onClick={this.resetScores.bind(this)}>reset score</button>
				<label for="gameLength">game length:</label>
				<select onChange={this.setGameLength.bind(this)} id="gameLength">
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(item => <option value={item}>{item}</option>)}
				</select>
			</div>
		);
	}
}
