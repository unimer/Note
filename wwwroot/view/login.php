<?php require "header.php"; ?>
    <body>
        <script type="text/javascript" src="../controller/loginController.js">
        </script>

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


        
    </body>

</html>