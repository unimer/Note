
<div class="modal fade" id="loginDialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
          
        <!-- Modal Header -->
        <div id="modalHeader" class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
            
        <div id="errorMessage" style="display:none" class="alert alert-danger alert-dismissible fade show">
            <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
        </div>
        <!-- Modal body -->
        <div class="modal-body">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Username" id="username"><br>
                <input type="password" class="form-control" placeholder="Password" id="password"><br>
            </div>
           
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
            <input type="button" class="btn btn-success" value="Log in" id="login">
            <button type="button" class="btn btn-warning" id="registrationBtn">Registration</button>
        </div>
        
      </div>
    </div>
  </div>

  <script type="text/javascript" src="../controller/loginController.js">
  </script>

<!-- 
    <body>

        <div id="errorMessage" style="display:none" class="alert alert-danger alert-dismissible fade show">
            <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
        </div>

        


        <div class='container'>
            <div class='row'>
                <div class='col'>
                    <input type="text" class="form-control" placeholder="Username" id="username"><br>
                    <input type="password" class="form-control" placeholder="Password" id="password"><br>
                    <input type="button" class="btn btn-success" value="Log in" id="login">
                    <button type="button" class="btn btn-warning" id="registrationBtn">Registration</button>
                </div>
            </div>
        </div>


        
    </body> -->

</html>