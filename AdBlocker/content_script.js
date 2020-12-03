//content script 该文件会注入到访问的页面中
var clickedElement;
function removeElementsByClass(className){
    console.log('removeElementsByClass'+className);
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

document.addEventListener("mousedown", function(event){
    console.log('event.target='+event.target);
    clickedElement = event.target;
}, true);



//Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
chrome.runtime.onMessage.addListener( function(message, sender, sendResponse){
    console.log('runtime onMessage callback');
    // message 是background.js 中的chrome.tabs.sendMessage发送过来的。
    if(message.onload){
        removeElementsByClass('ad-platform-tips');
    }
    else{
        clickedElement.remove();
    }
});
