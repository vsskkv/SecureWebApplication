
<?php
include "Header.php";
include "NavBar.php";
include "Message.php";
?>
<style>
.modal-header {
    padding:9px 15px;
    border-bottom:1px solid #eee;
    background-color: #337AB7;
    color: #FFF;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
 }
 </style>

<div class="container-fluid">
  <div id="content">
    <div class="jumbotron">
      <div class="container">
        <h2><b>App6:</b> Login to see your URIs</h2>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header modal-primary">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h2 class="modal-title">Save URI</h2>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="Category">Category</label>
              <input type="text" class="form-control" id="Category" placeholder="Category">
            </div>

            <div class="form-group">
              <label for="Description">Description</label>
              <input type="text" class="form-control" id="Description" placeholder="Description">
            </div>

            <div class="form-group">
              <label for="URI">URI</label>
              <input type="text" class="form-control" id="URI" placeholder="URI">
            </div>

            <button id="SaveURI" class="btn btn-primary">Save URI</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>  
</div>
<div id='csrf'><?php echo $csrf; ?></div>

<script>
// =============================================================================
var data = <?php echo $data; ?>;
if(data) { renderPage(data); }
// =============================================================================
$('#content').on('click', 'button', function(){
  $('#myModal').modal("show");
});
// =============================================================================
$('#SaveURI').on('click', function(e) {
  e.preventDefault();
  $("#myModal").modal("hide");
  var submitData = {
    'category'    : $('#Category').val(),
    'description' : $('#Description').val(), 
    'uri'         : $('#URI').val(), 
    'csrf_name'   : $("#csrf_name").val(),
    'csrf_value'  : $("#csrf_value").val()
  };
//  console.log(submitData);
  $.ajax({
    type    : 'POST', 
    url     : '<?php echo $router->pathFor("saveuri"); ?>', 
    data    : submitData,
    dataType: 'json', 
    success: function(returnData) {
//      console.log(returnData.responseText);
      renderPage(returnData.responseText);
    },
    error: function(returnData) {
      console.log('ERROR');
      console.log(returnData);
      $('body').html(returnData.responseText);
    }
  }).then(function(data, status, xhr) {
    $('#csrf').html(xhr.getResponseHeader('csrf'));
  }); 
});
// =============================================================================
function renderPage(inData) {
  var i, s;
//console.log(JSON.parse(inData[0]));
  s = '<div style="padding-left:40px;padding-right:40px;">';
  s += '<table class="table table-striped">';
  s += '<tr><td colspan="4">'
  s += '<button type="button" class="btn-success" id="btnSave">Save URI</button>';
  s += '</td></tr>'; 
  s += '<tr><th>Category</th><th>Description</th><th>URI</th><th>Date</th></tr>';

  for(i = 0;i < inData.length; i++) {
    var obj = JSON.parse(inData[i]);
    s += '<tr><th>' + obj.Category + '</th><th>' + obj.Description + '</th><th>';
    s += '<a href="' + obj.URI + '" target="_blank">' + obj.URI + '</a>';
    s += '</th><th>'  + obj.Date + '</th></tr>';
  }
  s += '</table>';
//  console.log(s);
  $('#content').html(s);
}
// =============================================================================
</script>
</body>
</html>

