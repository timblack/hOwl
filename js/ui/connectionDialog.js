
function loadConnectionDialog(key1, key2) {
    $('#available-connections').empty();
    $('#current-connections').empty(); 

    let currentHost = getHost(currentHostId);

    for (let i = 0; i < hosts.length; i++) {
        if (hosts[i].Htmlname!=currentHostId) {
            if (currentHost.Data.Connections.includes(hosts[i].Htmlname)) {
                $('#current-connections').append(new Option(hosts[i].Hostname + " (" + hosts[i].IPAddress + ")", hosts[i].Htmlname));
            } else {
                $('#available-connections').append(new Option(hosts[i].Hostname + " (" + hosts[i].IPAddress + ")", hosts[i].Htmlname));
            }
        }
    }
    
    $("#connection-dialog-form").dialog("open");
}

function initialiseConnectionButtons() {
    $('#add-connection-button').click(function() {
        // Get the selected option from the available connections select box
        var selectedOption = $('#available-connections option:selected');
        // Remove the selected option from the available connections select box
        selectedOption.remove();

        // Add the selected option to the current connections select box
        $('#current-connections').append(selectedOption);
    });

    $('#remove-connection-button').click(function() {
        // Get the selected option from the current connections select box
        var selectedOption = $('#current-connections option:selected');
    
        // Remove the selected option from the current connections select box
        selectedOption.remove();
    
        // Add the selected option to the available connections select box
        $('#available-connections').append(selectedOption);
    });
}

function saveConnections() {
    // Get the current host
    let currentHost = getHost(currentHostId);

    // Clear the current host's connections
    currentHost.Data.Connections = [];

    // Get the options from the current-connections select box
    let options = $('#current-connections option');

    // Add each option's value to the current host's connections
    options.each(function() {
        currentHost.Data.Connections.push($(this).val());
    });
}

$( function() {
    dialogs["connection"] = $("#connection-dialog-form").dialog({
        autoOpen: false,
        height: 500,
        width: 350,
        modal: true,
        buttons: {
            Close: function() {
                saveConnections();
                dialogs["connection"].dialog( "close" );
            }
        },
        close: function() {
        }
    });

    initialiseConnectionButtons();
});
