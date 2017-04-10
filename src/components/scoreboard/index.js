import { h, Component } from 'preact';
import { ScoreBox } from './scorebox';
import { Header } from './header';
import style from './style';

import { DEFAULTS, GAME_STATES } from './constants';

export default class ScoreBoard extends Component {

	state = Object.assign({}, DEFAULTS);

	checkGameState () {
		let {gameState, isCrawford, isPostCrawford,opponentScore, userScore, gameLength} = this.state;
		const crawfordScore = gameLength-1;

		if (opponentScore === gameLength || userScore === gameLength) {
			gameState = GAME_STATES.gameEnded;
		} else if (isPostCrawford) {
			gameState = GAME_STATES.postCrawfordGame;
		} else if (opponentScore === crawfordScore || userScore === crawfordScore) {
			gameState = GAME_STATES.crawfordGame;
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
			<div class={style.scoreBoard}>
				<Header
					setGameLength = {this.setGameLength.bind(this)}
					gameLength = {gameLength}
					resetScores = {this.resetScores.bind(this)}
					gameState = {gameState}
				/>
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
			</div>
		);
	}
}
