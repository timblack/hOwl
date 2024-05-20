
function loadAccountDialog(key1, key2) {
    $('#current-accounts').empty();
    $("#account-description").val("");
    $("#account-username").val("");
    $("#account-password").val("");    

    let currentHost = getHost(currentHostId);

    for (let i = 0; i < currentHost.Data.Accounts.length; i++) {
        let currentAccount = currentHost.Data.Accounts[i];
        $('#current-accounts').append(new Option(currentAccount.AccountDescription+": "+currentAccount.AccountUsername+","+currentAccount.AccountPassword));
    }

    $("#account-dialog-form").dialog("open");
}

function initialiseAccountButtons() {
    $('#add-account-button').click(function() {
        let currentHost = getHost(currentHostId);

        // Add the selected option to the current connections select box
        let account = {};
        account.AccountDescription = $("#account-description").val();
        account.AccountUsername = $("#account-username").val();
        account.AccountPassword = $("#account-password").val();

        $('#current-accounts').append(new Option(account.AccountDescription+": "+account.AccountUsername+","+account.AccountPassword));
        currentHost.Data.Accounts.push(account);
    });

    $('#remove-account-button').click(function() {
        var selectedOption = $('#current-accounts option:selected');
        selectedOption.remove();
    });
}

$( function() {
    dialogs["account"] = $("#account-dialog-form").dialog({
        autoOpen: false,
        height: 550,
        width: 350,
        modal: true,
        buttons: {
            Close: function() {
                dialogs["account"].dialog( "close" );
            }
        },
        close: function() {
        }
    });

    initialiseAccountButtons();
});