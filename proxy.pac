function FindProxyForURL(url, host) {

    // ===== 1) BYPASS สำหรับ WiFi Hotspot / Captive Portal ทั่วไป =====

    if (isInNet(host, "10.0.0.0",  "255.0.0.0")   ||
        isInNet(host, "172.16.0.0","255.240.0.0") ||
        isInNet(host, "192.168.0.0","255.255.0.0")) {
        return "DIRECT";
    }
	
	// Hotspot portals (Ruijie + AIS WiFi)
	if ( shExpMatch(host, "portal.ruijienetworks.com") ||
     shExpMatch(url,  "*portal.ruijienetworks.com*") ||
     shExpMatch(host, "wifi.ais.co.th") ||
     shExpMatch(url,  "*wifi.ais.co.th*") ) {

    return "DIRECT";
	}



    if (isPlainHostName(host)) {
        return "DIRECT";
    }

    if (shExpMatch(url, "http://www.msftconnecttest.com/*") ||
        shExpMatch(url, "http://www.msftncsi.com/*")        ||
        shExpMatch(url, "http://captive.apple.com/*")       ||
        shExpMatch(url, "http://detectportal.firefox.com/*")||
        shExpMatch(url, "http://connectivitycheck.android.com/*") ||
        shExpMatch(url, "http://clients3.google.com/generate_204*")) {
        return "DIRECT";
    }

    // ===== 2) BYPASS สำหรับ Microsoft Auth / SSO =====

    if (shExpMatch(host, "login.microsoftonline.com") ||
        shExpMatch(host, "*.login.microsoftonline.com") ||
        shExpMatch(host, "login.live.com") ||
        shExpMatch(host, "*.msauth.net") ||
        shExpMatch(host, "*.msftauth.net") ||
        shExpMatch(host, "secure.aadcdn.microsoftonline-p.com") ) {
        return "DIRECT";
    }

    // ===== 3) BYPASS สำหรับระบบภายใน + เว็บไซต์ที่เจ้านายใส่มา =====

    if (shExpMatch(host, "*.local"))                        return "DIRECT";
    if (shExpMatch(url,  "http://ap01.aisin-ap.com:7443*")) return "DIRECT";
    if (shExpMatch(host, "10.123.65.*"))                    return "DIRECT";
    if (shExpMatch(host, "192.168.1.*"))                    return "DIRECT";
    if (shExpMatch(host, "srct-syteline*"))                 return "DIRECT";
    if (shExpMatch(host, "server-hrm*"))                    return "DIRECT";
    if (shExpMatch(host, "system-barcode*"))                return "DIRECT";
    if (shExpMatch(host, "shiroki-s-prin*"))                return "DIRECT";
    if (shExpMatch(host, "espi.tdem.toyota-asia.com*"))     return "DIRECT";
    if (shExpMatch(host, "sc2.tmap-em.toyota-asia.com*"))   return "DIRECT";
    if (shExpMatch(host, "www.global-env-system.aisin.co.jp*")) return "DIRECT";
	if (shExpMatch(host, "www.srkhrm.com*")) 				return "DIRECT";
	if (shExpMatch(host, "srkhrm.com*")) 					return "DIRECT";
    if (shExpMatch(host, "shiroki-s-meec*"))                return "DIRECT";
    if (shExpMatch(host, "SRCT-S-MANAGE*"))                 return "DIRECT";
    if (shExpMatch(host, "*.diw.go.th*"))                   return "DIRECT";
    if (shExpMatch(host, "notify-api.line.me*"))            return "DIRECT";
    if (shExpMatch(host, "ipms.tmap-em.toyota-asia.com*"))  return "DIRECT";
    if (shExpMatch(host, "aiplus.aisingroup.com*"))         return "DIRECT";
    if (shExpMatch(host, "eqis.toyota.co.th*"))             return "DIRECT";
    if (shExpMatch(host, "labour.go.th*"))                  return "DIRECT";
    if (shExpMatch(host, "rscp.tdem.toyota-asia.com*"))     return "DIRECT";
    if (shExpMatch(host, "s-aiplus.aisingroup.com*"))       return "DIRECT";
    if (shExpMatch(host, "test-sts.jpn01.aisingroup.com*")) return "DIRECT";


    // ===== 4) อยู่ใน LAN/VPN บริษัทรึยัง? ใช้ proxy จริง / ถ้ายัง → ยิงทิ้ง =====

    // myIpAddress() = IP ของเครื่องเราเอง
    var myip = myIpAddress();

    // ถ้ามี IP อยู่ในช่วง 10.123.65.0/24 แสดงว่าอยู่ใน LAN หรือ ต่อ VPN แล้ว
    if (isInNet(myip, "10.123.65.0", "255.255.255.0")) {
        // ใช้ proxy จริงของบริษัท
        return "PROXY 10.123.65.1:8080";
    }

    // ถ้าไม่ได้อยู่ใน network บริษัท → บังคับไป proxy ปลอม (loopback port 9)
    // ผลคือออกเน็ตนอกไม่ได้
    return "PROXY 127.0.0.1:9";
}
