(function () {
    if (document.getElementById("chatbot-iframe")) {
        return;
    }
    const siteURL = window.ChatbotConfig?.siteURL || "http://localhost:3000";
    const chatbotId = window.ChatbotConfig?.chatbotId || "";
    const userId = window.ChatbotConfig?.userId || "";
    const token = window.ChatbotConfig?.token || "";
    // Tạo iframe
    const iframe = document.createElement("iframe");
    iframe.id = "chatbot-iframe";
    iframe.src = `${siteURL}/vi/embed?chatbotId=${chatbotId}&userId=${userId}&token=${token}`;
    iframe.title = "Chatbot";
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