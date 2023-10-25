browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.time === '1') {
			const audio = new Audio('lokiverse.mp3');
			browser.notifications.create({
				type: "basic",
				iconUrl: "images/Chegg_icon.png",
				title: "Chegg Question Notifier",
				message: "A Question has been detected! Please check Chegg Tab.",
				priority: 2
			});
			browser.storage.local.get("myVariableAlarm", function (data) {
				const value = data.myVariableAlarm;
				// console.log(value);
				if (value) {
					audio.play();
				}
			});
		}
	}
)