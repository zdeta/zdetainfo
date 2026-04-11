var path = '/zdetainfo/news';

function start() {
	//localStorage.setItem("status", 'Post1');
	setPath(path);
	getArtykul();
	setTimeout(function() {
  	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 500);
}

window.onload = start();