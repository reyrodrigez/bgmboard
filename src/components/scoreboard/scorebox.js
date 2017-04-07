import { h } from 'preact';
import style from './style';

export function ScoreBox(props) {
	return (
    <div class={style.scoreBox}>
		<a onClick={props.increaseScore} class={style.scoreBoxUpdate}></a>
		<a onClick={props.decreaseScore} class={style.scoreBoxUpdate}></a>
		<h3>{props.score}</h3>
	</div>
	);
}
