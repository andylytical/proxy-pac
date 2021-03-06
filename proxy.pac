// See also:
// Info:    http://findproxyforurl.com/example-pac-file/
// Testing: https://app.thorsen.pm/proxyforurl
function FindProxyForURL(url, host) {
 
  // SAMPLES
  //return url;  //useful for troubleshooting
  //return host; //useful for troubleshooting
  //if ( shExpMatch( host, "(vsphere|netdot).ncsa.illinois.edu" ) )
  //if ( shExpMatch( url, "*192.168*") )

  // Local proxy ports
  var proxy_5700 = "SOCKS 127.0.0.1:5700";
  var proxy_5701 = "SOCKS 127.0.0.1:5701";
  var proxy_5702 = "SOCKS 127.0.0.1:5702";
  var proxy_5703 = "SOCKS 127.0.0.1:5703";

  // Matching rules
  if ( host == "lsst-git.ncsa.illinois.edu"
  || isInNet(dnsResolve(host), "172.31.68.0", "255.255.252.0")
  )
    return proxy_5700;

  var cerb_tunnel_hosts = [
    "netdot.ncsa.illinois.edu",
    "vsphere.ncsa.illinois.edu",
  ];
  if ( cerb_tunnel_hosts.includes( host ) )
    return proxy_5701;

  // LSSTCORP addrs should go direct
  if ( shExpMatch( host, "ls.st|*.lsstcorp.org") )
    return "DIRECT";
  // LSSTCORP IPs should use proxy
  if ( isInNet(dnsResolve(host), "140.252.32.0", "255.255.254.0") )
    return proxy_5701;

  if ( isInNet(dnsResolve(host), "192.168.28.0", "255.255.254.0") )
    return proxy_5702;

  // Anything below here isn't needed when accessed from work
  if (isInNet(myIpAddress(), "141.142.0.0", "255.255.0.0"))
    return "DIRECT";

  var ncsa_tunnel_hosts = [
    "git.ncsa.illinois.edu",
    "netact.ncsa.illinois.edu",
    "odcim.ncsa.illinois.edu",
  ];
  if ( ncsa_tunnel_hosts.includes( host ) )
    return proxy_5703;

  // No match
  return "DIRECT";
}
