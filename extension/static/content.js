document.addEventListener('DOMContentLoaded', function () {
    injectCustomJs();
})

// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'static/inject.js';
    let temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.body.appendChild(temp);
}

chrome.runtime.sendMessage({from: "content_scripts"}, function (response) {
    console.log(response);
});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage({greeting: message || '你好，我是content-script呀，我主动发消息给后台！'}, function (response) {
        tip('收到来自后台的回复：' + response);
    });
}

let event = new Event('onInjectHandleMessageSend')

function sendMessageToInject(message) {
    console.log('content send', message)
    document.getElementById('injectHandleMessage').innerText = JSON.stringify(message)
    document.dispatchEvent(event)
}

window.addEventListener('message', (e) => {
    console.log('content receive', e.data)
}, false)
