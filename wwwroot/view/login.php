<?php require "header.php"; ?>
    <body>
        <div id="errorMessage" style="display:none" class="alert alert-danger alert-dismissible fade show">
            <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
        </div>
        <form method="post" action="login">
            <input type="text" id="username"><br>
            <input type="password" id="password"><br>
            <input type="button" value="Log in" id="login">
        </form>
        
        
      

        <script type="text/javascript" src="../controller/loginController.js">
        </script>
        
    </body>

</html>