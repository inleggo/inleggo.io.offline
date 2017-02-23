<?php
/*
  #Alerts
  #Desarrollado por Joseph Urbina
 */
header('Content-Type: application/javascript');
ini_set('display_errors', 'Off');
ini_set('display_errors', 0);
if (!isset($_SESSION)) {session_start();}
if ( $_SESSION['token_in'] == "enabled" ){
    if(isset($_SESSION['alert_pass'])){
        $alert_pass = $_SESSION['alert_pass'];
    }else{
        $alert_pass = 2;
    }

?>
    toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "333",
          "hideDuration": "333",
          "timeOut": "4000",
          "extendedTimeOut": "4000",
          "showEasing": "swing",
          "hideEasing": "swing",
          "showMethod": "slideDown",
          "hideMethod": "slideUp"
    };
    $(document).ready(function(){
        var alert_pass = <?= $alert_pass?>;
        function alertPass(){
            toastr.warning('Actualize su contraseña','Alerta de seguridad')
        }
        if(alert_pass==1){
            alertPass();
        };
    });
<?php
}else{
    header('HTTP/1.0 403 Forbidden');
    die('Forbidden');
}
?>