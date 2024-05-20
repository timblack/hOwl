// Initialize an empty array to hold the hosts
let hosts = [];

/*
  Adds a new host with default values.
*/
function addNewHost() {
  // Add a new host with default values and get its HTML name
  let hostHtmlName = addHost("New Host", "x.x.x.x", "Unknown OS", "Unknown Domain");

  // Scroll to the new host
  scrollToNewHost(hostHtmlName);

  // Refresh the screen
  refreshScreen();
}

/*
  Scrolls the page to the newly added host.
*/
function scrollToNewHost(hostHtmlName) {
  // Use jQuery's animate function to smoothly scroll to the new host
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#" + hostHtmlName).offset().top
  }, 2000);
}

/*
  Adds a new host to the hosts array and to the screen.
*/
function addHost(hostname, ipaddress, os, domain) {
    // Initialize an empty object to hold the host data
    let host = {};

    // If there are already hosts, set the new host's ID to one more than the last host's ID
    // Otherwise, set the new host's ID to 0
    host.ID = hosts.length > 0 ? hosts[hosts.length - 1].ID + 1 : 0;

    // Set the new host's HTML name
    host.Htmlname = "Host" + host.ID;

    // Set the new host's hostname, IP address, operating system, and domain
    host.Hostname = hostname;
    host.IPAddress = ipaddress;
    host.OperatingSystem = os;
    host.Domain = domain;

    // Initialize an empty object to hold the host's data
    host.Data = {};

    // Initialize empty arrays to hold the host's connections, applications, and accounts
    host.Data.Connections = [];
    host.Data.Applications = [];
    host.Data.Accounts = [];

    // Initialize an object to hold the host's position
    host.position = { x: 0, y: 0 }
  
    $("body").append('<span class="host" id="'+host.Htmlname+'"><img src="img/computer.svg" class="host_img"/> <div id="'+host.Htmlname+'_text">Host</div> </span>');
    hosts.push(host);
  
    return host.Htmlname;
  }
  
/*
  Deletes a host.
*/
function deleteHost(hostID) {
  // Get the host object based on the host ID
  var host = getHost(hostID);

  // Remove the host element from the DOM
  $("#" + hostID).remove();

  // Remove the host object from the hosts array
  hosts = hosts.filter(item => item !== host);
}

/*
  Retrieves a host object based on its ID.
*/
function getHost(hostID) {
  // Loop through the hosts array
  for (var i = 0; i < hosts.length; i++) {
    // If the current host's Htmlname property matches the host ID, return the host object
    if (hosts[i].Htmlname === hostID) {
      return hosts[i];
    }
  }

  // If no host object was found that matches the host ID, return null
  return null;
}
  
/*
  Checks if a host has results for a given key.
*/
function hasHostResults(host, key1, key2, id) {
  // Get the host object based on the current host ID
  host = getHost(currentHostId);

    if (!(key1 in host.Data)) return false;
    if (!(key2 in host.Data[key1])) return false;
    if (!(id in host.Data[key1][key2])) return false;
    if (host.Data[key1][key2][id].length > 0) return true;
    return false;
}