$('#menu').click(function () {
    $('.sidebarBackground').fadeIn(500);
    $('.sidebarContent').css('margin-left','0');
    $('body').css('overflow','hidden');
});
$('.sidebarBackground').click(function(){
    $('.sidebarBackground').fadeOut(500);
    $('.sidebarContent').css('margin-left','calc(-60% - 2px)');
    $('body').css('overflow','scroll');
})