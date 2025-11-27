
function FindProxyForURL(url, host) {
  // ===== 0) Normalization =====
  // บาง client คืน host เป็น uppercase → แปลงไว้กันพลาด
  host = host.toLowerCase();

  // ===== 1) LAN/VPN =====
  var myip = myIpAddress();
  if (isInNet(myip, "10.123.0.0", "255.255.0.0") ||
      isInNet(myip, "172.31.2.0", "255.255.255.0") ||
      isInNet(myip, "10.41.1.0", "255.255.255.0")) {
    return "DIRECT";
  }

  // ===== 2) BYPASS สำหรับ WiFi Hotspot / Captive Portal =====
  if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
      isInNet(host, "172.16.0.0", "255.240.0.0") ||
      isInNet(host, "192.168.0.0", "255.255.0.0") ||
      isPlainHostName(host)) {
    return "DIRECT";
  }

  // Hotspot portals
  if (shExpMatch(host, "portal.ruijienetworks.com") ||
      shExpMatch(host, "wifi.ais.co.th") ||
      shExpMatch(url, "*portal.ruijienetworks.com*") ||
      shExpMatch(url, "*wifi.ais.co.th*")) {
    return "DIRECT";
  }

  // Connectivity check URLs
  if (shExpMatch(url, "http://www.msftconnecttest.com/*") ||
      shExpMatch(url, "http://www.msftncsi.com/*") ||
      shExpMatch(url, "http://captive.apple.com/*") ||
      shExpMatch(url, "http://detectportal.firefox.com/*") ||
      shExpMatch(url, "http://connectivitycheck.android.com/*") ||
      shExpMatch(url, "http://clients3.google.com/generate_204*")) {
    return "DIRECT";
  }

  // ===== 3) DIRECT สำหรับระบบภายใน/เว็บไซต์ที่อยากให้วิ่งตรง =====
  var internalHosts = [
    "*.local",
    "ap01.aisin-ap.com",
    "10.123.65.*",
    "192.168.1.*",
    "srct-syteline*",
    "server-hrm*",
    "system-barcode*",
    "shiroki-s-prin*",
    "espi.tdem.toyota-asia.com*",
    "sc2.tmap-em.toyota-asia.com*",
    "www.global-env-system.aisin.co.jp*",
    "srct-proxy.pages.dev*",
    "kritsanuntripoom.github.io*",
    "shiroki-s-meec*",
    "SRCT-S-MANAGE*",
    "*diw.go.th",
    "ipms.tmap-em.toyota-asia.com*",
    "aiplus.aisingroup.com*",
    "eqis.toyota.co.th*",
    "*labour.go.th*",
    "rscp.tdem.toyota-asia.com*",
    "s-aiplus.aisingroup.com*",
    "test-sts.jpn01.aisingroup.com*"
  ];
  for (var i = 0; i < internalHosts.length; i++) {
    if (shExpMatch(host, internalHosts[i])) return "DIRECT";
  }

  // ===== 4) DIRECT สำหรับ Microsoft 365/Outlook ที่จำเป็น =====
  // ป้องกันอาการ "Loading" เพราะโดเมนสำคัญถูกส่งไป proxy ปลอม
  var o365Hosts = [
    "*.outlook.office.com",
    "outlook.office365.com",
    "*.office365.com",
    "login.microsoftonline.com",
    "*.microsoftonline.com",
    "*.microsoft.com",
    "*.azureedge.net",
    "*.azurefd.net",
    "*.teams.microsoft.com",
    "autodiscover.*",
    "o365.officeapps.live.com",
    "*.officeapps.live.com"
  ];
  for (var j = 0; j < o365Hosts.length; j++) {
    if (shExpMatch(host, o365Hosts[j])) return "DIRECT";
  }

  // ===== Default =====
  // ถ้าไม่เข้าเงื่อนไขใด ๆ → ใช้ Proxy ปลอมเพื่อ block
  return "PROXY 127.0.0.1:9";
}
