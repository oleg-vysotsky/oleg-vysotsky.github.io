$(document).ready(function () {



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Preload
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).load(function () {
        $('.Pre-Loading').fadeOut(500, 'linear', function () {
            setTimeout(NewLetter, 1400);
        });

    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set Head Position
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    var WindowHeight = $(window).height();

    $('.Section-Title-Wrapper').height(WindowHeight);
    $(window).resize(function () {
        $('.Section-Title-Wrapper').height(WindowHeight);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > WindowHeight) {
            $('.Menu').css({'position': 'fixed'});
            $('.Section-About').css({'marginTop': $('.Menu').outerHeight() + 'px'});

        } else {
            $('.Menu').css({'position': 'relative'});
            $('.Section-About').css({'marginTop': '0px'});
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Animate portfolio
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var PortfolioAnimation = false;
    $('.Portfolio-Item-Image').hover(function () {
        if (!PortfolioAnimation) {
            $('img', this).stop().animate({'top': -$('img', this).height() + 200 + 'px'}, $('img', this).height() *
            3, 'linear');
            PortfolioAnimation = true;
        }
    }, function () {
        PortfolioAnimation = false;
        $('img', this).stop().animate({'top': 0}, $('img', this).height() / 1.5, 'linear');
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map overlay
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.Section-Connect .Overlay').click(function () {
        $(this).slideUp(300);
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Follow Me On
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function FollowMe() {
        var audio = new Audio('/pictures/FollowOnMe.wav');
        $('footer div').click(function () {
            audio.load();
            audio.play();
        });

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scroll Top
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('footer .Home').click(function () {
        $('html,body').animate({'scrollTop': '0px'}, 700);
        return false;
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lightbox
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Image = $(this).attr('data-src');
    $('.Portfolio-Lightbox').upf_window('');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Navigation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.Sections a').click(function () {
        var Scroll = 0;

        Scroll = $($(this).attr('href')).offset().top - $('.Menu').outerHeight();

        $('html,body').animate({'scrollTop': Scroll + 'px'}, 900);

        return false;
    });


    var Sizes = [];
    $('.Sections a').each(function (Key, Value) {
        Sizes[Key] = [];
        Sizes[Key]['value'] =
            $($(Value).attr('href')).offset().top - $('.Menu').outerHeight() - $(window).height() * 0.3;
        Sizes[Key]['id'] = $(Value).attr('href');
    });

    $(window).scroll(function () {
        var Scroll = $(window).scrollTop();

        for (var I = 0; I < Sizes.length; I++) {
            if ((Scroll >= Sizes[I]['value'] && Sizes[I + 1] !== undefined
                && Scroll <= Sizes[I + 1]['value']  ) ||
                (Scroll >= Sizes[I]['value'] && Sizes[I + 1] == undefined)) {
                $('.Sections a').removeClass('Active');
                $('[href=' + Sizes[I]['id'] + ']').addClass('Active');
            }
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Animate Background
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.Lang').hover(
        function () {
            $('.Section-Title').addClass('White');
        }, function () {
            $('.Section-Title').removeClass('White');
        }
    );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Send Mail By Ajax
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.Form button').click(function () {

        //Get Data
        var Name = $('.Form [name=name]').val(),
            Email = $('.Form [name=email]').val(),
            Subject = $('.Form [name=Subject]').val(),
            Message = $('.Form [name=Message]').val();


        // Set Content
        var Query = 'name=' + Name + '&email=' + Email + '&subject=' + Subject + '&message=' + Message;

        // Validate Email
        var ValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (ValidateEmail.test(Email) && Name.length > 0) {
            $.ajax({
                url:     '/actions/connect.php',
                type:    'POST',
                data:    Query,
                success: function (Data) {
                    $('.Registration-Success, .Registration-Error').remove();

                    $('.Form button').after(Data);

                    $('[name=name]').val('');
                    $('[name=email]').val('');
                    $('[name=subject]').val('');
                    $('[name=message]').val('');

                },
                error:   function () {
                    $('.Registration-Success, .Registration-Error').remove();
                    var Error = 'Registration error, try again later.';
                    if (location.pathname == '/') {
                        Error = 'Ошибка регистрации, попробуйте позже.';
                    }

                    $('.Form button').after('<div class="Registration-Error">' + Error + '</div>');
                }
            });
        } else {
            var Error = 'Fill all fields.';
            if (location.pathname == '/') {
                Error = 'Заполните все поля!';
            }
            $('.Registration-Success, .Registration-Error').remove();
            $('.Form button').after('<div class="Registration-Error">' + Error + '</div>');
        }

        return false;
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Text
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (location.pathname == '/') {
        var Words = ['Веб разработчик', 'Программист', 'Фрилансер'];
    } else {
        var Words = ['Web Developer', 'Programmer', 'Freelancer'];
    }

    var Letter = Words[0].length;
    var Word = 0;
    var Direct = false;

    function NewLetter() {
        if (Direct == true) {
            if (Letter != 0) {
                $('.Profession span').text($('.Profession span').text() + Words[Word][Letter]);
            } else {
                $('.Profession span').text(Words[Word][Letter]);
            }

            Letter++;
            if (Words[Word][Letter] === undefined) {
                Direct = false;
                if (Word == 2) {
                    setTimeout(NewLetter, 3000);
                } else {
                    setTimeout(NewLetter, 1200);
                }

            } else {
                setTimeout(NewLetter, 80);
            }
        } else {
            if (Letter != 0) {
                $('.Profession span').text($('.Profession span').text().substring(0, Letter));
            }

            if (Letter == 0) {
                Word++;
                if (Words[Word] === undefined) {
                    Word = 0;
                }
                Direct = true;
            } else {
                Letter--;
            }

            setTimeout(NewLetter, 40);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fill Form
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var FillStarted = false;

    function FillInConnection() {
        FillStarted = true;
        var Phrases = [
            'Владилав',
            'vladislav@sonyprod.com',
            'Разработка каталога продукции Sony',
            'Привет! Необходимо разработать интернет каталог продукции Sony, запарсенной с оффициального сайта и дополненного ценами с сайтов дистрибюторов. Бюджет проекта 1500$. Сроки 3 недели.'
        ];

        var Items = [
            $('.Form [name=name]'),
            $('.Form [name=email]'),
            $('.Form [name=subject]'),
            $('.Form [name=message]')
        ];
        var FormLetter = 0,
            FormItem = 0,
            FormTimer = false;


        function FormFill() {
            if (Phrases[FormItem] !== undefined) {
                if (Phrases[FormItem][FormLetter] !== undefined) {
                    if (FormLetter == 0 && !Items[FormItem].is(':focus')) {
                        FormTimer = setTimeout(function () {
                            Items[FormItem].focus();
                            FormTimer = setTimeout(FormFill, 300);
                        }, 800);
                        return false;
                    }
                    Items[FormItem].val(Items[FormItem].val() + Phrases[FormItem][FormLetter]);
                    FormLetter++;
                } else {
                    FormItem++;
                    FormLetter = 0;
                }
            } else {
                FormTimer = setTimeout(function () {
                    FormItem = 0;
                    FormLetter = 0;
                    $('input,textarea').val('');
                    FormTimer = setTimeout(FormFill, 500);
                }, 3000);
                return false;

            }
            FormTimer = setTimeout(FormFill, 80);
            return false;
        }

        FormTimer = setTimeout(FormFill, 1000);

        $('.Form input,.Form textarea').click(function () {
            clearTimeout(FormTimer);
            FormItem = 0;
            FormLetter = 0;
            $('input,textarea').val('');

            $('.Form input,.Form textarea').off('click');
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > ($('#connect').offset().top - 300) && FillStarted == false) {
            FillInConnection();
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});