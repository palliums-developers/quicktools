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

const getAccountState = function (host, address) {
    extensionRequestPOST(host, 'get_account_state', [address],
        function (response) {
            let formattedStr = JSON.stringify(response, null, 2);
            ks.select("#code_get_account_state").innerText = formattedStr
        }, function (response) {
            ks.notice("网络加载失败", {
                time: 1500,
                color: "red"
            });
        })
}

document.getElementById("btn_get_account_state").onclick = function () {
    let selectNetwork = ks.select("#select_network")
    let host = selectNetwork.options[selectNetwork.selectedIndex].getAttribute("host_url")
    let address = ks.select("#input_get_account_state_address").value
    getAccountState(host, address)
}
