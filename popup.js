document.addEventListener("DOMContentLoaded", function () {
	getCheck();

	const toggleCheckbox = document.getElementById("toggleCheckbox");
	toggleCheckbox.addEventListener("change", function () {
		const isChecked = toggleCheckbox.checked;
		browser.storage.local.set({ myVariable: isChecked });
		//storing value in local storage
		browser.runtime.sendMessage({ action: "toggleCheckbox", value: isChecked });
	});

	const toggleCheckboxAlarm = document.getElementById("toggleCheckboxAlarm");
	toggleCheckboxAlarm.addEventListener("change", function () {
		const isChecked = toggleCheckboxAlarm.checked;
		browser.storage.local.set({ myVariableAlarm: isChecked });
		//storing value in local storage
		browser.runtime.sendMessage({ action: "toggleCheckboxAlarm", value: isChecked });
	});
});

function getCheck() {
	browser.storage.local.get("myVariable", function (data) {
		const value = data.myVariable;
		// console.log(value);
		if (value) {
			document.getElementById('toggleCheckbox').checked = true;
		} else {
			document.getElementById('toggleCheckbox').checked = false;
		}
	});

	browser.storage.local.get("myVariableAlarm", function (data) {
		const value = data.myVariableAlarm;
		// console.log(value);
		if (value) {
			document.getElementById('toggleCheckboxAlarm').checked = true;
		} else {
			document.getElementById('toggleCheckboxAlarm').checked = false;
		}
	});
}