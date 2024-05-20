
function showHostInfoDialog() {
    dialogs["hostinfo"].dialog( "open" );

    host = getHost(currentHostId);
    refreshHostInfo(host);
}

function refreshHostInfo(host) {
    $("#hostname").val(host.Hostname);
    $("#ipaddress").val(host.IPAddress);
    $("#os").val(host.OperatingSystem);
    $("#domain").val(host.Domain);
}

function updateHostInfo() {
    host = getHost(currentHostId);

    host.Hostname = $("#hostname").val();
    host.IPAddress = $("#ipaddress").val();
    host.OperatingSystem = $("#os").val();
    host.Domain = $("#domain").val();

    refreshScreen();
    dialogs["hostinfo"].dialog( "close" );
}

$( function() {

    dialogs["hostinfo"] = $( "#hostinfo-dialog-form" ).dialog({
        autoOpen: false,
        height: 440,
        width: 350,
        modal: true,
        buttons: {
        "Update": updateHostInfo,
        Cancel: function() {
            dialogs["hostinfo"].dialog( "close" );
        }
        },
        close: function() {
        }
    });
});