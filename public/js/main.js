var sidebar = false
$('.menuButton').click(function () {
    if(!sidebar){
        $('body').css('overflow','hidden')
        $('.sidebarBackground').fadeIn(500)
        $('.sidebarContent').css('margin-left','0')
        sidebar = !sidebar
    }else{
        $('.sidebarBackground').fadeOut(500)
        $('.sidebarContent').css('margin-left','calc(-60% - 2px)')
        $('body').css('overflow','scroll')
        sidebar = !sidebar
    }
})
$('.sidebarBackground').click(function(){
    $('body').css('overflow','scroll')
    $('.sidebarBackground').fadeOut(500)
    $('.sidebarContent').css('margin-left','calc(-60% - 2px)')
    sidebar = !sidebar
})

var cartbar = false
$('.cartButton').click(function () {
    if(!cartbar)  {
        $('body').css('overflow','hidden')
        $('.cartBackground').fadeIn(500)
        $('.cartWrapper').css('margin-right','0')
        cartbar = !cartbar
    }else{
        $('body').css('overflow','scroll')
        $('.cartBackground').fadeOut(500)
        $('.cartWrapper').css('margin-right','calc(-35% - 2px)')
        cartbar = !cartbar
    }
})
$('.cartBackground').click(function(){
    $('body').css('overflow','scroll')
    $('.cartBackground').fadeOut(500)
    $('.cartWrapper').css('margin-right','calc(-35% - 2px)')
    cartbar = !cartbar
})