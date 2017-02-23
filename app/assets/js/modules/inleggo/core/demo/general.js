var close_link = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
function loadPage(){
    console.clear();
    $.get('pages/' + localStorage.getItem('page') + '.html').success(function(data){
        $('#content').html(data);
    });
}
$(function () {
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
