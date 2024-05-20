
function loadApplicationDialog(key1, key2) {
    $('#current-applications').empty(); 
    $("#application-name").val("");
    $("#port-number").val(1024);    

    let currentHost = getHost(currentHostId);

    for (let i = 0; i < currentHost.Data.Applications.length; i++) {
        let currentApplication = currentHost.Data.Applications[i];
        $('#current-applications').append(new Option(currentApplication.ApplicationName+"("+currentApplication.Protocol+": "+currentApplication.Port+")"));
    }

    $("#application-dialog-form").dialog("open");
}

function initialiseApplicationButtons() {
    $('#add-application-button').click(function() {
        let currentHost = getHost(currentHostId);

        // Add the selected option to the current connections select box
        let application = {};
        application.ApplicationName = $("#application-name").val();
        application.Protocol = $("#protocol").val();
        application.Port = $("#port-number").val();

        $('#current-applications').append(new Option(application.ApplicationName+"("+application.Protocol+": "+application.Port+")"));
        currentHost.Data.Applications.push(application);
    });

    $('#remove-application-button').click(function() {
        var selectedOption = $('#current-applications option:selected');
        selectedOption.remove();
    });
}

$( function() {
    dialogs["application"] = $("#application-dialog-form").dialog({
        autoOpen: false,
        height: 550,
        width: 350,
        modal: true,
        buttons: {
            Close: function() {
                dialogs["application"].dialog( "close" );
            }
        },
        close: function() {
        }
    });

    initialiseApplicationButtons();
});