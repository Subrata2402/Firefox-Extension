setTimeout(function () {
	const target = document.querySelector('div');
	let x = Math.floor(10000 + Math.random() * 8000);
	if (target && target.textContent.includes("Thank you for your efforts on Chegg")) {
		const header = document.querySelector("h4");

		const firstLIne = document.createElement('p');
		// const lineOne = document.createTextNode("Chegg Question Notifier is running in the background.")
		// firstLIne.appendChild(lineOne);
		firstLIne.setAttribute("style", "color:#d67102; font-family:sans-serif; font-size:20px")
		firstLIne.innerHTML = `Chegg Question Notifier is running in the background. Refresh in <span id="timerMessage" style="color:blue;">00:${Math.floor(x / 1000)}</span> seconds.`;
		setInterval(() => {
			x = x - 1000;
			const timer = document.getElementById("timerMessage");
			if (timer) {
				seconds = Math.floor(x / 1000 % 60) < 10 ? `0${Math.floor(x / 1000 % 60)}`: Math.floor(x / 1000 % 60);
				timer.innerHTML = `00:${seconds}`;
			}
		}, 1000)
		const space = document.createElement('p');
		const emptySpace = document.createTextNode(".")
		space.appendChild(emptySpace);
		space.setAttribute("style", "opacity:0")

		const lastLine = document.createElement('p');
		const content = document.createTextNode("\nThis message is an indication that the extension is On, remember to refresh if in case you don't see this message.")
		lastLine.appendChild(content);
		lastLine.setAttribute("style", "color:#d67102; font-family:serif; font-size:20px")

		header.appendChild(space);
		header.appendChild(firstLIne);
		// header.appendChild(lastLine);
		setTimeout(() => {
			window.location.reload();
		}, x)

	}
	else {
		if (target && target.textContent.includes('Student question')) {
			browser.runtime.sendMessage({ time: "1" });
			const btn = document.querySelector('[data-test-id= "answerButton"]');

			browser.storage.local.get("myVariable", function (data) { //checking prefered choice of "auto answering from local storage"
				const value = data.myVariable;
				// console.log(value);
				if (value) {
					if (btn) {
						btn.click();
					}
				}
			});
		}
	}
}, 3000)

setTimeout(function () {
	const target = document.querySelector('div');
	if (target && !target.textContent.includes("Chegg Question Notifier") && !target.textContent.includes("Student question")) {
		window.location.reload();
	}
}, 10000)
