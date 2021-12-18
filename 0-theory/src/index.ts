// import '../../assets/css/style.css';
// import { terminalLog } from '../../utils/log-in-terminal';
//
// terminalLog('Теория');

// of(1, 2, 3, 4)
// from([1, 2, 3, 4])
// range(1, 10)
// timer(5000, 2000)
// const random = Math.round(Math.random() * 10);
// console.log(random);
// iif(
// 	() => {
// 		return random > 5;
// 	},
// 	of('First sequence'),
// 	of('Second sequence'),
// )

// defer(() => {
// 	return random >= 5
// 		? random >= 8
// 			? of('First sequence')
// 			: of('Second sequence')
// 		: of('Third sequence');
// })

// ajax({
// 	url: 'http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38',
// 	method: 'GET',
// 	crossDomain: true,
// })

// from(
// 	fetch('http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38').then((res) =>
// 		res.json(),
// 	),
// )
// 	//.pipe(pluck('response'))
// 	.subscribe((v) => {
// 		console.log(v);
// 	});

// const readAsPromise = util.promisify(fs.readFile);
// const readFile$ = from(readAsPromise(`${__dirname}/text`));
// readFile$
//
// const readDir = bindNodeCallback(fs.readFile);
// readDir(`${__dirname}/text`)
// 	.pipe(
// 		map((buffer) => {
// 			const str = buffer.toString();
// 			const regExp = />([^<]+)</;
// 			const matches = regExp.exec(str);
// 			return matches && matches[1];
// 		}),
// 	)
// 	.subscribe((v) => {
// 		console.log(v);
// 	});

import { filter, interval, map, skip, take, tap } from 'rxjs';

const sequence$ = interval(1000);

/*

sequence$:  ---0---1---2---3---4---5---6---7---8---
           map((x)=>x*2)
            ---0---2---4---6---8---10---12---14---16---
           filter((x)=>x%3 === 0)
            ---0-----------6-----------12-------- 
            tap((x)=> 10) 
            ---0-----------6-----------12--------  
            skip(2)  
            ---------------------------12--------   
            take(1) 
sequence1$: ---------------------------12|                           
 */

sequence$
	.pipe(
		map((x) => x * 2),
		filter((x) => x % 3 === 0),
		tap((x) => {
			console.log('LOG', x);
			return 10;
		}),
		skip(2),
		take(1),
	)
	.subscribe((v) => {
		console.log(v);
	});
