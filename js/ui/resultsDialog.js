
function loadResultsDialog(key1, key2, id) {
    var host;

    host = getHost(currentHostId);
    if (hasHostResults(host, key1, key2, id)) $("#results-textarea").val(host.Data[key1][key2][id]);
    else $("#results-textarea").val("");

    currentActionKey1 = key1;
    currentActionKey2 = key2;
    currentActionID = id;

    dialogs["results"].dialog( "open" );
}

function updateResults(){
    var host;

    host = getHost(currentHostId);

    if (!(currentActionKey1 in host.Data)) host.Data[currentActionKey1] = {};
    if (!(currentActionKey2 in host.Data[currentActionKey1])) host.Data[currentActionKey1][currentActionKey2] = {};
    if (!(currentActionID in host.Data[currentActionKey1][currentActionKey2])) host.Data[currentActionKey1][currentActionKey2][currentActionID] = {};
    host.Data[currentActionKey1][currentActionKey2][currentActionID] = $("#results-textarea").val();
}

$( function() {

    dialogs["results"] = $( "#results-dialog-form" ).dialog({
        autoOpen: false,
        height: 500,
        width: 700,
        modal: true,
        buttons: {
        Close: function() {
            updateResults();
            dialogs["results"].dialog( "close" );
        }
        },
        close: function() {
            updateResults();
        }
    });
});