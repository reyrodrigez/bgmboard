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

	render({}, {userScore, opponentScore, updateScore}) {
		return (
			<div class={style.scoreBoxes}>
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
			</div>
		);
	}
}
