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
 
var LOG_ADMIN = "__LogAdmin";

function showLogConfig() {
    var bodyXml = '<ns1:getLogConfig xmlns:ns1="http://org.apache.synapse/xsd">' +
                   '</ns1:getLogConfig>';
    var callUrl = serverURL + "/" + LOG_ADMIN + "/" + "getLogConfig";
    send("getLogConfig", bodyXml, "", callUrl, "", false, showLogConfigCallback);
}

function showLogConfigCallback() {
    if (!onError()) {
        return;
    }
    callbackhelper("log_config.xsl", document.getElementById("divLogConfig"));
}

function saveLogConfig() {
    var bodyXml = '<ns1:saveLogConfig xmlns:ns1="http://org.apache.synapse/xsd">' +
                    '<ns1:logConfig>' + 
                        document.getElementById("logConfigTextArea").value +
                    '</ns1:logConfig>' +    
                  '</ns1:saveLogConfig>';
    var callUrl = serverURL + "/" + LOG_ADMIN + "/" + "saveLogConfig";
    send("saveLogConfig", bodyXml, "", callUrl, "", false, saveLogConfigCallback);
}

function saveLogConfigCallback() {
    if (!onError()) {
        return;
    }
    showLogConfig();
}

function updateLogConfig() {
    var bodyXml = '<ns1:updateLogConfig xmlns:ns1="http://org.apache.synapse/xsd">' +
                    '<ns1:logConfig>' + 
                        document.getElementById("logConfigTextArea").value +
                    '</ns1:logConfig>' +    
                  '</ns1:updateLogConfig>';
    var callUrl = serverURL + "/" + LOG_ADMIN + "/" + "updateLogConfig";
    send("updateLogConfig", bodyXml, "", callUrl, "", false, updateLogConfigCallback);
}

function updateLogConfigCallback() {
    if (!onError()) {
        return;
    }
}

function changeLogConfigLevel(logger, callback) {
    var loglevel = document.getElementById(logger);
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
	    var bodyXml = '<ns1:changeLogConfigLevel xmlns:ns1="http://org.apache.synapse/xsd">' +
	                    '<ns1:logger>' + logger + '</ns1:logger>' +
	                    '<ns1:level>' + loglevel_value + '</ns1:level>' +    
	                  '</ns1:changeLogConfigLevel>';
	    var callUrl = serverURL + "/" + LOG_ADMIN + "/" + "changeLogConfigLevel";
	    
    } else {
        return;
    }
    
    send("changeLogConfigLevel", bodyXml, "", callUrl, "", false, callback);    
}


function changeLogConfigLevelRoot() {
    changeLogConfigLevel("loggerRoot", changeLogConfigLevelRootCallback);
}

function changeLogConfigLevelRootCallback() {
    if (!onError()) {
        return;
    }
}


function changeLogConfigLevelService() {
    changeLogConfigLevel("loggerService", changeLogConfigLevelServiceCallback);
}

function changeLogConfigLevelServiceCallback() {
    if (!onError()) {
        return;
    }
}


function changeLogConfigLevelTrace() {
    changeLogConfigLevel("loggerTrace", changeLogConfigLevelTraceCallback);
}

function changeLogConfigLevelTraceCallback() {
    if (!onError()) {
        return;
    }
}




