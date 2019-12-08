$('#menu').click(function () {
    $('.sidebarBackground').fadeIn(500);
    $('.sidebarContent').css('margin-left','0');
});
$('.sidebarBackground').click(function(){
    $('.sidebarBackground').fadeOut(500);
    $('.sidebarContent').css('margin-left','-1001px');
})