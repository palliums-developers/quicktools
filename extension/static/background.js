function extensionRequestPOST(url, method, params, onSuccess, onError) {
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('content-type', 'application/json')

    let json = {
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: (parseInt(Math.random() * (1000 + 1), 10)).toString(),
    }
    request.onload = function () {
        if (request.status === 200) {
            onSuccess(JSON.parse(request.response))
        } else {
            onError()
        }
    }
    request.onerror = function (e) {
        onError(e)
    }

    request.send(JSON.stringify(json));
}

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('收到消息', request);
        sendResponse("回答处理结果");
    }
);

function sendContentMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {from: 'background', to: 'content_scripts'}, function (response) {
            console.log(response);
        });
    });
}

