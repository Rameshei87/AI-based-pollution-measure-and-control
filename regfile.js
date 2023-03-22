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

/* regfile class */

function regfile(path, name, p){
    this.state = EXPANDED;
    this.path = path; // path is used as an unique id
    this.name = name;
    this.p = p; // prefix used for html ids
    this.write = writeFile;
    this.add = addFileChild;
    this.getMatchingChild = getMatchingFileChild;
    this.expand = expandFile;
    this.collapse = collapseFile;
    this.getState = getFileState;
    this.getType = getTypeFile;
}

function getFileState() {
    return this.state;
}

function getTypeFile() {
    return "file";
}

/**
 Collapse the folder and all its descendants.
 */
function collapseFile() {

}

function expandFile(folder) {

}

function addFileChild(child){

}

function getMatchingFileChild(path) {

    if (path.indexOf(this.path) == 0) {
        return this;
    } else {
        return null;
    }
}


function writeFile(){

    var folderName;
    var fNames = this.path.split("/");
    if(fNames.length == 0) {
        folderName = this.path;
    } else {
        folderName = fNames[fNames.length - 1];
    }

    expanderImg = expandedImg.src;

    var fileString = '<span style="cursor:pointer; cursor:hand; display:normal" ';
    fileString += '><img src=' + expanderImg + ' id="E' + this.p + this.path + '" style="cursor:pointer; cursor:hand; display:normal"/></span>';

    fileString += '<span id="F' + this.p + this.path + '" style="cursor:pointer; cursor:hand; display:normal" ' +
                    'onClick="thisObject.onFolderClick(\'' + this.path + '\')"';
    fileString += '><img src='+ fileImg.src + '><span style="cursor:pointer; cursor:hand; display:normal" id="l' + this.p + this.path + '">' + folderName + '</span></span><br />';

    fileString += '<span style="display:none; margin-left:16px" id="';
    fileString += this.p + this.path + '"></span>';

    //showStuffInNewWindow(folderString);
    return fileString;
}
