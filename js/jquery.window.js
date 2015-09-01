    (function ($)
{

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPF-Windows Default Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Class_Window = 'UPF-Window',
        Class_WindowWrapper = 'UPF-Window-Wrapper',
        Class_WindowContent = 'UPF-Window-Content',
        Class_WindowClose = 'UPF-Window-Close',
        Selector_Window = '.' + Class_Window,
        Selector_WindowWrapper = '.' + Class_WindowWrapper,
        Selector_WindowContent = '.' + Class_WindowContent,
        Selector_WindowClose = '.' + Class_WindowClose;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Count Center Position
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    Function_WindowPosition = function ()
    {
        /*
         var Height = ( $(window).height() - $(Selector_WindowContent).outerHeight() ) / 2;
         if (Height > 0)
         {
         $(Selector_WindowContent).css('marginTop', Height);
         }
         console.log($(Selector_WindowContent).outerHeight());
         */
    };


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Begin Methods
    var Methods = {


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Open - bind event with function "open"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        open: function (Content, UserOptions)
        {

// Settings
            var Settings = $.extend({
                'Event':    'click',
                'Duration': 1000
            }, UserOptions);

// Bind Event
            $(this).bind(
                Settings['Event'] + Selector_Window, {
                    obj:      this,
                    Content:  Content,
                    Settings: Settings
                },
                Methods.show);

        },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Show
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        show: function (e)
        {
            // Close Prev Window
            $(Selector_Window).hide(e.data.Settings.Duration,
                function ()
                {
                    $(this).remove();
                });

            var Content = '';

            if($(this).attr('data-img-src')){
                Content = '<img src="'+ $(this).attr('data-img-src')+'"/>';
            }else{
                Content = e.data.Content;
            }

            // Append Content
            $('body').append(
                '<div class="' + Class_Window + '">' +
                '<div class="' + Class_WindowWrapper + '"></div>' +
                '<button class="' + Class_WindowClose + '">×</button>' +
                '<div class="' + Class_WindowContent + '">' +
                Content +
                '</div>' +
                '</div>');



            // Show Window
            $(Selector_Window).fadeIn({
                start:    Function_WindowPosition(),
                duration: e.data.Settings.Duration
            });


            $('.' + Class_WindowContent).niceScroll({
                zindex:             100000,
                cursorwidth:        '10px',
                cursorborderradius: '0px',
                cursorborder:       "1px solid rgba(0,0,0,0)",
                cursorcolor:        '#7d7d7d'
            });


            // Close By Click To Wrapper
            $(Selector_WindowWrapper + ',' + Selector_WindowClose).bind(
                e.data.Settings.Event + Selector_Window,
                {
                    Settings: e.data.Settings.Duration
                },
                Methods.close);

            return false;
        },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Close
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        close: function (e)
        {
            $(Selector_Window).fadeOut(e.data.Settings.Duration, function ()
            {
                $(Selector_Window).remove();
            });
        }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// End Methods
    };






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $.fn.upf_window = function (Method)
    {
        if (Methods['method'] == 'close', Methods['method'] == 'show')
        {
            return Methods[Method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else
        {
            return Methods.open.apply(this, arguments);
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


})(jQuery);