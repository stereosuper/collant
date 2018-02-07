var $ = require('jquery');
var throttle = require('./utils/throttle.js');
var requestAnimFrame = require('./utils/requestAnimFrame.js');

module.exports = function( stickyElt, givenPosition, {
    unit = 'px',
    updateHeightOnScroll = false,
    wrapper = true,
    minimumWidth = false,
    bottom = false
} = {} ){

    if( !stickyElt.length ) return;
    
    let position, eltHeight, posTop, belowWidth;
    let windowHeight = $(window).height(); 
    let windowWidth = window.outerWidth; 
    let scrollTop = $(document).scrollTop();
    let wrapperSticky = stickyElt.closest('.wrapper-collant');


    function checkWindowHeight(){
        windowHeight = $(window).height();
        windowWidth = window.outerWidth;

        if( unit === 'vh' ){
            eltHeight = stickyElt.outerHeight();
            position = windowHeight / (100/givenPosition) - eltHeight/2;
        }else{
            position = givenPosition;
        }
    }
    
    function scrollHandler(){
        scrollTop = $(document).scrollTop();        

        if( updateHeightOnScroll && stickyElt.hasClass('collant' )){
            stickyElt.data('height', stickyElt.outerHeight());
        }

        if( bottom ){

            if( scrollTop + windowHeight >= stickyElt.data('offsetBottom') + position ){
                stickyElt.removeClass('collant').css('bottom', stickyElt.data('initialPos'));
            }else{
                stickyElt.addClass('collant').css('bottom', position+'px');
            }

            if( minimumWidth && belowWidth ){
                stickyElt.removeClass('collant collant-stuck').css({ 'top': '', 'bottom': stickyElt.data('initialPos') });
            }

        }else{

            posTop = stickyElt.data('initialPos') === 'auto' ? 0 : parseFloat( stickyElt.data('initialPos'), 10 );

            if( scrollTop >= stickyElt.data('offsetTop') - position + posTop ){
                stickyElt.addClass('collant').css('top', position+'px');

                if( scrollTop + position + stickyElt.data('height') >= stickyElt.data('offsetBottom') ){
                    stickyElt.removeClass('collant').addClass('collant-stuck').css({'top': 'auto', 'bottom': '0'});
                }else{
                    stickyElt.addClass('collant').removeClass('collant-stuck').css({ 'top': position + 'px', 'bottom': '' });
                }
            }else{
                stickyElt.removeClass('collant').css('top', stickyElt.data('initialPos'));
            }

            if( minimumWidth && belowWidth ){
                stickyElt.removeClass('collant collant-stuck').css({ 'top': stickyElt.data('initialPos'), 'bottom': '' });
            }

        }
    }

    function setDatas(){
        belowWidth = minimumWidth && windowWidth <= minimumWidth ? true : false;

        if( wrapper ){
            stickyElt.data({
                'offsetTop': wrapperSticky.offset().top,
            });
        }else{
            stickyElt.data({
                'offsetTop': 0,
            });
        }

        stickyElt.data({
            'offsetBottom': wrapperSticky.offset().top + wrapperSticky.outerHeight(),
            'height': stickyElt.outerHeight()
        });
    }

    function resizeHandler(){
        checkWindowHeight();
        setDatas();
        scrollHandler();
    }


    setDatas();
    stickyElt.data({
        'initialPos': bottom ? stickyElt.css('bottom') : stickyElt.css('top')
    });

    checkWindowHeight();
    scrollHandler();

    
    $(document).on('scroll', throttle(function(){
        requestAnimFrame(scrollHandler);
    }, 10));

    $(window).on('resize', throttle(function(){
        requestAnimFrame(resizeHandler);
    }, 10));
}
