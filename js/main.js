let dialogs = {};

let currentHostId = "";
let currentActionKey1 = "";
let currentActionKey2 = "";
let currentActionID = "";

/*
  Refreshes the information on the screen.
*/
function refreshScreen() {
  for (i=0; i<hosts.length; i++) {
    $("#"+hosts[i].Htmlname+"_text").html(hosts[i].Hostname+"<br/>"+hosts[i].IPAddress+"<br/>"+hosts[i].Domain);
    //$("#"+hosts[i].Htmlname).css('background-color', 'darkblue');
  }
  initiateDraggableHosts();
}

/*
  Initiates the draggability of the "Host" objects.
*/
function initiateDraggableHosts() {
  $('.host').draggable({})
}

/*
  Generates the context menu items.
*/
function getContextMenuItems() {
  var i1 = {
    "edit": {name: "Host Info", icon: "edit"},
    "sep0": "---------",
    "add": {
        name: "Add", icon: "add",
        items: {
          "connection": {name: "Connection", icon: "paste"},
          "application": {name: "Application", icon: "paste"}
        }
    },
    "sep1": "---------"
    };

  var i2 = getActionMenuItems();
  
  var i3 = {
      "sep2": "---------",
      "accounts": {name: "Accounts", icon: "paste"},
      "sep3": "---------",
      "delete": {name: "Delete", icon: "delete"}
    };

  var items;

  items = Object.assign(i1, i2);
  items = Object.assign(items, i3);

  return items;
}

/*
  Generates the context menu for the Actions based on the dataset in general.js.
*/
function getActionMenuItems() {
  var items = {};

  Object.keys(guide).forEach(key => { // Enum, Shell, etc.
    var itemOut = {};
    var itemsOut = {};
    Object.keys(guide[key]).forEach(key2 => {  // Items
      itemsOut["action_"+key+"_"+key2] = {
        "name": key2,
        "icon": "paste"
      }
    });

    items["action_"+key] = itemOut;
    items["action_"+key]["name"] = key;
    items["action_"+key]["icon"] = "cut";
    items["action_"+key]["items"] = itemsOut;
  });

  return items;
}

/*
  Initiates the Context Menu for the "Host" objects.
*/
function initiateContextMenu() {
  $.contextMenu({
    selector: '.host', 
    callback: function(key, options) {
        //var m = "clicked: " + key;
        //window.console && console.log(m) || alert(m); 
        contextMenuClicked(this[0], key);
    },
    items: getContextMenuItems()
  });
}

/*
  Callback for context menu item clicked.
*/
function contextMenuClicked(obj, key) {
  currentHostId =obj.id;

  if (key.indexOf("action_")!=-1) {
      var actionKey = key.split("_");
      loadActionDialog(actionKey[1],actionKey[2]);
      return;
  }

  switch (key) {
    case "edit":
      showHostInfoDialog();
      break;
    case "delete":
      deleteHost(obj.id);
      refreshScreen();
      break;
  }
}

$(function() {
   initiateContextMenu();

   addHost("localhost","127.0.0.1", "Unknown OS", "Unknown Domain");
   addHost("RemoteComputer","10.0.0.128", "Unknown OS" ,"Unknown Domain");

   refreshScreen();
});
