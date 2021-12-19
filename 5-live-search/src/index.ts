import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { IRepository, liveSearch, request } from './live-search';

const inputEl = document.querySelector('#search') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;

liveSearch(
	fromEvent<InputEvent>(inputEl, 'input'),
	(text) =>
		request(
			ajax<{ items: IRepository[] }>({
				url: `https://api.github.com/search/repositories?q=${text}`,
				crossDomain: true,
			}),
		),
	() => {
		container.innerHTML = 'loading .....';
	},
).subscribe((htmlStr) => {
	container.innerHTML = htmlStr;
});
