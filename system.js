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

/*
JS For showHome() method for tracing and others

*/

var GLOBAL_SERVICE_STRING = "__LoginAdmin";
// For the MFUI TODO Make This Generic

var ADMIN_SERVER_URL = "__ServerAdmin";

var SERVER_ADMIN_STRING = ADMIN_SERVER_URL;

var showDivHome = false;
var showDivHomeTimeout;

var showHomeInterval = 0;

var isInitOnMouseUp = false;

function showHomeMenu() {
    //Initial Firing
    showHome();
    /*
    This is the hook we use to initialize the popup boxes
    */
    /*    if (!isInitOnMouseUp) {
        isInitOnMouseUp = true;
        initOnMouseUp();
    }*/
    //    if (showHomeInterval == 0) {
    //        showHomeInterval = setInterval('showHome()', 6000);
    //    }

}

function showHome() {
    var body_xml = ' <ns1:getStatus  xmlns:ns1="http://org.apache.synapse/xsd"/>\n';
    var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "getStatus";
    if (document.getElementById("divHome").style.display == 'none' &&
        showDivHome) {
        showDivHome = false;
        clearInterval(showHomeInterval);
        showHomeInterval = 0;
        // this is to counter if focus to divHome is vanished.
        return false;
    }
    send("getStatus", body_xml, "", callURL, "", false, showHomeCallback);
    document.getElementById('content').style.display='block';
}

function showHomeCallback() {
    stopWaitAnimation();
    if (!onError()) {
        return;
    }
    // hack to double click on the home to come (showDivHome = true;) ruwan
    showDivHome = false;
    callbackhelper("system_status.xsl", document.getElementById("divHome"));
}

function manageSystem() {
    var xsltFileName = "system_info.xsl";
    var body_xml = ' <ns1:getServerData xmlns:ns1="http://org.apache.synapse/xsd"/>\n';
    var callURL = serverURL + "/" + SERVER_ADMIN_STRING ;
    send("getServerData", body_xml, xsltFileName, callURL, document.getElementById("divManageSystem"), false);
}

function stoppingRefreshingMethodsHook() {
    // initializing the showDiv variable
    clearInterval(showHomeInterval);
    showDivHome = false;
    showHomeInterval = 0;
}


