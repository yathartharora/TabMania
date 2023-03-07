document.addEventListener('DOMContentLoaded', function() {

  var button = document.getElementById('load');

  button.addEventListener('click', async function () {
    await chrome.tabs.query({}, async function(tabs) {
      var _tabNames = [];
      var _tabID = [];
      var _tabIcon = []
      var _tabURL = []
      tabs.forEach(function(tab){
        _tabNames.push(tab.title)
        _tabID.push(tab.id)
        _tabIcon.push(tab.favIconUrl)
        _tabURL.push(tab.url)
      });
      var html = '';
      for(var i = 0; i < _tabNames.length; i++) {
        html += `<tr><div style="text-align: center"><td><img src="${_tabIcon[i]}" style= "width: 50%; height: 50%;"></td><td><div><a class="tab-link" data-tabid="${_tabID[i]}">${_tabNames[i]}</a></td><div></tr>`
        // html += `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img src="${_tabIcon[i]}" style= "width: 100%; height: 100%;"></div><div class="flip-card-back"><h1><a class="tab-link" data-tabid="${_tabID[i]}">${_tabNames[i]}</a></h1><p>${_tabURL[i]}</p></div></div></div>`
      }
      document.getElementById('status').innerHTML = html;
      addTabLinkListeners();
    });
  });
});

function addTabLinkListeners() {
  var tabLinks = document.getElementsByClassName('tab-link');
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', function() {
      var tabID = this.getAttribute('data-tabid');
      chrome.tabs.update(parseInt(tabID), {active: true});
    });
  }
}
