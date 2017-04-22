var close_link = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
function loadPage(){
    console.clear();
    $.get('pages/' + localStorage.getItem('page') + '.html').success(function(data){
        $('#content').html(data);
    });
};
function maximize(){
  const win = require('electron').remote.getCurrentWindow();
  win.maximize();
  $("#unmaximize").show();
  $("#maximize").hide();
  return(false);
};
function unmaximize(){
  const win = require('electron').remote.getCurrentWindow();
  win.unmaximize();
  $("#unmaximize").hide();
  $("#maximize").show();
  return(false);
};
function minimize(){
  const win = require('electron').remote.getCurrentWindow();
  win.minimize();
  return(false);
};
function pad (n, length) {
    var  n = n.toString();
    while(n.length < length){
        n = "0" + n;
    }
    return n;
};
$(function () {
  $("#unmaximize").hide();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh');
    });
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tab"], [data-toggle="pill"]').tab();
})
$(document).ready(function() {
    $("#resp-ajax").hide();
    $(".linkIN").click(function(){
        localStorage.setItem("page", $(this).data('page'));
        loadPage();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return(false);
    });
});
