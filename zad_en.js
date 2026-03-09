var path = '/zdetainfo/glowna';

function start() {
	localStorage.setItem("status", 'Post2');
	setPath(path);
	getArtykul();
	
	setTimeout(function() {
  	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 500);
}

window.onload = start();