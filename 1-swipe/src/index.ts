import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { swipe$ } from './swipe';

terminalLog('Swipe');

swipe$.subscribe((v) => {
	if (v > 0) {
		terminalLog('Swipe to left ');
		return;
	}
	terminalLog('Swipe to  right');
});
