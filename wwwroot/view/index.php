<?php require "header.php"; ?>
<body id="index">
<script type="text/javascript" src="../controller/indexController.js">
        </script>
<div  class="container">
    <div  class="row">
       
    </div>
</div>


<?php require "login.php"; ?>

<!-- NOTES CONTAINER -->

<div  class="container">
    <div id="notesCanvas" class="row">
    
    </div>
</div>


<!-- NOTE Edit Dialog -->
<!-- The Modal -->
<div class="modal fade" id="noteEditDialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div id="modalHeader" class="modal-header">
          <h5 class="modal-title">Note editor</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
            <div class="form-group">
                <label for="editTitle">Title:</label>
                <input id="editTitle" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="editBody">Body:</label>
                <textArea id="editBody" class="form-control" rows="2"></textarea>
            </div>
            <div class="form-group">
                <label for="editColor">Color:</label>
                <button id="warning-color" type="button" class="btn btn-warning"></button>
                <button id="info-color" type="button" class="btn btn-info"></button>
                <button id="secondary-color" type="button" class="btn btn-secondary"></button>
                <button id="success-color" type="button" class="btn btn-success"></button>
                <button id="danger-color" type="button" class="btn btn-danger"></button>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="editPrivate">
                <label class="form-check-label" for="editPrivate">Private</label>
            </div>   
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button id="save-button" type="button" class="btn btn-success">Save changes</button>
        </div>
        
      </div>
    </div>
  </div>

<script>

</script>

</body>