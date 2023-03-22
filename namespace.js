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

/**
 * This js file is for namespace editor
 */

var namespaceURI;
var prefix;
var dataHTML = "";
var mediatiorPosition;
var mediatorAttribute;
var changeinputID;
var existingns = " ";

function showNameSpaceEditor(position, attribute, inputID) {
    mediatiorPosition = position;
    mediatorAttribute = attribute;
    changeinputID = inputID;
    var divcontrol = document.getElementById("divNamespaceEditor");
    divcontrol.innerHTML = "";

    var finalHTML = getDataHTML(getnestedmediator(internalmodel.sequence, mediatiorPosition));

    //If no attribute is passed here apply button is not displayed
    var applyHTML = "";

    if(mediatorAttribute != ""){
       applyHTML = "<td><input type='button' class='panelbutton_default' value='Apply' onclick='javascript:applyNamespace()'></td>"; 
    }

    var panelcontrol = document.createElement("div");
    panelcontrol.setAttribute("id", "myPanel");
    panelcontrol.innerHTML = "<div class='hd'><div class='tl'></div><span>WSO2-ESB Namespace Editor</span>"
            + "<div class='tr'></div></div>"
            + "<div class='bd'><div id='namespaceEditor' style='max-height:400px; overflow-x:hidden; overflow-y:auto;'>"
            + "<div id='common_table_content'><span>Existing Namespace Declarations</span>"
	        + "<table border='0' cellpadding='0' cellspacing='0'>"
	 		+ "<tr><th>Select</th><th>Prefix</th><th>URL</th></tr>"
            + finalHTML
			+ "<tr></table></div>"
            + "<table style='margin-left:40px;'><tr>" + applyHTML + "<td><input type='button' class='panelbutton_default' value='New' "
            + "onclick='javascript:showAddNamespace()'></td>"
            + "<td><input type='button' class='panelbutton_default' value='Edit' onclick='javascript:showEditNamespace()'></td>"
            + "<td><input type='button' class='panelbutton_cancel' value='Delete' onclick='javascript:deleteNamespace()'></td>"
            + "<td><input type='button' class='panelbutton_cancel' value='Close' onclick='javascript:closeEditNamespace()'></td></tr></table></div></div>" 
            + "<div id='statusbar' class='ft'>Namespace Editor</div>";

    divcontrol.appendChild(panelcontrol);
    panelcontrol.style.zIndex = 3;
    var esbpanel = new YAHOO.widget.Panel("myPanel", { width:"600px", fixedcenter:true, visible:false,
        constraintoviewport:true });
    divcontrol.style.display = "inline";
    esbpanel.render();
    esbpanel.show();
    existingns = " ";

}

function getDataHTML(mediator) {
    if (mediator != undefined && mediator != null && mediator.attributes != null && mediator.attributes != undefined) {
        dataHTML = "";
        var attrs = mediator.attributes;
        for (var i = 0; i < attrs.length; i++) {
            if(attrs[i].name != null && attrs[i].name != undefined && attrs[i].name != "" && attrs[i].name.indexOf("xmlns:") == 0 && existingns.indexOf(" " + attrs[i].name + " ") == -1) {
                existingns += attrs[i].name + " ";
                prefix = (attrs[i].name).substring(((attrs[i].name).indexOf(":")+1));
                dataHTML += "<tr><td><input id=" + prefix + " name='select' type='radio'></td><td id=p" + prefix + ">" + prefix + "</td><td id=n" + prefix + ">" + attrs[i].value + "</td></tr>";
            }
        }
        if(mediator.parentNode.nodeName.substring(mediator.parentNode.nodeName.indexOf(":") + 1, mediator.parentNode.nodeName.length) == "return" || mediator.nodeName.substring(mediator.nodeName.indexOf(":") + 1, mediator.nodeName.length) == "definition") {
            existingns = "";
            return dataHTML;
        } else {
            return  dataHTML + getDataHTML(mediator.parentNode);
        }
    } else {
        existingns = "";
        return "";
    }

}

function showAddNamespace() {
    var divcontrol = document.getElementById("divAddNamespace");
    divcontrol.innerHTML = "";
    var panelcontrol = document.createElement("div");
    panelcontrol.setAttribute("id", "myPanel2");
    panelcontrol.innerHTML = "<div class='hd'><div class='tl'></div><span>Add Namespace</span><div class='tr'></div></div>"
            + "<div class='bd'><div id='addPanel' style='height:90px; overflow-x:hidden; overflow-y:hidden; margin-top:10px;'>"
            + "<table><tr><td>Prefix</td><td><input id='prefix' type='text' class='esb-edit' style='width: 80px;'/></td></tr>"
            + "<tr><td>URI</td><td><input id='uri' type='text' class='esb-edit'/></td></tr>"
            + "<tr><td colspan='2'></td></tr><tr><td></td>"
            + "<td><input type='button' class='panelbutton_default' value='Add' onclick='javascript:addNamespace()'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<input type='button' class='panelbutton_cancel' value='Cancel' onclick='javascript:hideAddNamespace()'/></td></tr></table>"
            + "</div></div><div id='statusbar' class='ft'>Add Namespace</div>";
    divcontrol.appendChild(panelcontrol);
    panelcontrol.style.zIndex = 3;
    var esbpanel = new YAHOO.widget.Panel("myPanel2", { width:"400px", fixedcenter:true, visible:false,
        constraintoviewport:true });
    divcontrol.style.display = "inline";
    esbpanel.render();
    esbpanel.show();

}

function hideAddNamespace() {
    document.getElementById("divAddNamespace").innerHTML = "";
}

function addNamespace() {
    var mediator = getnestedmediator(internalmodel.sequence, mediatiorPosition);
    var prefix = document.getElementById("prefix");
    var uri = document.getElementById("uri");

    if(prefix.value != "" && uri.value != ""){
        mediator.setAttribute("xmlns:" + prefix.value, uri.value);
        hideAddNamespace();
        showNameSpaceEditor(mediatiorPosition, mediatorAttribute, changeinputID);
    }else{
        esbwarning("Empty values are not allowed for the URI or namespace prefix", TYPE_WARN);
    }
}

function applyNamespace() {
    var declarations = document.getElementsByName("select");
    var currentPrefix = "";
    for (var i = 0; i < declarations.length; i++) {
        if (declarations[i].checked) {
            currentPrefix = declarations[i].id;
        }
    }
    if(currentPrefix != ""){
        var mediator = getnestedmediator(internalmodel.sequence, mediatiorPosition);
        var currnetAttValue = document.getElementById(changeinputID).value;
        mediator.removeAttribute(mediatorAttribute);
        var newAttValue = currentPrefix + ':' + currnetAttValue.substring(currnetAttValue.indexOf(':') + 1);
        mediator.setAttribute(mediatorAttribute, newAttValue);
        document.getElementById(changeinputID).value = newAttValue;
        var divcontrol = document.getElementById("divNamespaceEditor");
        divcontrol.innerHTML = "";
    }else{
        esbwarning("No namespace selected", TYPE_INFO);
    }
}

function showEditNamespace() {

    //Get selected Namespace
    var currentPrefix = "";
    var declarations = document.getElementsByName("select");
    for (var i = 0; i < declarations.length; i++) {
        if (declarations[i].checked) {
            currentPrefix = declarations[i].id;
        }
    }

    if(currentPrefix == "") {
        esbwarning("Namespace not selected", TYPE_WARN);
        return;
    }

    //Check is Editable
    var mediator = getnestedmediator(internalmodel.sequence, mediatiorPosition);
    var attributes = mediator.attributes;
    var isEditable = false;
    var removeAttribute = "xmlns:" + currentPrefix;
    for (var i = 0; i < attributes.length; i++) {
        if (removeAttribute == attributes[i].name) {
            isEditable = true;
        }
    }

    //If editable show Edit panel
    if (isEditable) {
        var currPrefix = document.getElementById("p" + currentPrefix).innerHTML;
        var currURI = document.getElementById("n" + currentPrefix).innerHTML;
        var divcontrol = document.getElementById("divAddNamespace");
        divcontrol.innerHTML = "";
        var panelcontrol = document.createElement("div");
        panelcontrol.setAttribute("id", "myPanel2");
        panelcontrol.innerHTML = "<div class='hd'><div class='tl'></div><span>Edit Namespace</span><div class='tr'></div></div>"
                + "<div class='bd'><div id='addPanel' style='height:90px; overflow-x:hidden; overflow-y:hidden; margin-top:10px;'>"
                + "<table><tr><td>Prefix</td><td><input id='prefix' type='text' value= '" + currPrefix + "' class='esb-edit' style='width:80px;' /></td></tr>"
                + "<tr><td>URI</td><td width='100'><input id='uri' type='text' value= '" + currURI + "' class='esb-edit' /></td></tr>"
                + "<tr><td colspan='2'></td></tr>"
                + "<tr><td></td><td><input type='button' class='panelbutton_default' value='Save' onclick=editNamespace('"+currURI+"','"+currPrefix+"') />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                + "<input type='button' class='panelbutton_cancel' value='Cancel' onclick='javascript:hideAddNamespace()'/></td></tr></table>"
                + "</div></div><div id='statusbar' class='ft'>Namespace Editor</div>";
        divcontrol.appendChild(panelcontrol);
        panelcontrol.style.zIndex = 3;
        var esbpanel = new YAHOO.widget.Panel("myPanel2", { width:"400px", fixedcenter:true, visible:false,
            constraintoviewport:true });
        divcontrol.style.display = "inline";
        esbpanel.render();
        esbpanel.show();
    } else {
        esbwarning("Cannot edit namespaces declarations of parent elements", TYPE_WARN);
    }

}

function editNamespace(uri, prefix) {
    //collect Edited Values
    var newPrefix = document.getElementById("prefix").value;
    var newURI = document.getElementById("uri").value;
    var removeAttribute = "xmlns:" + prefix;

    //Remove Attributes
    var mediator = getnestedmediator(internalmodel.sequence, mediatiorPosition);
    mediator.removeAttribute(removeAttribute);
    var newAttribute = "xmlns:" + trim(newPrefix);
    
    mediator.setAttribute(newAttribute ,trim(newURI));

    hideAddNamespace();
    showNameSpaceEditor(mediatiorPosition, mediatorAttribute, changeinputID);
}

function deleteNamespace() {
    var mediator = getnestedmediator(internalmodel.sequence, mediatiorPosition);

    //Get selected Namespace Declaration
    var declarations = document.getElementsByName("select");
    var currentPrefix = "";
    for (var i = 0; i < declarations.length; i++) {
        if (declarations[i].checked) {
            currentPrefix = declarations[i].id;
        }
    }

    if(currentPrefix == "") {
        esbwarning("Namespace not selected", TYPE_WARN);
        return;
    }

    //Check if the namespace is deleteable
    var isDeleteable = false;
    var removeAttribute = "xmlns:" + currentPrefix;
    var attributes = mediator.attributes;
    for (var i = 0; i < attributes.length; i++) {
        if (removeAttribute == attributes[i].name) {
            isDeleteable = true;
        }
    }

    //delete the namespace
    if (isDeleteable) {
        var currPrefix = document.getElementById("p" + currentPrefix).innerHTML;
        mediator.removeAttribute("xmlns:" + currPrefix);
        showNameSpaceEditor(mediatiorPosition, mediatorAttribute, changeinputID);
    } else {
        esbwarning("Cannot edit namespace declarations of parent elements", TYPE_WARN);
    }
}

function showNamespaceButton(position, attribute,inputID, cellID, shouldShow){

    var Buttoncell = document.getElementById(cellID);

    if(shouldShow == "true"){
        Buttoncell.innerHTML = "<a title='Namespace Editor' onclick=showNameSpaceEditor('"+position+"','"+attribute+"','"+inputID+"') class='ns_editor'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
    }else{
       Buttoncell.innerHTML ="";
    }
}

function closeEditNamespace(){
    document.getElementById("divNamespaceEditor").innerHTML="";
}

function showNamespaceButtonForProperties(position, typeID, cellID){
 
    var typeElement = document.getElementById(typeID + position);
    var type = typeElement[typeElement.selectedIndex].value;
    var Buttoncell = document.getElementById(cellID + position);

    if(type == "expression"){
       Buttoncell.innerHTML = "<a title='Namespace Editor' onclick=showNameSpaceEditor('"+position+"','','') class='ns_editor'>&nbsp;&nbsp;&nbsp;&nbsp;</a>";
    }else{
       Buttoncell.innerHTML ="";
    }
}

function isDeclared(mediator,currentPrefix){
  if (mediator != undefined && mediator != null && mediator.attributes != null && mediator.attributes != undefined) {
        var attrs = mediator.attributes;
        for (var i = 0; i < attrs.length; i++) {
            if(attrs[i].name != null && attrs[i].name != undefined && attrs[i].name != "" && attrs[i].name.indexOf("xmlns:") == 0 && existingns.indexOf(" " + attrs[i].name + " ") == -1) {
                prefix = (attrs[i].name).substring(((attrs[i].name).indexOf(":")+1));
                if(currentPrefix==prefix){
                    return true;
                }
            }
        }
        if(mediator.parentNode.nodeName.substring(mediator.parentNode.nodeName.indexOf(":") + 1, mediator.parentNode.nodeName.length) == "return" || mediator.nodeName.substring(mediator.nodeName.indexOf(":") + 1, mediator.nodeName.length) == "definition") {
            return false;
        } else {
            return  isDeclared(mediator.parentNode,currentPrefix);
        }
    } else {
        return false;
    }
}