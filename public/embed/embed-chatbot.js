(function () {
    if (document.getElementById("ledu-chatbot-iframe")) {
        return;
    }
    const siteURL = window.LEduChatbotConfig?.siteURL || "http://localhost:3000";
    const chatbotId = window.LEduChatbotConfig?.chatbotId || "";
    const userId = window.LEduChatbotConfig?.userId || "";
    // Tạo iframe
    const iframe = document.createElement("iframe");
    iframe.id = "ledu-chatbot-iframe";
    iframe.src = `${siteURL}/vi/embed?chatbotId=${chatbotId}&userId=${userId}`;
    iframe.title = "L-Edu Chatbot";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.zIndex = "9999";
    iframe.style.background = "transparent";
    iframe.style.pointerEvents = "auto";

    document.body.appendChild(iframe);

    const adjustIframe = () => {
        iframe.style.width = "100%";
        iframe.style.height = "100%";
    };

    window.addEventListener("resize", adjustIframe);
})();