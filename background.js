browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.time === '1') {
			browser.notifications.create({
				type: "basic",
				iconUrl: "images/Chegg_icon.png",
				title: "Chegg Question Notifier",
				message: "A Question has been detected! Please check Chegg Tab.",
				priority: 2
			});
			browser.storage.local.get("myVariableAlarm", function (data) {
				const value = data.myVariableAlarm;
				if (value) {
					browser.storage.local.get("ringtone", function (data) {
						const value = data.ringtone;
						var audio = new Audio('ringtones/' + value + '.mp3');
						audio.play();
					});
				}
			});
		}
	}
)