import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from './animate';
import { terminalLog } from '../../utils/log-in-terminal';

const d = document.querySelector('.animated-shape') as HTMLDivElement;
animationDown(d).subscribe({
	next: (v) => terminalLog(`Coord => ${v}`),
	complete: () => terminalLog('Completed'),
});
