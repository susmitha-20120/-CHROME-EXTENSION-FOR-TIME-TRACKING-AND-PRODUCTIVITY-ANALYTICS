const PRODUCTIVE_SITES = ["github.com", "stackoverflow.com", "chat.openai.com"];
const UNPRODUCTIVE_SITES = ["instagram.com", "facebook.com", "youtube.com"];

chrome.storage.local.get(null, data => {
  const div = document.getElementById("output");
  for (let domain in data) {
    const seconds = Math.floor(data[domain] / 1000);
    
    let label = "";
    if (PRODUCTIVE_SITES.includes(domain)) {
      label = "✅ Productive";
    } else if (UNPRODUCTIVE_SITES.includes(domain)) {
      label = "❌ Unproductive";
    } else {
      label = "⚪ Neutral";
    }

    div.innerHTML += `<p><strong>${domain}</strong>: ${seconds}s <br/>${label}</p>`;
  }
});
