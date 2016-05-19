// this sets the background color of the master UIView
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({  
    title:'Things',
    backgroundColor:'#fff',
    url: 'things.js',
    tabBarHidden: true
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

//  add tabs
tabGroup.addTab(tab1);  
 
// open tab group
tabGroup.open();