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


/* folder class */

function folder(path, name, p){

    this.state = COLLAPSED;
    this.path = path; // path is used as an unique id
    this.name = name;
    this.p = p; // prefix used for html ids

    this.write = writeFolder;
    this.add = addFolderChild;
    this.getMatchingChild = getMatchingFolderChild;
    this.folderChildren = new Array();
    this.expand = expandFolder;
    this.collapse = collapseSubFolder;
    this.getState = getSubFolderState;
    this.getType = getTypeFolder;
}

function getSubFolderState() {
    return this.state;
}

function getTypeFolder() {
    return "folder";
}

/**
 Collapse the folder and all its descendants.
 */
function collapseSubFolder() {

    hideFolder(this.path);
    this.state = COLLAPSED;
    var numFolders = this.folderChildren.length;
    for (var i=0;i <numFolders;i++) {
        this.folderChildren[i].collapse();
    }
}

function expandFolder(folder) {

    this.state = EXPANDED;
    var subFolder = this.getMatchingChild(folder);

    if(subFolder != null) {
        showFolder(subFolder.path);
        subFolder.expand(folder);
    }
}

function addFolderChild(child){
    this.folderChildren[this.folderChildren.length] = child;
}

function getMatchingFolderChild(path) {

    var currentMatch = null;

    var numLeaves = this.folderChildren.length;
    for (var j = 0; j < numLeaves; j++) {
        if(path.indexOf(this.folderChildren[j].path) == 0) {
            if(currentMatch == null) {
                currentMatch = this.folderChildren[j];
            } else {
                if(currentMatch.path.length < this.folderChildren[j].path.length) {
                    currentMatch = this.folderChildren[j];
                }
            }
        }
    }

    return currentMatch;
}


function writeFolder(){

    var folderName;
    var fNames = this.path.split("/");
    if(fNames.length == 0) {
        folderName = this.path;
    } else {
        folderName = fNames[fNames.length - 1];
    }

    var expanderImg;
    var folderImg;
    if(this.getState() == EXPANDED) {
        expanderImg = expandedImg.src;
        folderImg = folderopenImg.src;
    } else {
        expanderImg = collapsedImg.src;
        folderImg = foldercloseImg.src;
    }

    var folderString = '<span style="cursor:pointer; cursor:hand; display:normal" ';
    folderString += '><img src=' + expanderImg + ' id="E' + this.p + this.path + '" style="cursor:pointer; cursor:hand; display:normal" ' +
                    'onClick="thisObject.expanderClick(\'' + this.path + '\')"/></span>';

    folderString += '<span id="F' + this.p + this.path + '" style="cursor:pointer; cursor:hand; display:normal" ' +
                    'onClick="thisObject.onFolderClick(\'' + this.path + '\')"';
    //folderString += '><img src=' + folderImg + ' id="FI' + this.path + '"><label style="cursor:pointer; cursor:hand; display:normal" id="l' + this.path + '">' + folderName + '</label></span><br />';
    folderString += '><img src=' + folderImg + ' id="FI' + this.p + this.path + '" /><span style="cursor:pointer; cursor:hand; display:normal" id="l' + this.p + this.path + '"> ' + folderName + '</span></span><br />';

    folderString += '<span style="display:none; margin-left:16px" id="';
    folderString += this.p + this.path + '">';
    var numLeaves = this.folderChildren.length;
    for (var j=0;j<numLeaves;j++)
        folderString += this.folderChildren[j].write();
    folderString += '</span>';

    return folderString;
}
