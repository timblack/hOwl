const guide = {
    Enumeration: {
        nmap: [
            {
                ID: "Enumeration_TCPSYN_NMap",
                Title: "TCP SYN Port Scan",
                Command: "nmap -sS REMOTEIP",
                Description: "TCP Port scan remote host using the TCP SYN method."
            },
            {
                ID: "Enumeration_TCPConnect_NMap",
                Title: "TCP Connect Port Scan",
                Command: "nmap -sT REMOTEIP",
                Description: "TCP Port scan remote host using the TCP Connect method."
            },
            {
                ID: "Enumeration_UDP_NMap",
                Title: "UDP Port Scan",
                Command: "nmap -sU REMOTEIP",
                Description: "UDP Port scan remote host."
            },
            {
                ID: "Enumeration_445Vuln_NMap",
                Title: "Port 445 Vuln Scan",
                Command: "nmap -Pn -p445 --script vuln REMOTEIP",
                Description: "Scan for vulnerabilities on Port 445."
            }
        ]
    },
    Shells: {
        netcat: [
            {
                ID: "TODO1",
                Title: "",
                Command: "",
                Description: ""
            }
        ],
        meterpreter: [
            {
                ID: "TODO2",
                Title: "",
                Command: "",
                Description: ""
            }
        ]        
    },
    "Privilege Escalation": {

    },
    "File Transfers": {      
    },
    Pivot: {
        ssh: [
            {
                ID: "TODO3",
                Title: "",
                Command: "",
                Description: ""
            }
        ]     
    }
};