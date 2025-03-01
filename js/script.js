// 获取模态窗口
var modal = document.getElementById("myModal");

// 获取链接元素
var link = document.getElementById("popupLink");

// 获取关闭按钮
var closeButton = document.getElementsByClassName("close")[0];

// 点击链接时打开模态窗口
link.onclick = function(event) {
    event.preventDefault(); // 阻止默认行为
    modal.style.display = "block"; // 显示模态窗口
}

// 点击关闭按钮时关闭模态窗口
closeButton.onclick = function() {
    modal.style.display = "none";
}

// 点击模态窗口外部区域时关闭模态窗口
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 复制文本功能
document.getElementById("copyButton").onclick = function() {
    var text = document.getElementById("textToCopy").innerText;
    navigator.clipboard.writeText(text).then(function() {
        alert("文本已复制到剪贴板！");
    }, function(err) {
        console.error('复制失败:', err);
    });
}
