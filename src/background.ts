chrome.history.onVisited.addListener(historyItem => {
  console.log('history.onVisited', historyItem)
  removeUrlInHistory(historyItem.url)
})

const tabToUrl = {}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return
  }

  console.log('tabs.onUpdated url', tabId, changeInfo, tab.url)
  tabToUrl[tabId] = changeInfo.url
  removeUrlInHistory(changeInfo.url)
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log('tabs.onRemoved', tabId, removeInfo)
  removeUrlInHistory(tabToUrl[tabId])
  delete tabToUrl[tabId]
})

function removeUrlInHistory(url?: string) {
  if (url && url.toLowerCase().startsWith('https://www.pornhub.com')) {
    chrome.history.search({ text: 'https://www.pornhub.com' }, results => {
      if (results && results.length > 0) {
        console.log(results)
        results.forEach(result => {
          chrome.history.deleteUrl({ url: result.url })
        })
      }
    })
  }
}
