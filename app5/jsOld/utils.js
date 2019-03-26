// ================================================================================
// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
// ================================================================================
function getBaselineData(inName) {
  if(typeof(Storage) !== "undefined") { return localStorage.getItem(inName); } 
  else { alert("Sorry, your browser does not have local storage."); }
}
// ================================================================================
function saveBaselineData(inName, inStr) {
  if(typeof(Storage) !== "undefined") { localStorage.setItem(inName, inStr); } 
  else { alert("Sorry, your browser does not have local storage."); }
}
// ================================================================================
function clearBaselineData(inName) {
  if(typeof(Storage) !== "undefined") { localStorage.removeItem(inName); } 
  else { alert("Sorry, your browser does not have local storage."); }
}
// ================================================================================
function callLogin(username, password) {
  var s1, target = getBaselineData("BaselineTarget");

  if(s.length > 5) {
    clearBaselineData("BaselineToken");
//    s1 = CryptoJS.SHA256(s);
//    $("#password").val("");
    var submitData = {
      'user'  : username,
      'pass'  : password,
      'target': target
    };
console.log("submitData: " + ", " + submitData['user'] + ", " + submitData['pass'] + ", " + submitData['target']);
    $.ajax({
      type    : 'POST', 
      url     : 'login', 
      data    : submitData, 
      dataType: 'json', 
      success : OnSuccess,
      error   : OnError
    });

    function OnSuccess(returnData) {
      console.log(returnData);
/*      if(returnData.message === "User OK") {
        saveBaselineData("BaselineToken", returnData.token);
        clearBaselineData("BaselineTarget");
        $("#login").hide(); 
        $("#logout").show(); 

        $("#navbar").show();
        $("#footer").show();
        $("#content").html(returnData.view);
      } else {
        alert("ERROR: Failed to login.")
      } */
    }

    function OnError(returnData) {
      console.log(returnData);
      alert('Not working!');
    } 
  }
}

//https://www.youtube.com/watch?v=mlETEjtFDu0
//https://www.youtube.com/watch?v=l2cBT8--7tA

// ================================================================================
function callaLogin() {
  var guid = getBaselineData("BaselineGuid"), 
    target = getBaselineData("BaselineTarget");

  if(!guid) { guid = getGuid(); }
  
  var submitData = {
    'user'  : guid,
    'pass'  : 'Anonymous',
    'target': target
  };
console.log("submitData: " + ", " + submitData['user'] + ", " + submitData['pass'] + ", " + submitData['target']);

  $.ajax({
    type    : 'POST', 
    url     : 'login', 
    data    : submitData, 
    dataType: 'json', 
    success : OnSuccess,
    error   : OnError
  });

  function OnSuccess(returnData) {
    console.log(returnData);
    if(returnData.message) {
      if(returnData.message === "User OK") {
        saveBaselineData("BaselineToken", returnData.token);
        clearBaselineData("BaselineTarget");
        if(returnData.target) {
          console.log("Go to " + returnData.target);
          window.location.replace(returnData.target);
        } else {
          console.log("Go home");
          window.location.replace("./");
        }
      }
    }
  }

  function OnError(returnData) {
    console.log(returnData);
    alert('Not working!');
  }
}
// ================================================================================
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function getGuid() {
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  saveBaselineData("BaselineGuid", guid);
  return guid;
}
// ================================================================================