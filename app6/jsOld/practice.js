
/* getTest
1. Check whether there are any tests in localStorage. If there are several show them so the user can selecte which one otherwise open the test.
2. If there are no tests get the next test for this user from the server. The test is saved on the server and in localStorage.
3. Save answers in localStorage as user moves on to the next question, logs out or every 5 minutes.
4. When the user submits his/her answers upload answers to the server. When that's successful clear the test from local storage
*/
var qcount = 0;
// ================================================================================
function getEntryLevelPracticeQuestions(inNum) {
  var submitData = {
    'snum': $("#snum").html(),
    'pnum': inNum
  };

  $.ajax({
    type    : 'POST', 
    url     : $("#baseurl").html() + '/getEntryLevelPracticeQuestions', 
    data    : submitData, 
    dataType: 'json', 
    success : OnSuccess,
    error   : OnError
  });

  function OnSuccess(returnData) {
    console.log(returnData);
    if(returnData.success) {
      var obj = JSON.parse(returnData.message);
      var s1, s = '<form id="PracticeForm"><table>';

      s1 = formatJSONTutorialQuestion(0, obj);
      if(s1.indexOf("ERROR") > 0) {
        console.log(s1);
      } else {
        s += s1;
      } 
      s += '</table>';
//      s += '<input type="hidden" name="qcount" id="qcount" value="' + qcount + '" />';
      s += '<button id="submit" type="submit" onclick="submitJSONAnswers(event); return false;" ';
      s += 'class="btn btn-success">Submit my answers</button>';
      s += '<br /><br /><br /><br /></form>';
//  console.log(s);
      $("#questions").html(s);
    } else {
      alert("ERROR: Failed to get questions.")
    } 
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }

  function OnError(returnData) {
    console.log(returnData);
    alert('Not working!');
  }
}
// ================================================================================
