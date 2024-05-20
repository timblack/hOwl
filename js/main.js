// Define global variables
let dialogs = {};
let currentHostId = "";
let currentActionKey1 = "";
let currentActionKey2 = "";
let currentActionID = "";

/**
 * Refreshes the information on the screen.
 */
function refreshScreen() {
  // Loop through all hosts
  for (let i = 0; i < hosts.length; i++) {
    // Update the HTML of each host with its hostname, IP address, and domain
    $("#" + hosts[i].Htmlname + "_text").html(hosts[i].Hostname + "<br/>" + hosts[i].IPAddress + "<br/>" + hosts[i].Domain);
  }

  // Make the hosts draggable
  initiateDraggableHosts();
}

/**
 * Makes the "Host" objects draggable.
 */
function initiateDraggableHosts() {
  $('.host').draggable({
    // When dragging stops, redraw the connections
    stop: function() {
      drawConnections();
    }  
  });
}

/**
 * Draws connections between hosts.
 * TODO: Implement this function.
 */
function drawConnections() {  
  // Implementation goes here
}

/*
  Generates the context menu items.
*/
function getContextMenuItems() {
  // Define the first set of menu items
  var basicMenuItems = {
    "edit": {name: "Host Info", icon: "edit"},
    "sep0": "---------",
    "add": {
        name: "Add", icon: "add",
        items: {
          "connection": {name: "Connection", icon: "paste"},
          "application": {name: "Application", icon: "paste"},
          "account": {name: "Account", icon: "paste"}
        }
    },
    "sep1": "---------"
  };

  // Get the action menu items
  var actionMenuItems = getActionMenuItems();
  
  // Define the delete menu item
  var deleteMenuItem = {
      "sep2": "---------",
      "delete": {name: "Delete", icon: "delete"}
  };

  // Combine all the menu items into one object
  var allMenuItems = Object.assign(basicMenuItems, actionMenuItems, deleteMenuItem);

  return allMenuItems;
}

/*
  Generates the action menu items based on the guide object.
*/
function getActionMenuItems() {
  // Initialize an empty object to hold the menu items
  var menuItems = {};

  // Loop over each key in the guide object
  Object.keys(guide).forEach(category => { // Enum, Shell, etc.
    // Initialize an empty object for this category
    var categoryItem = {};
    var actionItems = {};

    // Get the keys of the guide for this category and sort them
    var actionKeys = Object.keys(guide[category]);
    actionKeys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Loop over each key in the sorted keys
    actionKeys.forEach(actionKey => {  // Items
      // Add an item for this action to the actionItems object
      actionItems["action_" + category + "_" + actionKey] = {
        "name": actionKey,
        "icon": "paste"
      }
    });

    // Add the category item to the menuItems object
    menuItems["action_" + category] = categoryItem;
    menuItems["action_" + category]["name"] = category;
    menuItems["action_" + category]["icon"] = "cut";
    menuItems["action_" + category]["items"] = actionItems;
  });

  // Return the menu items
  return menuItems;
}

/*
  Initiates the Context Menu for the "Host" objects.
*/
function initiateContextMenu() {
  // Use jQuery's contextMenu plugin to create the context menu
  $.contextMenu({
    // Apply the context menu to all elements with the 'host' class
    selector: '.host', 

    // Define a callback function to be called when a menu item is clicked
    callback: function(key, options) {
        // Call the contextMenuClicked function with the clicked element and the key of the clicked item
        contextMenuClicked(this[0], key);
    },

    // Get the items for the context menu
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
    case "connection":
      var actionKey = key.split("_");
      loadConnectionDialog(actionKey[1],actionKey[2]);
      break
    case "application":
      var actionKey = key.split("_");
      loadApplicationDialog(actionKey[1],actionKey[2]);
      break;
      case "account":
        var actionKey = key.split("_");
        loadAccountDialog(actionKey[1],actionKey[2]);
        break;
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
