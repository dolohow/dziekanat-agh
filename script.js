// ==UserScript==
// @name         dziekanat-agh
// @version      0.3.0
// @author       dolohow
// @description  Skrypt greasemonkey dla przyjemniejszej obsługi dziekanatu
// @updateURL    https://raw.githubusercontent.com/dolohow/dziekanat-agh/master/script.js
// @match        https://*dziekanat.agh.edu.pl/*
// @run-at       document-end
// @copyright    2013-2014 GPLv2
// ==/UserScript==

(function () {
    var urls = {
        loginPage: ['https://dziekanat.agh.edu.pl/', 'https://dziekanat.agh.edu.pl/Logowanie2.aspx'],
        marks: 'https://dziekanat.agh.edu.pl/OcenyP.aspx'
    };

    // if (jQuery.inArray(document.URL, urls.loginPage)) {
    // TODO: Find out why it is not defined
    if (urls.loginPage.indexOf(document.URL) !== -1) {
        var remember = document.createElement('input');
        remember.type = 'checkbox';
        remember.checked = true;
        remember.id = 'remember';
        remember.style.position = 'relative';
        remember.style.bottom = '92px';
        remember.style.left = '380px';

        var redirect = document.createElement('input');
        redirect.type = 'checkbox';
        redirect.checked = GM_getValue('redirect');
        redirect.id = 'redirect';
        redirect.style.position = 'relative';
        redirect.style.bottom = '75px';
        redirect.style.left = '299px';

        var labelRemember = document.createElement('label');
        labelRemember.htmlFor = "remember";
        labelRemember.appendChild(document.createTextNode('Zapamiętaj'));
        labelRemember.style.position = 'relative';
        labelRemember.style.bottom = '95px';
        labelRemember.style.left = '380px';

        var labelRedirect = document.createElement('label');
        labelRedirect.htmlFor = "redirect";
        labelRedirect.appendChild(document.createTextNode('Przekieruj na stronę z ocenami'));
        labelRedirect.style.position = 'relative';
        labelRedirect.style.bottom = '78px';
        labelRedirect.style.left = '299px';

        document.querySelector('#login_button_container').appendChild(remember);
        document.querySelector('#login_button_container').appendChild(labelRemember);
        document.querySelector('#login_button_container').appendChild(redirect);
        document.querySelector('#login_button_container').appendChild(labelRedirect);

        $('.login_field input')[0].value = GM_getValue('login');
        $('.login_field input')[1].value = GM_getValue('password');

        $('input[value=Zaloguj]').click(function() {
            if ($('#remember').is(':checked')) {
                GM_setValue('login', $('.login_field input')[0].value);
                GM_setValue('password', $('.login_field input')[1].value);
            }
            GM_setValue('redirect', $('#redirect').is(':checked'));
        });
    }

    if(document.URL === 'https://dziekanat.agh.edu.pl/Ogloszenia.aspx' && GM_getValue('redirect')) {
        window.location.href = "OcenyP.aspx";
    }
    if(document.URL === urls.marks) {
        var save = $('.gridDane').clone();
        $('.gridDane td:nth-child(10)').each(function(){
            if($(this).text() > 0){
                $(this).siblings().css({'background-color': "#1e90ff", 'color': "white", 'font-weight': 'bold' });
                $(this).css({'background-color': "#1e90ff", 'color': "white", 'font-weight': 'bold' });
            }
        });
        $('.gridDane').children().each(function(){
            $(this).text($(this).text().replace(/([0-9]{2}\.){2}[0-9]{2}/, ''));
            switch($(this).text()){
                case '2.0':
                    $(this).css('color', '#FF0000');
                    break;
                case '3.0':
                    $(this).css('color', '#FF7F00');
                    break;
                case '3.5':
                    $(this).css('color', '#FFFF00');
                    break;
                case '4.0':
                    $(this).css('color', '#00FF00');
                    break;
                case '4.5':
                    $(this).css('color', '#0000FF');
                    break;
                case '5.0':
                    $(this).css('color', '#0000FF');
            }
        });
        $(document).keydown(function(key){
            if(key.which == 72) {
                $('.gridDane').replaceWith(save.clone());
            }
        });
    }
})();
