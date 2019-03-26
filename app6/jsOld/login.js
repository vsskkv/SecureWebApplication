
function callLogin(username, password) {
  var s1, target = getBaselineData("BaselineTarget");

  if(s.length > 5) {
  	clearBaselineData("BaselineToken");
//    s1 = CryptoJS.SHA256(s);
//    $("#password").val("");
    var submitData = {
      'user'  : $("#username").val(),
      'pass'  : s1.toString(),
      'target': target
    };
console.log("submitData: " + ", " + submitData['user'] + ", " + submitData['pass'] + ", " + submitData['target']);
/*    $.ajax({
      type    : 'POST', 
      url     : '/mybaseline/login', 
      data    : submitData, 
      dataType: 'json', 
      success : OnSuccess,
      error   : OnError
    });

    function OnSuccess(returnData) {
      if(returnData.message === "User OK") {
        saveBaselineData("BaselineToken", returnData.token);
        clearBaselineData("BaselineTarget");
        $("#login").hide(); 
        $("#logout").show(); 

        $("#navbar").show();
        $("#footer").show();
        $("#content").html(returnData.view);
      } else {
        alert("ERROR: Failed to login.")
      }
    }

    function OnError(returnData) {
      console.log(returnData);
      alert('Not working!');
    } */
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
    url     : '/mybaseline/login', 
    data    : submitData, 
    dataType: 'json', 
    success : OnSuccess,
    error   : OnError
  });

  function OnSuccess(returnData) {
    console.log(returnData);
    if(returnData.message.indexOf("User OK") > -1) {
      saveBaselineData("BaselineToken", returnData.token);
      clearBaselineData("BaselineTarget");
      $("#login").hide(); 
      $("#logout").show(); 

      $("#navbar").show();
      $("#footer").show();
      $("#content").html(returnData.view);

    }
  }

  function OnError(returnData) {
    console.log(returnData);
    alert('Not working!');
  }
}
// ================================================================================