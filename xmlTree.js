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
Trees Navigator
*/

var openImg = new Image();
openImg.src = "extensions/core/images/tree_opened.gif";
var closedImg = new Image();
closedImg.src = "extensions/core/images/tree_closed.gif";

var finallyUsedDiv;

function showTreeBranch(objMainDiv, objImg, txProtocolName, serverID) {
    if (objMainDiv == null && objImg == null && txProtocolName == null) {
        // this is used as the callback
        if (!onError()) {
            return;
        }
        //custom transformation
        treeBranchTransformer("statistics/statistics.xsl", finallyUsedDiv);

        return true;

    }
    // create new div obj
    swapFolder(objImg, objMainDiv, txProtocolName, serverID);

}

function showTreeBranchForSynapseService(objMainDiv, objImg, txProtocolName, serverID) {
    if (objMainDiv == null && objImg == null && txProtocolName == null) {
        // this is used as the callback
        if (!onError()) {
            return;
        }
        //custom transformation
        treeBranchTransformer("statistics/statistics.xsl", finallyUsedDiv);

        return true;

    }
    // create new div obj
    swapFolder(objImg, objMainDiv, txProtocolName, serverID);

}


function showServerTree(objMainDiv, objImg, serverID) {
    if (objMainDiv == null && objImg == null) {
        // this is used as the callback
        if (!onError()) {
            return;
        }
        //custom transformation
        treeBranchTransformer("statistics/serverstatistics.xsl", finallyUsedDiv);

        return true;

    }
    // create new div obj
    swapServer(objImg, objMainDiv, serverID);

}
function swapServer(objImg, objMainDiv, serverID) {
    if (objImg.src.indexOf('tree_closed.gif') > -1) {
        objImg.src = openImg.src;
        var newObjDiv = document.createElement('div');
        finallyUsedDiv = newObjDiv;
        objMainDiv.appendChild(newObjDiv);
        showServersInTree(serverID);

    }
    else {
        objImg.src = closedImg.src;
        //removed the
        var genObjDiv = objMainDiv.getElementsByTagName('div')[0];
        objMainDiv.removeChild(genObjDiv);
    }
    shouldRefesh = 1;
}
function showTree(objMainDiv, objImg, txProtocolName, serverID, type) {
    if (objMainDiv == null && objImg == null && txProtocolName == null) {
        // this is used as the callback
        if (!onError()) {
            return;
        }
        //custom transformation
        treeBranchTransformer("statistics/commonstatistics.xsl", finallyUsedDiv);

        return true;

    }
    // create new div obj
    swap(objImg, objMainDiv, txProtocolName, serverID, type);

}
function swap(objImg, objMainDiv, txProtocolName, serverID, type) {
    if (objImg.src.indexOf('tree_closed.gif') > -1) {
        objImg.src = openImg.src;
        var newObjDiv = document.createElement('div');
        finallyUsedDiv = newObjDiv;
        objMainDiv.appendChild(newObjDiv);
        showStatisticsIntree(txProtocolName, type);

    }
    else {
        objImg.src = closedImg.src;
        //removed the
        var genObjDiv = objMainDiv.getElementsByTagName('div')[0];
        objMainDiv.removeChild(genObjDiv);
    }
    shouldRefesh = 1;
}
function swapFolder(objImg, objMainDiv, txProtocolName, serverID) {

    if (objImg.src.indexOf('tree_closed.gif') > -1) {

        objImg.src = openImg.src;
        var newObjDiv = document.createElement('div');
        finallyUsedDiv = newObjDiv;
        objMainDiv.appendChild(newObjDiv);
        getServiceSumary(txProtocolName, serverID);

    }
    else {
        objImg.src = closedImg.src;
        //removed the
        var genObjDiv = objMainDiv.getElementsByTagName('div')[0];
        objMainDiv.removeChild(genObjDiv);
    }
    shouldRefesh = 1;
}

//Privately own method
function treeBranchTransformer(xsltFile, objDiv) {
    var data = getBody(xhReq.responseXML);
    processXML(data, xsltFile, objDiv);
    shouldRefesh = 1;
}

