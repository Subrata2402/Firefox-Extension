const port = browser.runtime.connect({ name: "content-script" });
let intervalId = null;

intervalId = setInterval(() => {
    const documentContent = document.documentElement.outerHTML.toLowerCase();
    if (documentContent.includes("student question")) {
        port.postMessage({ action: "notify", data: "A question has been posted on the Chegg." });
        clearInterval(intervalId);
    }
}, 5000);

// port.onMessage.addListener((message) => {
//     console.log('Received message from background in content script: ', message);
// });