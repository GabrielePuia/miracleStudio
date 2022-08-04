var menuButton = $('.menu-icon');
var menu = $('#menu');

var portfolioHomeSection = $('.portfolio__container');

var project = $('.project');

var galleryImage = $('.gallery__img');

function openCloseMenu() {
    if(menu.hasClass('collapsed')) {
        menu.removeClass('collapsed');
    } else {
        menu.addClass("collapsed");
    }
}

$(document).ready(function() {

    $("#year").text( (new Date).getFullYear() );

    menuButton.on( "click", openCloseMenu );
    //Codice in home
    if($(".homepage__hero").length > 0) {
        portfolioHomeSection.mouseover(function(){
            $(this).find(".btn").addClass("btn--revealed");
        });
        portfolioHomeSection.mouseout(function(){
            $(this).find(".btn").removeClass("btn--revealed");
        });
    }
    //Codice in pagina contenente elenco progetti
    /*if($('.projects__container').length > 0) {
        project.mouseover(function() {
            $(this).find('.project__content').addClass("project__content--expanded");
            $(this).find('.project__footer').addClass("project__footer--revealed");
        });
        project.mouseout(function() {
            $(this).find('.project__content').removeClass("project__content--expanded");
            $(this).find('.project__footer').removeClass("project__footer--revealed");
        });
    }*/
    //Codice dove c'è una galleria
    if($('.gallery').length > 0) {
        galleryImage.mouseenter(function(){
            $(this).append('<span class="img__caption">' + $(this).attr("data-caption") + '</span>');
            //$(this).find('.img__caption').css("opacity", "1");
            $(this).find('.img__caption').hide();
            $(this).find('.img__caption').fadeIn();
        });
        galleryImage.mouseleave(function(){
            $(this).find(".img__caption").remove();
        });
    }
});