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
log.js contains scripts need to handle log information.
*/

function viewLogs() {

    var body_xml = '<ns1:getLogsRequest xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '</ns1:getLogsRequest>';

    var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "getLogs";
    send("getLogs", body_xml, "", callURL, "", false, viewLogsCallback);

}

function viewLogsCallback() {
    if (!onError()) {
        return;
    }
    var objDiv = document.getElementById("divViewLogs");
    var data = getBody(xhReq.responseXML);
    callbackhelper("viewlog.xsl", objDiv);
    showOnlyOneMain(objDiv, false);
}


function viewSingleLogLevel() {
    var loglevel = document.getElementById("logLevelID");
    var loglevel_index = null;
    var loglevel_value = null;
    if (loglevel != null)
    {
        loglevel_index = loglevel.selectedIndex;
        if (loglevel_index != null) {
            loglevel_value = loglevel.options[loglevel_index].value;
        }
    }
    if (loglevel_value != null && loglevel_value != "") {
        var body_xml = '<ns1:getLogsForSingleLogLevel xmlns:ns1="http://org.apache.synapse/xsd">' +
                       '<type>' + loglevel_value + '</type>' +
                       '</ns1:getLogsForSingleLogLevel>';
        var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "getLogsForSingleLogLevel";
        send("getLogsForSingleLogLevel", body_xml, "", callURL, "", false, searchLogCallback);
    } else {
        return;
    }

}
function submitenter(e)
{
    var keycode;
    if (window.event) {
        keycode = window.event.keyCode;
    }
    else if (e) {
        keycode = e.which;
    }
    if (keycode == 13)
    {
        searchLog();
        return true;
    }
    else {
        return true;
    }
}
function searchLog() {
    var loglevel = document.getElementById("logLevelID");
    var loglevel_index = null;
    var loglevel_value = null;
    if (loglevel != null)
    {
        loglevel_index = loglevel.selectedIndex;
        if (loglevel_index != null) {
            loglevel_value = loglevel.options[loglevel_index].value;
        }
    }
    var keyword = document.getElementById("logkeyword");
    if (keyword != null && keyword != undefined && keyword.value != null && keyword.value != undefined) {
        if (keyword.value == "") {
            viewLogs();
        } else {
            var ignore_case = document.getElementById("ignore_case");
            var ignoreCase = false;
            if (ignore_case != null) {
                if (ignore_case.checked) {
                    ignoreCase = true;
                }
            }
            var body_xml = '<ns1:searchLogRequest xmlns:ns1="http://org.apache.synapse/xsd">' +
                           '<type>' + loglevel_value + '</type>' +
                           '<kerword>' + keyword.value + '</kerword>' +
                           '<ignoreCase>' + ignoreCase.toString() + '</ignoreCase>' +
                           '</ns1:searchLogsRequest>';
            var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "searchLog";
            send("searchLog", body_xml, "", callURL, "", false, searchLogCallback);
        }
    } else {
        return;
    }
}
function searchLogCallback() {
    if (!onError()) {
        return;
    }
    var objDiv = document.getElementById("divViewLogs");
    var data = getBody(xhReq.responseXML);
    var keyword = document.getElementById("logkeyword");
    if (keyword != null && keyword.value != undefined) {
        data.setAttribute("keyword", keyword.value)
    }
    var loglevel = document.getElementById("logLevelID");
    var loglevel_index = null;
    var loglevel_value = null;
    if (loglevel != null)
    {
        loglevel_index = loglevel.selectedIndex;
        if (loglevel_index != null) {
            loglevel_value = loglevel.options[loglevel_index].value;
        }
    }
    if (loglevel_value != null && loglevel_value != "") {
        data.setAttribute("level", loglevel_value)
    }
    var ignore_case = document.getElementById("ignore_case");
    var ignoreCase = false;
    if (ignore_case != null) {
        if (ignore_case.checked) {
            ignoreCase = true;
        }
    }
    data.setAttribute("ignoreCase", ignoreCase.toString());
    var logdiv = document.getElementById("logdiv");
    processXML(data, "viewlog.xsl", objDiv);
    //     showStuffInNewWindow(new XMLSerializer().serializeToString(objDiv));
    showOnlyOneMain(objDiv, false);
}
function clearLogsa() {
    var body_xml = '<ns1:clearLogsRequest xmlns:ns1="http://org.apache.synapse/xsd">' +

                   '</ns1:clearLogsRequest>';

    var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "clearLogs";
    send("clearLogs", body_xml, "", callURL, "", false, clearLogsCallback);
}
function clearLogsCallback() {
    if (!onError()) {
        return;
    }
    var data = getBody(xhReq.responseXML);
    viewLogs();

}