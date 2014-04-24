// ==UserScript==
// @name         dziekanat-agh
// @version      0.2.1
// @description  
// @match        https://*dziekanat.agh.edu.pl/*
// @copyright    2013, dolohow, GPLv2
// ==/UserScript==

var AUTO_LOGIN = 2;

var AUTO_REDIRECT = true;

var NR_INDEKSU = ;
var HASLO = '';

$(document).ready(function(){
    if(AUTO_LOGIN == 2) {
    	$('.login_field:nth-child(2) input').val(NR_INDEKSU);
    	$('.login_field:nth-child(3) input').val(HASLO);
    }
    if(AUTO_LOGIN >= 1) { 
    	$('.login_button input').click();
    }
    if(document.URL == 'https://dziekanat.agh.edu.pl/Ogloszenia.aspx' && AUTO_REDIRECT) {
        window.location.href = "OcenyP.aspx";
    }
    if(document.URL == "https://dziekanat.agh.edu.pl/OcenyP.aspx") {
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
            if(key.which == 72)
            	$('.gridDane').replaceWith(save.clone());
        });
    }
});
