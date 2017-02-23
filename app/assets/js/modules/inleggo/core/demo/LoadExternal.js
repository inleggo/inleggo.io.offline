var pathApp = "/app/";
var pathDomain = pathApp+"domain/";
var pathPresentation = pathApp+"presentation/";
var pathOperations   = pathDomain+"operations/";
var pathTag = pathPresentation+"html5/site/tags/";
var pathJson = pathPresentation+"html5/site/json/";
var loadDiv = '<div class="text-center"><i class="fa fa-5x fa-cog fa-spin text-accent-dark"></i></div>';
var close_link = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
Highcharts.setOptions({
    lang: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'junio',  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        shortMonths: ['Ene' , 'Feb' , 'Mar' , 'Abr' , 'May' , 'Jun' , 'Jul' , 'Ago' , 'Set' , 'Oct' , 'Nov' , 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
    }
});
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};
function nCaptura(tam, num) {
    if (num.toString().length <= tam){
        return nCaptura(tam, "0" + num);
    }
    else{
        return num;
    }
};
function fechaFormat_1(fecha){
    mes = fecha.substr(5,2);
    dia = fecha.substr(8,2);
    anho = fecha.substr(0,4);

    fecha = dia+" / "+mes+" / "+anho;
    return fecha;
};
function graphBarEstadoInventario(sobrantes,justificados,faltantes,conciliados_bc,conciliados){
            $('#estado_inv').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Base Contable', 'Base Inventario']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Estados'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [
            {
                name: 'Sobrantes',
                data: [0, sobrantes]
            },
            {
                name: 'Justificados',
                data: [justificados, 0]
            },
            {
                name: 'Faltantes',
                data: [faltantes, 0]
            },
            {
                name: 'Conciliados',
                data: [conciliados_bc, conciliados]
            }
            ]
        });
};
function lineGraphDigitacionUso(){
    $.getJSON(pathDomain+"ws/json/mod/digitacion-uso.php?code=1", function (data) {

        $('#digitadores_uso').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Digitación'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ' items'
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Digitación',
                data: data
            }]
        });
    });
};


/* load json OffCanvas */
    var dataInv_ = $.ajax({'url': pathDomain+"ws/json/mod/offcanvas-left.php?code=1", 'dataType': "json"});

    function UpdateOffCanvasEstInv(dataInv_,reload){
        var _class="";
        if(reload=="reload"){
            var dataReload = $.ajax({'url': pathDomain+"ws/json/mod/offcanvas-left.php?code=1", 'dataType': "json"});
            dataInv_ = dataReload;
        }
        dataInv_.done(function(data){
            $.each(data, function(i, field){
                _class = "._" + i;
                $(_class).html(field);
            });
        });
    };

    function UpdateOffCanvasEstInvWithGraphUser(){
        var _class="";
        var dataInv_ = $.ajax({'url': pathDomain+"ws/json/mod/offcanvas-left.php?code=1", 'dataType': "json"});
        dataInv_.done(function(data){
            $.each(data, function(i, field){
                _class = "._" + i;
                $(_class).html(field);
            });
            $conciliados_bc = parseFloat(data.total_conciliados_base_contable.replace(/,/,""));
            $conciliados    = parseFloat(data.conciliados.replace(/,/,""));
            $sobrantes      = parseFloat(data.sobrantes.replace(/,/,""));
            $faltantes      = parseFloat(data.faltantes.replace(/,/,""));
            $justificados   = parseFloat(data.justificados.replace(/,/,""));
            graphBarEstadoInventario($sobrantes,$justificados,$faltantes,$conciliados_bc,$conciliados);
        });
        lineGraphDigitacionUso();
    };
/* load selects */
    function loadSelect(id,url,code,code2){
        $('#'+id).html('');
        $.get(pathTag + url + ".php", { code: code, code2: code2 },
        function(data){
            $('#'+id).html(data);
            $('#'+id).find('select').select2();
        }
    )};

    function loadSelect3(id,url,code,code2,code3){
        $('#'+id).html('');
        $.get(pathTag + url + ".php", { code: code, code2: code2, code3: code3 },
        function(data){
            $('#'+id).html(data);
            $('#'+id).find('select').select2();
        }
    )};

    function loadSelectCustom(id,url,code){
        $('#'+id).html('');
        $.get(pathTag + url + ".php", { code: code},
        function(data){
            $('#'+id).html(data);
            $('#'+id).find('select').select2();
        }
    )};

    function loadSubSelect(id,select,url){
        var code = $('#'+select).find('select').val();
        $('#'+id).html('');
        $.get(pathTag + url + ".php", { code: code },
        function(data){
            $('#'+id).html(data);
            $('#'+id).find('select').select2();
        }
    )};

    function clearSelect(id, required){
        var select="<select class='form-control select2-list'  data-placeholder='Seleccione' "+ required +"><option value=''></option></select>";
        $('#'+id).html(select);
        $('#'+id).find('select').select2();
      /*  $('#'+id).find('select').prop('disabled', true);*/
    };

    function loadSedes(id,select,url){
        var code = $('#'+select).find('select').val();
        $('#'+id).html(loadDiv).slideDown();
        $.get(pathTag + url + ".php", { code: code})
          .done(function( data ) {
            $(this).ajaxComplete(function(event, request, settings){
                $('#'+id).html('');
                $('#'+id).html(data).slideDown();
                $('#'+id).clearQueue().stop();
                });
        });
    };

    function loadDivTab(id,url,code){
        $('#'+id).html(loadDiv).slideDown();
        $.get(pathTag + url + ".php", { code: code})
          .done(function( data ) {
            $('#'+id).html('');
            $('#'+id).html(data).slideDown();
            $('#'+id).clearQueue().stop();
            $('#'+id).finish();
        });
    };

    function loadDivTab2(id,url,code,code2){
        $('#'+id).html(loadDiv).slideDown();
        $.get(pathTag + url + ".php", { code: code, code2: code2 })
          .done(function(data) {
            $('#'+id).html('');
            $('#'+id).html(data).slideDown();
            $('#'+id).clearQueue().stop();
            $('#'+id).finish();
        });
    };

    function loadDivTab3(id,url,code){
        $.get(pathTag + url + ".php", { code: code})
          .done(function( data ) {
            $('#'+id).html(data);
            $('#'+id).clearQueue().stop();
            $('#'+id).finish();
            $("#resultado_item").css("display", "none !important");
            $("#resultado_item").hide();
        });
    };

    function agregarItemsAcaptura(url,code,code2){
        $.get(pathTag + url + ".php", { code: code, code2: code2 })
          .done(function( data ) {
            $(this).ajaxComplete(function(event, request, settings){
                window.location.href = "/item/nuevo";
                });
        });
    };

/* send ajax */
function SendAjax(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                $(_form).find("input:text").val('');
                $(_form).find("#email").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax captura*/
function SendAjaxCaptura(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                window.location.href = "/item/nuevo";

            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
    });
};

function SendAjaxUpdateCaptura(_form,_form2,_resp,_msg_success,_url, _1, _2 , _3 , _4){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                /*$('#'+_1).html('');*/
                if($num == 1){
                    loadDivTab2(_1, _2 , _3 , _4);
                };
                $num = 2;
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form2).slideDown();
                $(_form).hide();
                $(_form).clearQueue().stop();
                $(_form).finish();
                $(_1).clearQueue().stop();
                $(_1).finish();

            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_form2).hide();
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return(false);
    });
};

function SendAjaxDeleteCaptura(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $("#form_resultado_captura").hide();
                $("#editar_captura").html('');
                $("#form_busqueda_captura").slideDown();
                $(_resp).slideDown();
                $(_form).clearQueue().stop();
                $(_form).finish();

            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return(false);
    });
};

function SendGerencia(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("gerencia_e","select.gerencia","","");
                    loadSelect("gerencia_d","select.gerencia","","");
                };
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendArea(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("gerencia_n","select.gerencia","","");
                    loadSelect("gerencia_e","select.gerencia","","");
                    loadSelect("gerencia_d","select.gerencia","","");
                    clearSelect('area_e','required');
                    clearSelect('area_d','required');
                };
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendEquipo(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("gerencia_n","select.gerencia","","");
                    loadSelect("gerencia_e","select.gerencia","","");
                    loadSelect("gerencia_d","select.gerencia","","");
                    clearSelect('area_n','required');
                    clearSelect('area_e','required');
                    clearSelect('area_d','required');
                    clearSelect('equipo_e','required');
                    clearSelect('equipo_d','required');
                };
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
}

function SendSede(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("localidad_e","select.localidad","","");
                    loadSelect("localidad_d","select.localidad","","");
                    loadSelect("departamento_n","select.departamento","","");
                    clearSelect('provincia_n','required');
                    clearSelect('distrito_n','required');
                    $(_form).find("input:text").val('');
                    $(_form).find("input").removeClass("dirty");
                    $(".oculto").slideUp();
                }
                $num = 2;
                
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendLocal(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("localidad_n","select.localidad","","");
                    loadSelect("localidad_e","select.localidad","","");
                    loadSelect("localidad_d","select.localidad","","");
                    clearSelect('local_e','required');
                    clearSelect('local_d','required');
                }
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendAmbiente(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("localidad_n","select.localidad","","");
                    loadSelect("localidad_e","select.localidad","","");
                    loadSelect("localidad_d","select.localidad","","");
                    loadSelect("piso_n","select.piso","","");
                    loadSelect("piso_e","select.piso","","");
                    loadSelect("piso_d","select.piso","","");
                    clearSelect('local_n','required');
                    clearSelect('local_e','required');
                    clearSelect('local_d','required');
                    clearSelect('ambiente_e','required');
                    clearSelect('ambiente_d','required');
                }
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendUsuarioInv(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("usuario_inv_e","select.usuario_inv","","");
                    loadSelect("usuario_inv_d","select.usuario_inv","","");
                    $("#nombre_n, #nombre_e, #dni_e").val("");
                    $("#nombre_n, #nombre_e, #dni_e").removeClass("dirty");
                }
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function SendProyecto(_form,_resp,_msg_success,_url){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadSelect("proyecto_e","select.proyecto","","");
                    loadSelect("proyecto_d","select.proyecto","","");
                    $("#nombre_n").val("");
                    $("#nombre_e").val("");
                };
                $num = 2;
                $(_form).find("input:text").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax item*/
function SendAjaxItem(_form,_resp,_msg_success,_url,tipo){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    var $num = 1;
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        //$(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num ==1){
                    UpdateOffCanvasEstInv(null,'reload');
                }
                $num = 2;
                $(_form).find("input").val('');
                $(_form).find("textarea").val('');
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).find("input").removeClass("dirty");
                /* cargar selects otra ves */
                $("#color").find("select").select2("data", { id: 0, text: "Seleccione" });
                $("#material").find("select").select2("data", { id: 0, text: "Seleccione" });
                $("#situacion").find("select").select2("data", { id: 0, text: "Seleccione" });
                $("#año").find("select").select2("data", { id: 0, text: "" });
                $("#sbn").find("select").select2("data", { id: 0, text: "Ninguno" });
                $(_form).hide();
                $("#form_result_item").hide();
                $("#form_busqueda_item").slideDown();
                $("#codigo_bien").val("");
                $("#codigo_bien").focus();
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        //});
    });
};

/* send ajax item delete*/
function SendAjaxItemDelete(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    var $num = 1;
    $("#btn-modal-eliminar").prop("disabled", true);
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num ==1){
                    UpdateOffCanvasEstInv(null,'reload');
                }
                $num = 2;
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $("#resultado_item, .card-head .tools").hide();
                $("#form_busqueda_item").slideDown();
                $("#codigo_bien").val("");
                $("#codigo_bien").focus();
                $(_resp).slideDown();
                $(_form).clearQueue().stop();
                $(_form).finish();
            }
            else{
                $("#btn-modal-eliminar").prop("disabled", false);
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax item change captura*/
function SendAjaxItemChangeCaptura(_form,_resp,_msg_success,_url,subpage2,subpage3){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadDivTab2("resultado_item","div.info.busqueda.item",subpage2,subpage3);
                };
                $num = 2;
                $(_form).find("button").prop("disabled", false);

                $("#editar_item, #form_busqueda_item").hide();
                $("#resultado_item").slideDown();
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).clearQueue().stop();
                $(_form).finish();
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax item update*/
function SendAjaxItemUpdate(_form,_resp,_msg_success,_url,subpage2,subpage3){
    var $num = 1;
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                if($num == 1){
                    loadDivTab2("resultado_item","div.info.busqueda.item",subpage2,subpage3);
                };
                $num = 2;
                $(_form).find("button").prop("disabled", false);
                $("#editar_item, #form_busqueda_item").hide();
                //$("#resultado_item").slideDown();
                $_h = $("#resultado_item .card-body").height() + 50;
                $("#resultado_item").height($_h);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
                $(_form).clearQueue().stop();
                $(_form).finish();
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax item conciliar*/
function SendAjaxItemConciliar(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    var $num = 1;
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        if(msg == 'ok'){
            if($num ==1){
                    UpdateOffCanvasEstInv(null,'reload');
            }
            $num = 2;
            loadDivTab2("result_busqueda_item","vacio","","");
            $("#cod_inv_lasted, #base_contable").val("");
            $("#cod_inv_lasted").focus();
            $(_resp).removeClass("alert-danger");
            $(_resp).addClass("alert-success");
            $(_resp).html(close_link + $_message_ok);
            $(_resp).slideDown();
        }
        else{
            $(_form).find("button").prop("disabled", false);
            $(_resp).removeClass("alert-success");
            $(_resp).addClass("alert-danger");
            $(_resp).hide();
            $(_resp).html(msg);
            $(_resp).slideDown();
        };
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

/* send ajax item conciliar*/
function SendAjaxItemDesconciliar(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    var $num = 1;
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        if(msg == 'ok'){
            if($num ==1){
                    UpdateOffCanvasEstInv(null,'reload');
            }
            $num = 2;
            loadDivTab2("result_busqueda_item","vacio","","");
            $("#cod_inv_lasted").val("");
            $("#cod_inv_lasted").focus();
            $(_resp).removeClass("alert-danger");
            $(_resp).addClass("alert-success");
            $(_resp).html(close_link + $_message_ok);
            $(_resp).slideDown();
        }
        else{
            $(_form).find("button").prop("disabled", false);
            $(_resp).removeClass("alert-success");
            $(_resp).addClass("alert-danger");
            $(_resp).hide();
            $(_resp).html(msg);
            $(_resp).slideDown();
        };
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};
/* reportes por sedes */
function loadSedes(id,select,url){
    $('#'+id).slideUp();
    var code = $('#'+select).find('select').val();
    $('#'+id).html(loadDiv).slideDown();
    $.get(pathTag + url + ".php", { code: code},
    function(data){
        $('#'+id).html(data).slideDown();
    }
)};

/* Eliminar imágen de ítem */
function deleteImgitem(code,code2,code3,code4,div){
    var res = "";
    $.post($_url, { code: code, code2: code2, code3: code3, code4: code4 })
    .done(function( data ) {
        $(this).ajaxComplete(function(event, request, settings){
            res="ok";
            $(div).hide();
            $("#resultado_item").css("display", "none !important");
            $("#resultado_item").hide();
        });
    });
    return res;
};

/* eliminar documento */
function SendAjaxDeleteDoc(_id,_url, div){
    var $num =1;
    $_url= pathDomain+"document/"+ _url +".php";
    $.post($_url, { id_doc: _id})
        .done(function( data ) {
            $(this).ajaxComplete(function(event, request, settings){
                if($num ==1){
                    UpdateOffCanvasEstInv(null,'reload');
                }
                $num = 2;
                $(div).hide();
                $(this).clearQueue().stop();
                $(this).finish();
                });
    });
};

/* publico documento */
function SendAjaxUpdatePublic(_id,_url,_num,_tag){
    $_url= pathDomain+"operations/"+ _url +".php";
    $.post($_url, { id_doc: _id})
        .done(function( data ) {
            $(this).ajaxComplete(function(event, request, settings){
                if(_num==1){
                    $(_tag).removeClass("fa-eye-slash").addClass("fa-eye");
                }else{
                    $(_tag).removeClass("fa-eye").addClass("fa-eye-slash");
                }
                $(_tag).clearQueue().stop();
                $(_tag).finish();
                $(this).clearQueue().stop();
                $(this).finish();
                });
    });
};

function SendAjaxUpdate(_form,_resp,_msg_success,_url){
    if($(_resp).is(':visible')){
        $(_resp).slideUp();
    }
    $_message_ok = _msg_success;
    $_data = $(_form).serialize();
    $_url= pathDomain+"operations/"+ _url +".php";
    $(_form).find("button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $_url,
      data: $_data
    }).done(function(msg){
        $(_form).ajaxComplete(function(event, request, settings){
            if(msg == 'ok'){
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-danger");
                $(_resp).addClass("alert-success");
                $(_resp).html(close_link + $_message_ok);
                $(_resp).slideDown();
            }
            else{
                $(_form).find("button").prop("disabled", false);
                $(_resp).removeClass("alert-success");
                $(_resp).addClass("alert-danger");
                $(_resp).hide();
                $(_resp).html(msg);
                $(_resp).slideDown();
            }
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
};

function LoadGraphHomeUser(){
    dataInv_.done(function(data_){
        $conciliados_bc = parseFloat(data_.total_conciliados_base_contable.replace(/,/,""));
        $conciliados    = parseFloat(data_.conciliados.replace(/,/,""));
        $sobrantes      = parseFloat(data_.sobrantes.replace(/,/,""));
        $faltantes      = parseFloat(data_.faltantes.replace(/,/,""));
        $justificados   = parseFloat(data_.justificados.replace(/,/,""));
        graphBarEstadoInventario($sobrantes,$justificados,$faltantes,$conciliados_bc,$conciliados);

    });
};

function LoadAudio(src, title){
    var audio = $("#audioModalAudio");
    $("#mp3_src").attr("src", src);
    audio[0].pause();
    audio[0].load();
    $("#titleAudio").html(title);
    /*audio[0].oncanplaythrough = audio[0].play();*/
}

UpdateOffCanvasEstInv(dataInv_,'none');

$(function() {
    $("#menu-in").click(function(){
        $.getJSON( pathOperations + "menu-in.php", function( json ) {
            /*console.log( "JSON Data: " + json.menu );*/
        });
        return(false);
    });
});

