var findAPITries = 0;
 
function findAPI(win)
{
   // Check to see if the window (win) contains the API
   // if the window (win) does not contain the API and
   // the window (win) has a parent window and the parent window
   // is not the same as the window (win)
   while ( (win.API == null) && (win.parent != null) && (win.parent != win) )
   {
      // increment the number of findAPITries
      findAPITries++;
 
      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7)
      {
         alert("Error finding API -- too deeply nested.");
         return null;
      }
 
      // set the variable that represents the window being
      // being searched to be the parent of the current window
      // then search for the API again
      win = win.parent;
   }
   return win.API;
}

function SCORMinitialize(){
	if (API){
		var ret;
		
		ret = API.LMSInitialize('');
		
		console.log('LMSInitialize: ' + ret);
		

		return ret;
	}
}

function SCORMdoLMSCommit(){
	if (API){
		API.LMSCommit('');
		
		console.log('LMSCommit ' + ret);
	}
};

function SCORMgetStudentName(){
	var name;
	
	if (API){
		name = "" + SCORMdoLMSGetValue( "cmi.core.student_name" ) + "";
		console.log('Student Name: ' + name);
		
		if (name.length === 0 || name === undefined){
			name = "Alex Banker";
		} else {
			var lnfirst = name.substring(name.indexOf(" ") + 1, name.length);
			var lnlast = name.substring(0, name.indexOf(","));
			name = lnfirst + " " + lnlast;
		}
	} else {
		name = "Alex Banker";
	}
	return name;
}

function SCORMstatuscheck(){
	var status;
	if (API){
		status = "" + SCORMdoLMSGetValue( "cmi.core.lesson_status" ) + "";
		console.log('LMS Lesson Status: ' + status);
	
		if (status === "not attempted"){
	
		} else {
	
		}
	} else {
		status = "not attempted";
	}
	
	completionstatus = status;
	return status;
};

function SCORMdoLMSGetValue(param){
	var ret;
	
	if (API){
		ret = API.LMSGetValue(param);
	} else {
		ret = null;
	}
	
	console.log('LMS Get Value ' + param + ': ' + ret);
	
	return ret;
}

function SCORMsetValue(param, val){
	if (API){
		API.LMSSetValue(param, val);
	}
	
	console.log('LMS Setting ' + param + ": " + val);
}

function SCORMdoLMSFinish(){
	if (API){
		API.LMSFinish('');
	}
};

function getAPI()
{
   // start by looking for the API in the current window
   var theAPI = findAPI(window);
 
   // if the API is null (could not be found in the current window)
   // and the current window has an opener window
   if ( (theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined") )
   {
      // try to find the API in the current window’s opener
      theAPI = findAPI(window.opener);
   }
   // if the API has not been found
   if (theAPI == null)
   {
      // Alert the user that the API Adapter could not be found
      //alert("Unable to find an API adapter");
   }
   return theAPI;
}

var API = getAPI();
console.log("finding API ... found ", API);

var completionstatus;