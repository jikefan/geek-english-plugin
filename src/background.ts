console.log('GeekEnglish启动成功!');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getSelectWords") {
        // 执行操作，访问 window 对象
        const pageUrl = sender.tab?.url;
        console.log("当前页面的URL是：" + pageUrl);
        // 获取选中的文本
        const selectedText = window.getSelection().toString().trim();
        // 回复消息
        sendResponse({ response: selectedText });
    }
});