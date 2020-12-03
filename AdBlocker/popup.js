var background = chrome.extension.getBackgroundPage();

function updateLabel() 
{
    var enabled = background.enabled;
    document.getElementById('toggle_button').value = enabled ? "Disable" : "Enable";
}
    
window.onload = function () {
    
    // // 方法1： 添加按钮事件
    // document.getElementById('toggle_button').onclick = function () {
        // background.enabled = !background.enabled;
        // updateLabel();
    // };
    
    updateLabel();
}

// 方法2：添加按钮的点击时间
document.addEventListener("DOMContentLoaded", function() {
    
    var toggle_button = document.getElementById("toggle_button") ;
    toggle_button.addEventListener("click", function(){
        alert("test toggle_button click function");
        background.enabled = !background.enabled;
        updateLabel();
    });
    
    var filter_button = document.getElementById("filter") ;
    filter_button.addEventListener("click", function(){
        alert("test filter_button click function");
    });
});
