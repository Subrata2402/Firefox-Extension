// background.js
let intervalId = null;

function playAudio() {
	const audio = new Audio('alarm.wav');
	audio.play();
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "start") {
		browser.notifications.create({
			type: "basic",
			iconUrl: "refresh.png", // Replace with the path to your extension's icon
			title: "Reload Started!",
			message: `The page will reload every ${message.timerValue} seconds.`,
		});

		playAudio();

		intervalId = setInterval(() => {
			browser.tabs.reload(message.tabId);
		}, message.timerValue * 1000);
	} else if (message.action === "stop") {
		browser.notifications.create({
			type: "basic",
			iconUrl: "refresh.png", // Replace with the path to your extension's icon
			title: "Reload Stopped!",
			message: `The page will no longer reload.`,
		});

		playAudio();

		clearInterval(intervalId);
	}
});

browser.runtime.onConnect.addListener((port) => {
	console.assert(port.name === "content-script");

	// Handle messages from the content script
	port.onMessage.addListener((message) => {
		if (message.action === 'notify') {
			// Handle the message from the content script
			browser.notifications.create({
				type: "basic",
				iconUrl: "refresh.png", // Replace with the path to your extension's icon
				title: "Question posted!",
				message: "A question has been posted on the Chegg.",
			});

			playAudio();

			console.log('Received message in background script:', message.data);

			// Send a response back to the content script if needed
			port.postMessage({ response: 'Message received in the background script' });
		}
	});
});
