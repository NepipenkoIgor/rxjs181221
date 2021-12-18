import 'bootstrap';
import 'bootstrap-slider';
import '../../assets/css/style.css';
import './styles.css';
import { sliderResultSequence$ } from './slider';

sliderResultSequence$.subscribe((v) => {
	console.log('Result', v);
});
