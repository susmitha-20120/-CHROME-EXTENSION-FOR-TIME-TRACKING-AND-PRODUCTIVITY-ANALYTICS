let currentTab = null;
let startTime = Date.now();

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
}

// When user switches tabs
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    switchTab(getDomain(tab.url));
  });
});

// Save time when switching tabs
function switchTab(newDomain) {
  if (currentTab) {
    const timeSpent = Date.now() - startTime;

    chrome.storage.local.get([currentTab], result => {
      const previous = result[currentTab] || 0;
      chrome.storage.local.set({ [currentTab]: previous + timeSpent });
    });
  }

  currentTab = newDomain;
  startTime = Date.now();
}
