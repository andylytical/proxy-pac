# proxy-pac
Proxy Helpers and Setup

# Usage
### Windows
1. Open Windows "Proxy Settings"
   1. Windows key → then type "proxy settings"
1. Use setup script: "On"
1. Script address: https://raw.githubusercontent.com/andylytical/proxy-pac/master/proxy.pac
1. Save


### Mac
1. Settings → Network → Advanced → Proxies → Automatic Proxy Configuration
1. Enter path to local file (example: file:///absolute/path/to/proxy.pac)

See also: https://gist.github.com/dusenberrymw/850151bda3253453e5244d6a33c7cd2d

# Testing
### Online
* https://thorsen.pm/proxyforurl

### Local
1. Install `libpacparser1`
   1. `sudo apt install libpacparser1` #ubuntu
1. `/usr/bin/pactester -p <PAC_FILE> -u <URL>`
References:
* https://github.com/pacparser/pacparser
* https://success.thousandeyes.com/PublicArticlePage?articleIdParam=kA044000000LBBmCAO

# References
* http://findproxyforurl.com/example-pac-file/
