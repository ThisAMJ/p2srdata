let data = new P2Data();

function display() {
	let map = data.maps[document.querySelector('#slider').value];
		let desired = [];
		desired.push(map.formattedWiki);
		desired.push('Categories: ' + map.categories.map(e => `<a href="https://wiki.portal2.sr/Category:${e}" target="_blank">${e}</a>`).join(', '));
		desired.push('Mtriggers: ' + (map.triggers.length > 0 ? `<br><pre>${map.triggers.join('\n')}</pre>` : 'None'));
		desired.push('Fade: ' + (map.fade == '' ? 'None' : map.fade));
		desired.push('Native to CM: ' + (map.cmNative ? 'Yes' : map.triggers.length > 0 ? 'Not by default' : 'No'));
		desired.push(map.chamberID > -1 ? `<a href="https://board.portal2.sr/chamber/${map.chamberID}" target="_blank">View CM Leaderboard</a>` : '');
		desired.push(`<a href="https://wiki.portal2.sr/index.php?title=${map.wikiname}&action=edit" target="_blank">Edit this page</a><br>
					  <a href="https://wiki.portal2.sr/index.php?title=${map.wikiname}&action=history" target="_blank">View history of this page</a>`);
		document.querySelector('pre').innerHTML = desired.join('<br><br>').replaceEvery('<br><br><br>', '<br><br>').replaceEvery('<br><pre>', '<pre>').replaceEvery('</pre><br>', '</pre>');
}

window.onload = async function() {
	document.querySelector('pre').innerHTML = 'Getting mtriggers...';
	await data.getMtriggers();
	document.querySelector('pre').innerHTML = 'Getting wiki...';
	await data.getWiki();
	document.querySelector('pre').innerHTML = 'Getting leaderboards...';
	await data.getBoards();
	document.querySelector('pre').innerHTML = 'Formatting wiki content...';
	data.formatWiki();
	document.querySelector('#slider').oninput = () => display();
	document.querySelector('#slider').max = data.maps.length - 1;
	display();
}
