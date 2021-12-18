import '../../assets/css/style.css';
import { fromEvent } from 'rxjs';
import { skipLimit } from './skip-limit';
import { terminalLog } from '../../utils/log-in-terminal';

/**
 *   sequence$: ---0---1---2---3---4---5---6---7---8---9---10---
 *                          skipLimit(3, 4)
 *   sequence1$:---------------3---4---5---6---------------10---
 *
 */
fromEvent<MouseEvent>(document, 'click')
	.pipe(skipLimit(3, 4))
	.subscribe((v: MouseEvent) => {
		terminalLog(v.clientX);
	});
