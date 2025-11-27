
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
  
// Microsoft Teams & M365 allowlist
var m365Teams = [
  // Auth
  "login.microsoftonline.com", "*.microsoftonline.com", "login.windows.net",
  "*.msauth.net", "*.msauthimages.net",
  // Outlook/Exchange
  "outlook.office.com", "outlook.office365.com", "*.outlook.office.com",
  "*.outlook.cloud.microsoft", "autodiscover.outlook.com", "autodiscover-s.outlook.com",
  "smtp.office365.com", "*.protection.outlook.com", "*.mail.protection.outlook.com",
  // Teams
  "*.teams.microsoft.com", "teams.microsoft.com", "*.skype.com", "*.lync.com",
  "*.broadcast.skype.com", "*.sfbassets.com", "*.sfbassets.net", "*.mstea.ms",
  // CDN
  "*.azureedge.net", "*.azurefd.net", "*.cdn.office.net",
  // Office Apps
  "*.officeapps.live.com", "o365.officeapps.live.com", "officeclient.microsoft.com",
  "*.sharepoint.com", "*.onenote.com", "*.onedrive.com",
  // Notifications
  "*.wns.windows.com", "*.push.microsoft.com"
];
for (var k = 0; k < m365Teams.length; k++) {
  if (shExpMatch(host, m365Teams[k])) return "DIRECT";
}


  // ===== Default =====
  // ถ้าไม่เข้าเงื่อนไขใด ๆ → ใช้ Proxy ปลอมเพื่อ block
  return "PROXY 127.0.0.1:9";
}
