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


	// ชื่อ host ที่ไม่มีจุด เช่น "login", "hotelwifi"
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
    if (shExpMatch(url,  "*ap01.aisin-ap.com:7443*")) 		return "DIRECT";
    if (shExpMatch(host, "10.123.65.*"))                    return "DIRECT";
    if (shExpMatch(host, "192.168.1.*"))                    return "DIRECT";
    if (shExpMatch(host, "srct-syteline*"))                 return "DIRECT";
    if (shExpMatch(host, "server-hrm*"))                    return "DIRECT";
    if (shExpMatch(host, "system-barcode*"))                return "DIRECT";
    if (shExpMatch(host, "shiroki-s-prin*"))                return "DIRECT";
    if (shExpMatch(host, "espi.tdem.toyota-asia.com*"))     return "DIRECT";
    if (shExpMatch(host, "sc2.tmap-em.toyota-asia.com*"))   return "DIRECT";
    if (shExpMatch(host, "www.global-env-system.aisin.co.jp*")) return "DIRECT";
	if (shExpMatch(host, "srct-proxy.pages.dev*")) 			return "DIRECT";
	if (shExpMatch(host, "kritsanuntripoom.github.io*")) 	return "DIRECT";
    if (shExpMatch(host, "shiroki-s-meec*"))                return "DIRECT";
    if (shExpMatch(host, "SRCT-S-MANAGE*"))                 return "DIRECT";
    if (shExpMatch(host, "*.diw.go.th*"))                   return "DIRECT";
    if (shExpMatch(host, "ipms.tmap-em.toyota-asia.com*"))  return "DIRECT";
    if (shExpMatch(host, "aiplus.aisingroup.com*"))         return "DIRECT";
    if (shExpMatch(host, "eqis.toyota.co.th*"))             return "DIRECT";
    if (shExpMatch(host, "*labour.go.th*"))                  return "DIRECT";
    if (shExpMatch(host, "rscp.tdem.toyota-asia.com*"))     return "DIRECT";
    if (shExpMatch(host, "s-aiplus.aisingroup.com*"))       return "DIRECT";
    if (shExpMatch(host, "test-sts.jpn01.aisingroup.com*")) return "DIRECT";

// FULL Microsoft 365 Email + Teams Whitelist + AISIN Group SSSO
if (

    // -------------------------
    //  Exchange Online (Email)
    // -------------------------
    shExpMatch(host, "*.outlook.com") ||
    shExpMatch(host, "*.outlook.office.com") ||
    shExpMatch(host, "outlook.office365.com") ||
    shExpMatch(host, "*.outlook.office365.com") ||
    shExpMatch(host, "smtp.office365.com") ||
    shExpMatch(host, "autodiscover.outlook.com") ||
    shExpMatch(host, "*.protection.outlook.com") ||

    // -------------------------
    //  Microsoft Teams (Core)
    // -------------------------
    shExpMatch(host, "*.teams.microsoft.com") ||
    shExpMatch(host, "teams.microsoft.com") ||
    shExpMatch(host, "*.teams.cdn.office.net") ||
    shExpMatch(host, "*.skype.com") ||
    shExpMatch(host, "*.lync.com") ||

    // -------------------------
    //  Teams Meetings & Media
    // -------------------------
    shExpMatch(host, "*.msedge.net") ||
    shExpMatch(host, "*.microsoft.com") ||
    shExpMatch(host, "*.svc.ms") ||
    shExpMatch(host, "*.live.com") ||
    shExpMatch(host, "*.sfbassets.com") ||
    shExpMatch(host, "*.akamaized.net") ||
    shExpMatch(host, "*.trafficmanager.net") ||

    // -------------------------
    //  Teams File Sharing (SP/OD)
    // -------------------------
    shExpMatch(host, "*.sharepoint.com") ||
    shExpMatch(host, "*.sharepoint-df.com") ||
    shExpMatch(host, "*.office.com") ||
    shExpMatch(host, "*.office.net") ||
    shExpMatch(host, "*.office365.com") ||
    shExpMatch(host, "*.onmicrosoft.com") ||

    // -------------------------
    //  Authentication (AAD)
    // -------------------------
    shExpMatch(host, "*.login.microsoftonline.com") ||
    shExpMatch(host, "*.msauth.net") ||
    shExpMatch(host, "*.msftauth.net") ||
    shExpMatch(host, "*.microsoftonline.com") ||
    shExpMatch(host, "*.microsoftonline-p.com") ||
    shExpMatch(host, "*.aadcdn.msftauth.net") ||

    // -------------------------
    //  Graph API
    // -------------------------
    shExpMatch(host, "graph.microsoft.com") ||
    shExpMatch(host, "*.graph.microsoft.com") ||

    // -------------------------
    //  CDN
    // -------------------------
    shExpMatch(host, "*.cdn.office.net") ||
    shExpMatch(host, "*.cdn.office365.com") ||
    shExpMatch(host, "*.msocdn.com") ||
    shExpMatch(host, "*.officecdn.microsoft.com") ||

    // -------------------------
    //  Azure / Windows
    // -------------------------
    shExpMatch(host, "*.windows.net") ||
    shExpMatch(host, "*.azureedge.net") ||
    shExpMatch(host, "*.azure.com") ||
    shExpMatch(host, "*.blob.core.windows.net") ||

    // -------------------------
    //  AISIN Group SSSO + Portals
    // -------------------------
    shExpMatch(host, "ap.ssso.hdems.com") ||
    shExpMatch(host, "*.ssso.hdems.com") ||
    shExpMatch(host, "ap01.aisingroup.com") ||
    shExpMatch(host, "*.aisingroup.com") ||
	
	// -------------------------
    //  Dynamics365 FO
    // -------------------------
    shExpMatch(host, "srct-dynamics365-pro.operations.dynamics.com*")
	
) {
    return "DIRECT";
}

// ===== BYPASS IBM MaaS360 =====
if (
    shExpMatch(host, "*.maas360.com") ||
    shExpMatch(host, "maas360.com") ||
    shExpMatch(host, "*.fiberlink.com") ||
    shExpMatch(host, "fiberlink.com") ||
    shExpMatch(host, "*.ibmcloud.com") ||
    shExpMatch(host, "*.bluemix.net") ||
    shExpMatch(host, "*.cloud.ibm.com")
) {
    return "DIRECT";
}

// ===== BYPASS Microsoft Entra ID / M365 Auth / SSO =====
if (
    shExpMatch(host, "login.microsoftonline.com") ||
    shExpMatch(host, "*.login.microsoftonline.com") ||
    shExpMatch(host, "login.live.com") ||
    shExpMatch(host, "*.msauth.net") ||
    shExpMatch(host, "*.msftauth.net") ||
    shExpMatch(host, "*.msftauthimages.net") ||
    shExpMatch(host, "*.aadcdn.microsoftonline-p.com") ||
    shExpMatch(host, "secure.aadcdn.microsoftonline-p.com") ||
    shExpMatch(host, "*.account.microsoft.com") ||
    shExpMatch(host, "*.microsoftonline-p.com") ||
    shExpMatch(host, "*.msedge.net") ||
    shExpMatch(host, "*.microsoft.com") ||
    shExpMatch(host, "*.windows.net") ||
    shExpMatch(host, "*.azure.com") ||
    shExpMatch(host, "*.azureedge.net") ||
    shExpMatch(host, "*.azurefd.net") ||
    shExpMatch(host, "*.graph.microsoft.com") ||
    shExpMatch(host, "graph.microsoft.com")
) {
    return "DIRECT";
}

    // ===== 4) อยู่ใน LAN/VPN บริษัทรึยัง? ใช้ proxy จริง / ถ้ายัง → ยิงทิ้ง =====

    // myIpAddress() = IP ของเครื่องเราเอง
    var myip = myIpAddress();

	// ถ้ามี IP อยู่ในช่วง 10.123.65.0/24 แสดงว่าอยู่ใน LAN
	// หรืออยู่ในช่วง 10.123.123.0/24 แสดงว่าเชื่อมต่อผ่าน VPN
if (isInNet(myip, "10.123.0.0", "255.255.0.0") ||
    isInNet(myip, "10.41.1.0", "255.255.255.0")) {

        // อยู่ในเครือข่ายบริษัท → ไม่ต้องผ่าน proxy เลย
        return "DIRECT";
    }

    // ถ้าไม่ได้อยู่ใน network บริษัท → บังคับไป proxy ปลอม (loopback port 9)
    // ผลคือออกเน็ตนอกไม่ได้
    return "PROXY 127.0.0.1:9";
	
}
