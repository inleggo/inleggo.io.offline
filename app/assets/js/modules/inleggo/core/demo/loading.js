$(document).ready(function(){
    $( 'body' ).css('overflow', 'hidden');
    $(window).load(function(){
        $( '.sk-double-bounce' ).hide();
        $( '.loading-animation' ).fadeOut('slow');
        $( 'body' ).css('overflow', 'visible');
    });
});
