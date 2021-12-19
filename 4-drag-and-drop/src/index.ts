import '../../assets/css/style.css';
import './styles.css';
import { fromEvent } from 'rxjs';
import { dragAndDrop } from './drag-and-drop';

const box = document.querySelector('.draggable') as HTMLDivElement;

const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

dragAndDrop(mousedown$, mousemove$, mouseup$).subscribe(({ left, top }) => {
	box.style.left = `${left}px`;
	box.style.top = `${top}px`;
});
