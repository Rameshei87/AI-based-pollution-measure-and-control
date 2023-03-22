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

var midiator_add_items;

// Get some methods from main.js to work
var serviceURL;


var SERVICE_CONTEXT = "/soap";
var SESSION_COOKIE_NAME = "JSESSIONID";
var COOKIE_SESSION_MANAGEMENT = true;

var SYNAPSE_NS = "http://ws.apache.org/ns/synapse";

function init() {
    URL = locationString.substring(0, locationString.lastIndexOf('/'));

    defaultURL = URL;

    if (URL.indexOf('https') == -1) {
        //	esbwarning("You can only access the management console through https. \n The default https port for WSO2 ESB is " + httpsPort + ".", TYPE_WARN);
        var newURL = "https" + URL.substring(URL.indexOf('://'), URL.lastIndexOf(':') + 1) + httpsPort;
        var httpsAlertText =
                "You can only access the management console over https. <br/> The default https port for WSO2 ESB is " + httpsPort + "." +
                "<br/> If the default settings have not been changed the management console can be accessed using the following URL.<br/>" +
                "<a href='" + newURL + "'>" + newURL + "</a>";
        alertInternal(httpsAlertText, WARNING_MESSAGE);

        //	alertWarning(newURL);
        //	browser.redirect(newURL);
    }

    admIndex = URL.lastIndexOf('/admin');
    if (admIndex != -1) {
        URL = URL.substring(0, URL.lastIndexOf('/admin'));
    }

    // Service URL parsing
    serverURL = URL + SERVICE_CONTEXT;
    serviceURL = serverURL;


    if (getCookie("userName") != null) {
        serviceGroupId = getCookie("serviceGroupId");
        userName = getCookie("userName");
        finishLogin();
    } else {
        document.formLogin.txtUserName.focus();
    }

    XSLTHelper.init();
}

////////////////////////////////////////////////////////////////////////////////////////////

function loadXML(xmlFile) {
    var xmlDoc;
    try {
        xmlDoc = document.implementation.createDocument("", "", null);
        xmlDoc.load(xmlFile);
    } catch (e) {

    }

    return xmlDoc;
}

/* This function needed to get the onError() working */
function stopRefreshingDivsEventListenerHook() {
}




/** A function that is called whenever the user
 presses the back or forward buttons. This
 function will be passed the newLocation,
 as well as any history data we associated
 with the location. */
function handleHistoryChange(newLocation,
                             historyData) {
    var actDivName = newLocation.substring(3, newLocation.length);
    // This is done to stop the screen from jumping about.
    eval("showOnlyOneMain(document.getElementById('" + actDivName + "'), true)");
    // lastHash from mf_ui; main.js
    lastHash = newLocation;
}
function transformationWithoutHistory(xslFile, objDiv) {
    var data = getBody(xhReq.responseXML);
    processXML(data, xslFile, objDiv);
    showOnlyOneMain(objDiv, true);

}