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
tracer.js handles script related to tracing SOAP messages at server side.
*/


function viewTraceLogs() {
    var body_xml = '<ns1:getTraceLogsRequest xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '</ns1:getTraceLogsRequest>';

    var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "getTraceLogs";
    send("getTraceLogs", body_xml, "", callURL, "", false, viewTraceLogsCallback);

}

function viewTraceLogsCallback() {
    if (!onError()) {
        return;
    }
    var objDiv = document.getElementById("divTracer");
    var data = getBody(xhReq.responseXML);
    callbackhelper("viewtracelogs.xsl", objDiv);
    showOnlyOneMain(objDiv, false);
}

function clearTraceLogsa() {
    var body_xml = '<ns1:clearTraceLogsRequest xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '</ns1:clearTraceLogsRequest>';

    var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "clearTraceLogs";
    send("clearTraceLogs", body_xml, "", callURL, "", false, clearTraceLogsCallback);
}
function clearTraceLogsCallback() {
    if (!onError()) {
        return;
    }
    var data = getBody(xhReq.responseXML);
    viewTraceLogs();

}
function searchTrace() {
    var keyword = document.getElementById("tracekeyword");
    if (keyword != null && keyword != undefined && keyword.value != null && keyword.value != undefined) {
        if (keyword.value == "") {
            viewTraceLogs();
        } else {
            var ignore_case = document.getElementById("ignore_case");
            var ignoreCase = false;
            if (ignore_case != null) {
                if (ignore_case.checked) {
                    ignoreCase = true;
                }
            }
            var body_xml = '<ns1:searchTraceLogRequest xmlns:ns1="http://org.apache.synapse/xsd">' +
                           '<kerword>' + keyword.value + '</kerword>' +
                           '<ignoreCase>' + ignoreCase.toString() + '</ignoreCase>' +
                           '</ns1:searchTraceLogRequest>';
            var callURL = serverURL + "/" + SERVER_ADMIN_STRING + "/" + "searchTraceLog";
            send("searchTraceLog", body_xml, "", callURL, "", false, searchTraceCallback);
        }
    } else {
        return;
    }
}
function searchTraceCallback() {
    if (!onError()) {
        return;
    }
    var objDiv = document.getElementById("divTracer");
    var data = getBody(xhReq.responseXML);
    var keyword = document.getElementById("tracekeyword");
    if (keyword != null && keyword.value != undefined) {
        data.setAttribute("keyword", keyword.value)
    }
    var ignore_case = document.getElementById("ignore_case");
    var ignoreCase = false;
    if (ignore_case != null) {
        if (ignore_case.checked) {
            ignoreCase = true;
        }
    }
    data.setAttribute("ignoreCase", ignoreCase.toString());
    var logdiv = document.getElementById("tracelogdiv");
    processXML(data, "viewtracelogs.xsl", objDiv);
    showOnlyOneMain(objDiv, false);
}
function submitentertrace(e)
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
        searchTrace();
        return true;
    }
    else {
        return true;
    }
}