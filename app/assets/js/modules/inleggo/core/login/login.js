function userPage(){window.location.href = 'home.html';};
var close_link = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
var xhr = new XMLHttpRequest();
xhr.open('GET', '../app/sqlite/' + localStorage.getItem('db_app') + '.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  var db = new SQL.Database(uInt8Array);
  var stmt = db.prepare("SELECT * FROM app WHERE id = " + localStorage.getItem('iddb'));
  stmt.getAsObject({$start:1, $end:1});
  stmt.bind({$start:1, $end:2});
  output ='<option value=""></option>';
  while(stmt.step()) {
      var row = stmt.getAsObject();
      output += '<option value="' + row.id + '" >' + row.empresa + ' - ' + row.anio +'</option>';

      localStorage.setItem("app_id", row.id);
      localStorage.setItem("app_empresa", row.empresa);
      localStorage.setItem("tipo_empresa", row.tipo_empresa);
      localStorage.setItem("de_empresa", row.de_empresa);
      localStorage.setItem("anio", row.anio);
      localStorage.setItem("db", row.db);
      localStorage.setItem("cliente", row.cliente);
      localStorage.setItem("logo", row.logo);
      localStorage.setItem("jspdf_bien", row.jspdf_bien);
      localStorage.setItem("jspdf_maquinaria", row.jspdf_maquinaria);
      localStorage.setItem("jspdf_vehiculo", row.jspdf_vehiculo);
      localStorage.setItem("formato_bien_1", row.formato_bien_1);
      localStorage.setItem("formato_maquinaria_1", row.formato_maquinaria_1);
      localStorage.setItem("formato_vehiculo_1", row.formato_vehiculo_1);
      localStorage.setItem("formato_bien_2", row.formato_bien_2);
      localStorage.setItem("formato_maquinaria_2", row.formato_maquinaria_2);
      localStorage.setItem("formato_vehiculo_2", row.formato_vehiculo_2);
      localStorage.setItem("formato_bien_3", row.formato_bien_3);
      localStorage.setItem("formato_maquinaria_3", row.formato_maquinaria_3);
      localStorage.setItem("formato_vehiculo_3", row.formato_vehiculo_3);
      localStorage.setItem("activo", row.activo);
      localStorage.setItem("tiempo", row.tiempo);
      localStorage.setItem("costo", row.costo);
      localStorage.setItem("adelanto", row.adelanto);
      localStorage.setItem("modelo", row.modelo);
      localStorage.setItem("limite_cap", row.limite_cap);
      localStorage.setItem("cod_def", row.cod_def);
      localStorage.setItem("cod_maxlength_inv", row.cod_maxlength_inv);
      localStorage.setItem("cod_inv_type", row.cod_inv_type);
      localStorage.setItem("cod_maxlength_inv_1", row.cod_maxlength_inv_1);
      localStorage.setItem("cod_inv_type_1", row.cod_inv_type_1);
      localStorage.setItem("cod_loc_def_1", row.cod_loc_def_1);
      localStorage.setItem("cod_maxlength_inv_2", row.cod_maxlength_inv_2);
      localStorage.setItem("cod_inv_type_2", row.cod_inv_type_2);
      localStorage.setItem("cod_loc_def_2", row.cod_loc_def_2);
      localStorage.setItem("cod_maxlength_inv_3", row.cod_maxlength_inv_3);
      localStorage.setItem("cod_inv_type_3", row.cod_inv_type_3);
      localStorage.setItem("cod_loc_def_3", row.cod_loc_def_3);
      localStorage.setItem("cod_maxlength_inv_4", row.cod_maxlength_inv_4);
      localStorage.setItem("cod_inv_type_4", row.cod_inv_type_4);
      localStorage.setItem("cod_loc_def_4", row.cod_loc_def_4);
      localStorage.setItem("cod_barra_type", row.cod_barra_type);
      localStorage.setItem("cod_maxlength_barra", row.cod_maxlength_barra);
      localStorage.setItem("cod_sbn", row.cod_sbn);
      localStorage.setItem("cod_placa_negra", row.cod_placa_negra);
      localStorage.setItem("cod_loc_def", row.cod_loc_def);
      localStorage.setItem("captura_auto", row.captura_auto);
      localStorage.setItem("captura_date", row.captura_date);
      localStorage.setItem("inv_electrico", row.inv_electrico);
      localStorage.setItem("year_last", row.year_last);
      localStorage.setItem("cod_inv_lasted", row.cod_inv_lasted);
      localStorage.setItem("cod_inv_last", row.cod_inv_last);
      localStorage.setItem("cod_inv_last_1", row.cod_inv_last_1);
      localStorage.setItem("cod_inv_last_2", row.cod_inv_last_2);
      localStorage.setItem("cod_inv_last_3", row.cod_inv_last_3);
      localStorage.setItem("user_db_temp", row.user_db_temp);
      localStorage.setItem("pass_db_temp", row.pass_db_temp);
      localStorage.setItem("server_img", row.server_img);
      localStorage.setItem("fecha_inicio_c", row.fecha_inicio_c);
      localStorage.setItem("fecha_fin_c", row.fecha_fin_c);
      localStorage.setItem("d_tecnica", row.d_tecnica);
  }
  $(".selectServer").html(output);
  $(".selectServer").select2();
};
xhr.send();


$(document).ready(function(){
    var server ="";

    $(".frm-login > form").submit(function(){
        $('button').prop('disabled', true);
        $("#resp-ajax").hide();
        $('#resp-ajax').html('<i class="fa fa-spinner fa-pulse"></i> Comprobando').slideDown();
        var $data = "";
        $data = $(this).serialize();
        var server = $("#server").val();
        var dnilogin = $("#dnilogin").val();
        var paslogin = Sha1.hash($("#paslogin").val());

        console.log("SHA1: "+ paslogin);

        xhr.open('GET', '../app/sqlite/' + localStorage.getItem('in_db') + '.sqlite', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e) {
            var userId = "";
            var uInt8Array = new Uint8Array(this.response);
            var db = new SQL.Database(uInt8Array);
            var stmt = db.prepare("SELECT * FROM user WHERE dni ='" + dnilogin + "' AND password='" + paslogin + "'");

            stmt.getAsObject({$start:1, $end:1});
            stmt.bind({$start:1, $end:2});

            while(stmt.step()) {
                var row = stmt.getAsObject();
                localStorage.setItem("userId", row.id);
                localStorage.setItem("userNombre", row.nombre);
                localStorage.setItem("userPaterno", row.paterno);
                localStorage.setItem("userMaterno", row.materno);
                localStorage.setItem("userEmail", row.email);
                localStorage.setItem("userMovil", row.movil);
                localStorage.setItem("userFijo", row.fijo);
                localStorage.setItem("userTipo", row.tipo);
                localStorage.setItem("userActivo", row.activo);
                localStorage.setItem("userOnline", row.online);
                userId = row.id;
                userActive = row.activo;
                userOnline = row.online;
                console.log(row.nombre);
            }

            if(userId!="" && userActive=='1'){
                //-----------------------------
                    var stmt2 = db.prepare("SELECT nombre FROM tipo_user WHERE id='" + localStorage.getItem('userTipo') + "'");
                    stmt2.getAsObject({$start:1, $end:1});
                    stmt2.bind({$start:1, $end:2});
                    while(stmt2.step()) {
                        var row2 = stmt2.getAsObject();
                        localStorage.setItem("userTipoNombre", row2.nombre);
                    }
                //-----------------------------
                titleApp = '<a href="#" class="linkIN" data-page="home"> <span class="text-lg text-bold text-primary ucase"><i class="md md-whatshot"></i> INLEGGO.IO ' + localStorage.getItem('app_empresa') + ' - ' + localStorage.getItem('anio') + '</span> </a>';
                localStorage.setItem("titleApp", titleApp);
                localStorage.setItem("page", 'home');
                console.log('Logeado');
                $('#resp-ajax').removeClass("alert-danger");
                $('#resp-ajax').addClass("alert-success");
                $('#resp-ajax').html(close_link + 'Bienvenido, espere un momento.');
                $('#resp-ajax').slideDown();
                $("html").delay(1799).fadeOut(1200);
                setTimeout(window.location.href = 'home.html', 2000);
            }else{
                console.log('No logeado');
                $('#resp-ajax').removeClass("alert-success");
                $('#resp-ajax').addClass("alert-danger");
                $('#resp-ajax').html(close_link + 'Usuario no registrado!');
                $('#resp-ajax').slideDown();
                $('button').prop('disabled', false);
                $('input').val('');
                $('input#dnilogin').focus();
            }

        };
        xhr.send();
        return(false);
    });
    $("#resp-ajax").hide();
    
});
