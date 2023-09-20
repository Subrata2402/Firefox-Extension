document.addEventListener("DOMContentLoaded", function () {

	startButton = document.getElementById('startButton');
	startButton.addEventListener('click', async () => {
		const tabs = await browser.tabs.query({ active: true, currentWindow: true });
		const timerValue = document.getElementById('interval').value;
		browser.runtime.sendMessage({ action: 'start', tabId: tabs[0].id, timerValue: timerValue });
		updateTimer();
	});

	stopButton = document.getElementById('stopButton');
	stopButton.addEventListener('click', async () => {
		const tabs = await browser.tabs.query({ active: true, currentWindow: true });
		browser.runtime.sendMessage({ action: 'stop', tabId: tabs[0].id });
	});
});