let hosts = [];

function addNewHost() {
    var hostHtmlName;
    
    hostHtmlName = addHost("New Host","x.x.x.x","Unknown OS","Unknown Domain");
    scrollToNewHost(hostHtmlName);
    refreshScreen();
  }
  
  function scrollToNewHost(hostHtmlName) {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#"+hostHtmlName).offset().top
    }, 2000);
  }
  
  /*
    Adds a new host to the screen.
  */
  function addHost(hostname, ipaddress, os, domain) {
    var host = {};
  
    if (hosts.length>0) host.ID = hosts[hosts.length-1].ID+1;
    else host.ID = 0;
    host.Htmlname = "Host"+host.ID;
  
    host.Hostname = hostname;
    host.IPAddress = ipaddress;
    host.OperatingSystem = os;
    host.Domain = domain;
    host.Data = {};
  
    host.position = { x: 0, y: 0 }
  
    $("body").append('<span class="host" id="'+host.Htmlname+'"><img src="img/computer.svg" class="host_img"/> <div id="'+host.Htmlname+'_text">Host</div> </span>');
    hosts.push(host);
  
    return host.Htmlname;
  }
  
  /*
    Deletes a host.
  */
  function deleteHost(hostID) {
    var host = getHost(hostID);
  
    $("#"+hostID).remove();
    hosts = hosts.filter(item => item !== host) // Remove host from the array
  }
  
  /*
    Gets the host based on Host ID.
  */
  function getHost(hostID) {
    for (var i=0; i<hosts.length; i++) {
      if (hosts[i].Htmlname==hostID) return hosts[i];
    }
  
    return null;
  }
  
  function hasHostResults(host, key1, key2, id) {
    var host;

    host = getHost(currentHostId);

    if (!(key1 in host.Data)) return false;
    if (!(key2 in host.Data[key1])) return false;
    if (!(id in host.Data[key1][key2])) return false;
    if (host.Data[key1][key2][id].length > 0) return true;
    return false;
  }