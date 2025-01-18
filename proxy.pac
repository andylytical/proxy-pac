/* See also: */
/* Info:    http://findproxyforurl.com/example-pac-file/ */
/* Testing: https://thorsen.pm/proxyforurl */
function FindProxyForURL(url, host) {
 
  /* SAMPLES */
  /* return url;  //useful for troubleshooting */
  /* return host; //useful for troubleshooting */
  /* if ( shExpMatch( host, "(vsphere|netdot).ncsa.illinois.edu" ) ) */
  /* if ( shExpMatch( url, "*192.168*") ) */

  /* Local proxy ports */
  var proxy_5700 = "SOCKS5 127.0.0.1:5700";
  var proxy_5701 = "SOCKS5 127.0.0.1:5701";
  var proxy_5702 = "SOCKS5 127.0.0.1:5702";
  var proxy_5703 = "SOCKS5 127.0.0.1:5703";
  var proxy_5704 = "SOCKS5 127.0.0.1:5704";

  /* ACHE (5700) */
  var ache_tunnel_hosts = [
    "ache-vcenter.internal.ncsa.edu",
    "ache-git.ncsa.illinois.edu",
  ];
  if ( ache_tunnel_hosts.includes( host ) )
    return proxy_5700;

  /* Anything below here isn't needed when connected to VPN */
  if (isInNet(myIpAddress(), "141.142.146.0", "255.255.255.0"))
    return "DIRECT";

  /* CERBERUS (5701) */
  var cerb_tunnel_hosts = [
    "vsphere.ncsa.illinois.edu",
    "netdot.ncsa.illinois.edu",
  ];
  if ( cerb_tunnel_hosts.includes( host ) )
    return proxy_5701;

  /* VMs (5702) */
  if ( isInNet(host, "192.168.28.0", "255.255.254.0") )
    return proxy_5702;

  /* ICCP BMC (5704) */
  if ( isInNet(host, "10.60.0.0", "255.255.0.0") )
    return proxy_5704;

  /* FLASK TESTING */
  if ( url.startsWith( "http://eukelade" ) )
    return proxy_5703;
  /* ACCESS TESTING */
  if ( url.startsWith( "http://localhost" ) )
    return proxy_5703;

  /* Uncomment when in Wiki / Jira Maintenance */
  /* if ( shExpMatch(host, "jira-*.ncsa.illinois.edu") || */
  /*      shExpMatch(host, "wiki*.ncsa.illinois.edu") || */
  /*      shExpMatch( host, "*.internal.ncsa.edu" ) */
  /* ) */
  /*   return proxy_5703; */

  /* Anything below here isn't needed when accessed from work */
  if (isInNet(myIpAddress(), "141.142.0.0", "255.255.0.0"))
    return "DIRECT";

  /* NCSA (5703) FQDNs*/
  var ncsa_tunnel_hosts = [
    "cotton.ncsa.illinois.edu",
    "crashplan.ncsa.illinois.edu",
    "help-dev.ncsa.illinois.edu",
    "identity.ncsa.illinois.edu",
    "identity.uillinois.edu",
    "internal.ncsa.illinois.edu",
    "internal-dev.ncsa.illinois.edu",
    "internal-test.ncsa.illinois.edu",
    "jira-assets-dev.ncsa.illinois.edu",
    "jira-old.ncsa.illinois.edu",
    "jiracmdline.ncsa.illinois.edu",
    "kblum-jira.ncsa.illinois.edu",
    "mylar.ncsa.illinois.edu",
    "netact.ncsa.illinois.edu",
    "odcim.ncsa.illinois.edu",
    "paper.ncsa.illinois.edu",
    "papyrus.ncsa.illinois.edu",
    "parchment.ncsa.illinois.edu",
    "tyvek.ncsa.illinois.edu",
    "vellum.ncsa.illinois.edu",
  ];
  if ( ncsa_tunnel_hosts.includes( host ) )
    return proxy_5703;

  /* No match */
  return "DIRECT";
}
