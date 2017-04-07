import { h, Component } from 'preact';
import { ScoreBox } from './scorebox';
import style from './style';

const DEFAULTS = {
	gameLength: 7,
	userScore: 0,
	opponentScore: 0,
	gameState: '',
	isCrawford: false,
	isPostCrawford: false
};

export default class ScoreBoard extends Component {

	state = Object.assign({}, DEFAULTS);

	checkGameState () {
		let {gameState, isCrawford, isPostCrawford,opponentScore, userScore, gameLength} = this.state;
		const crawfordScore = gameLength-1;

		if (opponentScore === gameLength || userScore === gameLength) {
			gameState = 'Game ended';
		} else if (isPostCrawford) {
			gameState = 'Post Crawford game';
		} else if (opponentScore === crawfordScore || userScore === crawfordScore) {
			gameState = 'Crawford game';
			isCrawford = true;
		}
		this.setState({
			gameState,
			isCrawford,
			isPostCrawford
		});
	}

	updateScore(scoreProperty, isDecreace, e) {
		const modifier = isDecreace ? -1 : +1;
		let {isPostCrawford} = this.state;

		if (isDecreace && this.state[scoreProperty] === 0) {
			return false;
		}

		if (!isDecreace && this.state.isCrawford) {
			isPostCrawford = true;
		}

		this.setState(previousState => ({ 
			[scoreProperty]: previousState[scoreProperty] + modifier,
			isPostCrawford
		}));

		this.checkGameState();

	}

	resetScores () {
		this.setState(DEFAULTS);
	}

	setGameLength (e) {
		const gameLength = e.currentTarget.value;
		this.setState({
			gameLength
		});
	}

	render({}, {userScore, opponentScore, gameLength, gameState}) {
		return (
			<div class={style.scoreBoxes}>
				{gameLength}
				{gameState}
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
