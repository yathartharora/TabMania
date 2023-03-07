document.addEventListener('DOMContentLoaded', function() {

  var button = document.getElementById('load');

  button.addEventListener('click', async function () {
    await chrome.tabs.query({}, async function(tabs) {
      var _tabNames = [];
      var _tabID = [];
      var _tabIcon = []
      tabs.forEach(function(tab){
        _tabNames.push(tab.title)
        _tabID.push(tab.id)
        _tabIcon.push(tab.favIconUrl)
      });
      var html = '';
      for(var i = 0; i < _tabNames.length; i++) {
        html += `<tr><div style="text-align: center"><td><img src="${_tabIcon[i]}" style= "width: 50%; height: 50%;"></td><td><div><a class="tab-link" data-tabid="${_tabID[i]}">${_tabNames[i]}</a></td><div></tr>`
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
