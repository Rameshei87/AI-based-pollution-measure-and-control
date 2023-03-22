/*
 *  Copyright (c) 2005-2008, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

var CONFIG_MANAGEMENT = "__ConfigAdmin";

function showSaveConfig() {
    var body_xml = '<ns1:getConfiguration xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '</ns1:getConfiguration>';
    var callURL = serverURL + "/" + CONFIG_MANAGEMENT + "/" + "getConfiguration";
    send("getConfiguration", body_xml, "", callURL, "", false, showSaveConfigCallback);
}

function showSaveConfigCallback() {
    if (!onError()) {
        return;
    }
    callbackhelper("save_config.xsl", document.getElementById("divSaveConfig"));
    var data = getBody(xhReq.responseXML);

    if (browsername.indexOf(NETSCAPE_BROWSER_NAME) != -1) {
        document.getElementById("rawConfig").value = getNodeFromPath("return", data).textContent;
    } else if (browsername.indexOf(IE_BROWSER_NAME) != -1) {
        document.getElementById("rawConfig").value = getNodeFromPath("return", data).text;
    }
    document.getElementById("rawConfig").style.cursor = "text";
}

function saveConfigurationToDisk() {
    var theString = document.getElementById("rawConfig").value;
    var isXml = isValidXml(theString);
    if (!isXml) {
        return;
    }
    var body_xml = '<ns1:saveConfigurationToDisk xmlns:ns1="http://org.apache.synapse/xsd"/>\n';
    var callURL = serverURL + "/" + CONFIG_MANAGEMENT + "/" + "saveConfigurationToDisk" ;
    send("saveConfigurationToDisk", body_xml, "", callURL, "", false, saveConfigCallback);
    return false;
}

function saveConfigCallback() {
    if (!onError()) {
        return;
    }
    callbackhelper("save_config.xsl", document.getElementById("divSaveConfig"));
}

function updateConfiguration() {
    var theString = document.getElementById("rawConfig").value;
    var isXml = isValidXml(theString);
    if (!isXml) {
        return;
    }
    var body_xml = '<ns1:updateConfiguration xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '<ns1:configElement>' + theString + '</ns1:configElement>' +
                   '</ns1:updateConfiguration>';
    var callURL = serverURL + "/" + CONFIG_MANAGEMENT + "/" + "updateConfiguration";
    send("updateConfiguration", body_xml, "", callURL, "", false, updateConfigurationCallback);
}

function updateConfigurationCallback() {
    if (!onError()) {
        return;
    }
    showSaveConfig();
}

