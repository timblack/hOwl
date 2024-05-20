
function loadActionDialog(key1, key2) {
    var items = guide[key1][key2];
    var strHTML = "";
    var host;
    var command;

    host = getHost(currentHostId);

    for (var i=0;i<items.length;i++) {
        command = items[i].Command.replace("REMOTEIP",host.IPAddress);
        strHTML += "<h3>"+items[i].Title;
        if (hasHostResults(host, key1, key2, items[i].ID)) strHTML += "&#x2713";
        strHTML += "</h3><div><p><b>"+command+"</b><br/><br/>"+items[i].Description+"</p><input type='button' value='Results' onclick='loadResultsDialog(\""+key1+"\",\""+key2+"\",\""+items[i].ID+"\")'/></div>"
    }

    $("#action-dialog-form").dialog('option', 'title', key2+" ("+key1+")");
    $("#actionAccordion").html(strHTML);
    $("#actionAccordion").accordion({
        heightStyle: "content"
    });
    $("#actionAccordion").accordion("refresh");

    dialogs["action"].dialog( "open" );
}

$( function() {

    dialogs["action"] = $( "#action-dialog-form" ).dialog({
        autoOpen: false,
        height: 440,
        width: 350,
        modal: true,
        buttons: {
        Close: function() {
            dialogs["action"].dialog( "close" );
        }
        },
        close: function() {
        }
    });
});