// 该文件会运行在"_generated_background_page.html"中
console.log("My chrome extension works!!!");
var enabled = true;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log("blocking:", details.url);
        if(enabled) {
            console.log("blocking:", details.url);
        }
        return {cancel: enabled };
    },
    {urls: blocked_domains},
    //{urls: ["<all_urls>"]}, /* replace with list of blacklisted urls */
    ["blocking"]
);

// 创建页面右键菜单
var vcontextMen = chrome.contextMenus.create({
    "title": "Remove Ad Element",
    "id": "0",
    "contexts": ["all"]
});

// 页面加载时该函数没有执行。以后研究chrome.runtime.onInstalled.addListener 
// // Initizlize the Extension
// chrome.runtime.onInstalled.addListener(function() {
    // // contextMenus: right click mouse,select AdElement then remove
    // vcontextMen = chrome.contextMenus.create({
          // "title": "Remove Ad Element",
          // "id": "0",
          // "contexts": ["all"]
    // });
// });

// set up Listeners
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log('LinkUrl=' + info.linkUrl+ " tabId="+tab.id);
    chrome.tabs.sendMessage(tab.id,  {"onload":false});
})

chrome.webNavigation.onCompleted.addListener(function() {
    //alert("This is my favorite website!");
    // 不能放在这里，因为它的dom不是浏览的那个页面
    //removeElementsByClass('ad-platform-tips');
  },
  {url: [{urlMatches : 'https://pan.baidu.com/'}]
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    console.log("onUpdated="+tabId+" sendtabid="+tab.id+" status="+changeInfo.status+" tab="+tab.title);
    if(changeInfo.status == "complete")
    {
        chrome.tabs.sendMessage(tab.id, {"onload":true});
    }
});
  
  
  
  
  
  