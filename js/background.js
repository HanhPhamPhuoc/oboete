chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('main.html', {
		width: 775, 
		height: 600,
		left: 50,
		top: 50,
		type: 'shell'
	});
});
