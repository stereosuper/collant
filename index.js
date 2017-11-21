var $ = require('jquery');

var throttle = require('./utils/throttle.js');

module.exports = function (stickyElt, givenPosition, {
    unit = 'px',
    updateHeightOnScroll = false,
    wrapper = true,
    minimumWidth = false
} = {}) {
    if (!stickyElt.length) return;

    var position, eltHeight, posTop, belowWidth;
    var windowHeight = $(window).height(); 
    var windowWidth = window.outerWidth; 
    var scrollTop = $(document).scrollTop();
    var wrapperSticky = stickyElt.closest('.wrapper-sticky');


    function checkWindowHeight(){
        windowHeight = $(window).height();
        if(unit === 'vh'){
            eltHeight = stickyElt.outerHeight();
            position = windowHeight / (100/givenPosition) - eltHeight/2;
        }else{
            position = givenPosition;
        }
    }
    
    function scrollHandler(){
        scrollTop = $(document).scrollTop();        

        if(updateHeightOnScroll && stickyElt.hasClass('sticky')){
            stickyElt.data('height', stickyElt.outerHeight());
        }

        posTop = stickyElt.data('initialPos') === 'auto' ? 0 : parseFloat(stickyElt.data('initialPos'), 10);
         
        if(scrollTop >= stickyElt.data('offsetTop') - position + posTop){
            stickyElt.addClass('sticky').css('top', position+'px');
            if(scrollTop + position + stickyElt.data('height') >= stickyElt.data('offsetBottom')){
                stickyElt.removeClass('sticky').addClass('sticky-stuck').css({'top': 'auto', 'bottom': '0'});
            }else{
                stickyElt.addClass('sticky').removeClass('sticky-stuck').css({ 'top': position + 'px', 'bottom': '' });
            }
        }else{
            stickyElt.removeClass('sticky').css('top', stickyElt.data('initialPos'));
        }

        if (minimumWidth && belowWidth) {
            stickyElt.removeClass('sticky sticky-stuck').css({ 'top': stickyElt.data('initialPos'), 'bottom': '' });
        }
    }

    function resizeHandler(){
        checkWindowHeight();

        windowWidth = window.outerWidth;

        minimumWidth && windowWidth <= minimumWidth ? belowWidth = true : belowWidth = false;

        if(wrapper){
            stickyElt.data({
                'offsetTop': wrapperSticky.offset().top,
            });
        }else{
            stickyElt.data({
                'offsetTop': stickyElt.offset().top,
            });
        }

        stickyElt.data({
            'offsetBottom': wrapperSticky.offset().top + wrapperSticky.outerHeight(),
            'height': stickyElt.outerHeight()
        });

        scrollHandler();  
    }

    minimumWidth && windowWidth <= minimumWidth ? belowWidth = true : belowWidth = false;

    if(wrapper){
        stickyElt.data({
            'offsetTop': wrapperSticky.offset().top
        });
    }else{
        stickyElt.data({
            'offsetTop': stickyElt.offset().top
        });
    }

    stickyElt.data({
        'initialPos': stickyElt.css('top'),
        'offsetBottom': wrapperSticky.offset().top + wrapperSticky.outerHeight(),
        'height': stickyElt.outerHeight()
    });

    checkWindowHeight();

    
    $(document).on('scroll', throttle(function(){
        requestAnimFrame(scrollHandler);
    }, 10));

    $(window).on('resize', throttle(function(){
        requestAnimFrame(resizeHandler);
    }, 10));
}
