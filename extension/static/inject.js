let messageView = document.createElement("div")
messageView.id = "injectHandleMessage"
let event = new Event('onInjectHandleMessage')

document.addEventListener('message', function (e) {
    console.log('inject receive', e)
}, false);

function sendMessage(data) {
    console.log('inject send', data)
    window.postMessage({onInjectHandleMessage: data}, '*')
}
