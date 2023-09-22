// background.js

function sendNotification(title, message) {
	browser.notifications.create({
		type: "basic",
		iconUrl: "refresh.png", // Replace with the path to your extension's icon
		title: title,
		message: message,
	});

	// const audio = new Audio('alarm.wav');
	// audio.play();
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "start") {
		sendNotification("Reload Started!", `The page will reload every ${message.timerValue} seconds.`);
		intervalId = setInterval(() => {
			browser.tabs.reload(message.tabId);
		}, message.timerValue * 1000);
		data = {
			"intervalId": intervalId,
			"timerValue": message.timerValue,
			"isRefreshing": true
		}
		localStorage.setItem(message.tabId, JSON.stringify(data));
	} else if (message.action === "stop") {
		data = JSON.parse(localStorage.getItem(message.tabId));
		if (!data) {
			return;
		}
		clearInterval(data.intervalId);
		localStorage.removeItem(message.tabId);
		sendNotification("Reload Stopped!", `The page will no longer reload.`);
	}
});

browser.runtime.onConnect.addListener((port) => {
	console.assert(port.name === "content-script");

	// Handle messages from the content script
	port.onMessage.addListener((message) => {
		if (message.action === 'notify') {
			// Handle the message from the content script
			sendNotification("Question posted!", "A question has been posted on the Chegg.");

			console.log('Received message in background script:', message.data);

			// Send a response back to the content script if needed
			port.postMessage({ response: 'Message received in the background script' });
		}
	});
});
