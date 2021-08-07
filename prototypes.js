String.prototype.padByDelim = function(d, tabWidth = 4) {
	var maxes = [];
	return this.split('\n').map(e => e.split(d)).map(e => {
		e = e.map(e => e.replaceAll('\t', ' '.repeat(tabWidth)));
		e.map((e, f, g) => 
			maxes[f] = maxes[f] ? Math.max(maxes[f], e.length) : e.length
		);
		return e;
	}).map(e => 
		2 > e.length ? e : e.map((e, f, g) => 
			f % 2 == 0 ? ' '.repeat(0 < f ? maxes[f - 1] - g[f - 1].length : 0) + e + ' '.repeat(maxes[f] - e.length) : e
		).join(d)
	).join('\n');
}

String.prototype.encases = function(s, e) {
	return this.startsWith(s) && this.endsWith(e);
}

String.prototype.replaceEvery = function(s, r = '') {
	let string = this.valueOf();
	if (-1 < r.indexOf(s)) return string;
	while (-1 < string.indexOf(s)) string = string.replaceAll(s, r);
	return string;
}

String.prototype.clip = function() {
	// Use navigator function
	navigator.clipboard.writeText(this.valueOf()).catch(e => {
		// If it fails, fallback to old method
		with (document) {
			let f = createElement('textarea');
			body.appendChild(f);
			f.value = this.valueOf();
			f.select();
			execCommand('copy');
			body.removeChild(f);
		}
	});
}

Array.prototype.sortByOccurrences = function() {
	// sort a alphabetically so occurrences are adjacent
	let a = [...this].sort(), b = [], t = a[0], c = 0;
	a.map(e => {
		if (e == t) {
			c++;
		} else {
			b.push([t, c]);
			c = 1;
		}
		t = e;
	});
	b.push([t, c]);
	return b.sort((a, b) => b[1] - a[1]);
}

Array.prototype.chunkify = function(s) {
	let c = [];
	if (0 >= s || isNaN(s)) return this;
	while (this.length > 0) c.push(this.splice(0, s));
	return c;
}

function formatBytes(a, b = 2, k = true) {
	// Modified version of https://stackoverflow.com/a/18650828/13192876
	with (Math) {
		let d = floor(log(a) / log(1000 + k * 24));
		if (1 > d) return a + ' Byte' + (a == 1 ? '' : 's');
		let s = k ? ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'] : ['k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];
		return parseFloat((a / pow(1000 + k * 24, d)).toFixed(max(0, b))) + ' ' + s[d - 1] + 'B';
	}
}

const queryAPI = (url, g = r => r.text()) => new Promise((res) => {
	// by default, read as text
	let f = e => fetch(e, {cache: "no-cache"}).then(g);
	typeof url == "string" ?
		f(url).then(r => res(r)) : 
		Promise.all(url.map(f)).then(r => res(r));
});

const delay = ms => new Promise(res => setTimeout(res, ms));
