// ================================================================================
// my Progress
function getmyProgress() {
  var i, n, num = 10, s, s1;
  var at1 = 0, at2= 4, bl1 = 0, bl2 = 5, tut1 = 0, tut2 = 10;
  var snum = $("#snum").html(); //, tut = $("#tnum").html();
  var baseurl = $("#baseurl").text();

  var submitData = {
    'snum'   : snum
//    'period' : tut
  };
//console.log("url = " + baseurl + ", tut = " + tut);
  $.ajax({
    type    : 'POST', 
    url     : baseurl + '/getmyProgress',   //'/se0em1/getmyProgress',
    data    : submitData, 
    dataType: 'json', 
    success: function(returnData) {
      if ( ! returnData.success) {
        $('#modal-body').html(returnData.message);
        $('#myModal').modal('show');
      } else {
//        console.log("message = " + returnData.message);

        if(returnData.message) {
          s = '<table class="w3-table w3-striped"><thead><tr class="w3-light-grey"><th>Tutorial</th>';
          s += '<th>Best Mark</th><th>Attempts</th><th>Mean Mark</th><th>&nbsp;</th></tr></thead>';
          $.each(returnData.message, function(index, member) {
            if(index == 0) {
              var obj = JSON.parse(member);
              if(obj.Attendance > 0) { at1 = obj.Attendance; }
              if(obj.OutOf > 0) { at2 = obj.OutOf; }
            } else if(index == 1) {
              var obj = JSON.parse(member);
              bl1 = 0;
              $.each(obj.Baseline, function(bIndex, bMember) {
                if(bMember.Bestmark > 80) { bl1++; }
              });
            } else {
              var obj = JSON.parse(member);
              if(obj.NumTests > 0) { tut1++; }
              s += '<tr><td>' + obj.Name + '</td>';
              s += '<td>' + obj.Mark + '%</td>';
              s += '<td>' + obj.NumTests + '</td>';
              s += '<td>' + obj.Mean + '%</td>';
              if(obj.NumTests > 0) {
//                s += '<td><a href="' + baseurl + 'showtutorial' + obj.Type + '">'; 
                s += '<td><a href="' + 'showtutorial' + obj.Type + '">'; 
                s += '<button class="w3-btn button1"><i class="fa fa-share" aria-hidden="true"></i>';
                s += '</button></a></td></tr>';
              } else {
                s += '<td>&nbsp;</td></tr>';               
              }
            }
          });
          s += '</table><br /><br /><br />';

          s1 = '<table class="w3-table"><tr>';
          if(at1 > 0) {
//console.log(at1 + ", " + at2);
            if(parseInt(at1) > parseInt(at2)) { at1 = parseInt(at2); }
            if(at1 == at2) {
              s1 += '<td class="tdgreen width25">Attendance: ' + at1 + ' / ' + at2 + '</td>';
            } else {
              s1 += '<td class="tdamber width25">Attendance: ' + at1 + ' / ' + at2 + '</td>';
            }
          } else {
            s1 += '<td class="tdred width25">Attendance: ' + at1 + ' / ' + at2 + '</td>';
          }

          if(bl1 > 0) {
            if(bl1 >= bl2) {
              s1 += '<td class="tdgreen width25">Baseline: ' + bl1 + ' / ' + bl2 + '</td>';
            } else {
              s1 += '<td class="tdamber width25">Baseline: ' + bl1 + ' / ' + bl2 + '</td>';
            }
          } else {
            s1 += '<td class="tdred width25">Baseline: ' + bl1 + ' / ' + bl2 + '</td>';
          }

          if(tut1 > tut2) { tut2 = tut1; }
          if(tut1 > 0) {
            if(tut1 >= tut2) {
              s1 += '<td class="tdgreen width25">Tutorials: ' + tut1 + ' / ' + tut2 + '</td>';
            } else {
              s1 += '<td class="tdamber width25">Tutorials: ' + tut1 + ' / ' + tut2 + '</td>';
            }
          } else {
            s1 += '<td class="tdred width25">Tutorials: ' + tut1 + ' / ' + tut2 + '</td>';
          }
          s1 += '<td class="tdred width25">Project</td>';
          s1 += '</tr></table>';
//          console.log(s1);

          $("#myProgress").html(s1 + s);
        }
      }
    },
    error: function() {
      //console.error("error");
      alert('Not working!');
     }
  }); 
}
// ================================================================================
