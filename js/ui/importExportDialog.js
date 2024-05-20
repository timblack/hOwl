
function initialiseImportExportButtons() {
    $('#import-data-button').click(function() {
        // Get the data from the textarea
        var data = $('#import-export-data-field').val();

        try {
            // Parse the JSON input to generate the hosts object
            hosts = JSON.parse(data);

            // Call the refreshScreen function
            refreshScreen();
        } catch (error) {
            console.error("Invalid JSON input: ", error);
        }
    });

    $('#export-data-button').click(function() {
        exportData();
    });

    $('#import-export-data-button').click(function() {
        dialogs["importExport"].dialog( "open" );
        exportData();
    });
}

function exportData() {
    // Generate the JSON for the hosts object
    var data = JSON.stringify(hosts, null, 2);

    // Populate the data-field input with the JSON
    $('#import-export-data-field').val(data);
}

$( function() {
    dialogs["importExport"] = $( "#import-export-dialog-form" ).dialog({
        autoOpen: false,
        height: 500,
        width: 700,
        modal: true,
        buttons: {
        Close: function() {

            dialogs["importExport"].dialog( "close" );
        }
        },
        close: function() {

        }
    });

    initialiseImportExportButtons();
});