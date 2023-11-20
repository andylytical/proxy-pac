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

  /* CERBERUS (5701) */
  var cerb_tunnel_hosts = [
    "mgrscontest.ncsa.illinois.edu",
    "netdot.ncsa.illinois.edu",
    "vcenter.internal.ncsa.edu",
    "vsphere.ncsa.illinois.edu",
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
  if ( url.startsWith( "http://metris" ) )
    return proxy_5703;

  /* Anything below here isn't needed when accessed from work */
  if (isInNet(myIpAddress(), "141.142.0.0", "255.255.0.0"))
    return "DIRECT";

  /* NCSA (5703) */
  var ncsa_tunnel_hosts = [
    "cotton.ncsa.illinois.edu",
    "crashplan.ncsa.illinois.edu",
    "help-dev.ncsa.illinois.edu",
    "identity.ncsa.illinois.edu",
    "identity.uillinois.edu",
    "internal.ncsa.illinois.edu",
    "jira-dev-al.ncsa.illinois.edu",
    "jira-dev-jg.ncsa.illinois.edu",
    "jira-dev-kb.ncsa.illinois.edu",
    "jira-test.ncsa.illinois.edu",
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
    "wiki-dev-al.ncsa.illinois.edu",
    "wiki-dev-jg.ncsa.illinois.edu",
    "wiki-dev-kb.ncsa.illinois.edu",
    "wiki-test.ncsa.illinois.edu",
  ];
  if ( ncsa_tunnel_hosts.includes( host ) )
    return proxy_5703;

  if ( shExpMatch( host, "*.internal.ncsa.edu" ) )
    return proxy_5703;

  /* No match */
  return "DIRECT";
}
