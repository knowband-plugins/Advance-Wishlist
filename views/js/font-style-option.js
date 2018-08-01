/**
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
* We offer the best and most useful modules PrestaShop and modifications for your online store.
*
* @category  PrestaShop Module
* @author    knowband.com <support@knowband.com>
* @copyright 2017 Knowband
* @license   see file: LICENSE.txt
*/

$(document).ready(function(){
    
    if($('.velocity-font-style').length){
       $('.velocity-font-style').click(function(){
           if($(this).hasClass('font-style-selected')){
               $(this).find('input[type="hidden"]').attr('value', 0);
               $(this).removeClass('font-style-selected')
           }else{
               $(this).find('input[type="hidden"]').attr('value', 1);
               $(this).addClass('font-style-selected')
           }
       }); 
    }
    
    if($('li.font-style').length){
       $('li.font-style').mouseover(function(){
           if($(this).find('div').hasClass('bold-option')){//$(this).find('div').find('div.velocity-font-style-tooltip').show();
               if(!$(this).find('div').find('span.velocity-font-style-tooltip').length){
                    $(this).find('div').append('<span class="velocity-font-style-tooltip">Bold</span>');                   
               } 
           }else if($(this).find('div').hasClass('italic-option')){
               if(!$(this).find('div').find('span.velocity-font-style-tooltip').length){
                    $(this).find('div').append('<span class="velocity-font-style-tooltip">Italic</span>');                   
               }               
           }else if($(this).find('div').hasClass('font-color-option')){
               if(!$(this).children('div').find('span.velocity-font-style-tooltip-color').length){
                    $(this).children('div').append('<span class="velocity-font-style-tooltip-color">Font Color</span>'); 
               }              
           }else if($(this).find('div').hasClass('background-color-option')){
               if(!$(this).children('div').find('span.velocity-font-style-tooltip-color').length){
                    $(this).children('div').append('<span class="velocity-font-style-tooltip-color" style="width: 100px;">Background Color</span>'); 
               }              
           }else if($(this).find('div').hasClass('size-option')){
               if(!$(this).children('div').find('span.velocity-font-style-tooltip').length){
                    $(this).children('div').append('<span class="velocity-font-style-tooltip">Font Size</span>'); 
               }              
           }
       });
       $('li.font-style').mouseout(function(){
           $(this).find('div').find('span.velocity-font-style-tooltip').remove();
           $(this).find('div').find('span.velocity-font-style-tooltip-color').remove();
           //$(this).find('span.velocity-font-style-tooltip').remove();
       });
    }
    
    if($('.velocity-color-picker').length){
        
        $('.velocity-color-picker').colpick({
                layout:'hex',
                submit:0,
                colorScheme:'light',
                onBeforeShow: function(hsb,hex,rgb,el,bySetColor){
                    $(this).colpickSetColor($(this).find('input[type="hidden"]').attr('value'));
                },
                onChange:function(hsb,hex,rgb,el,bySetColor) {
                        $(el).find('.color-display').css('background-color', '#'+hex);
                        $(el).find('input[type="hidden"]').attr('value', '#'+hex);
                        
                        if(!bySetColor){
                            //$(el).val(hex);
                        } 
                }
        }).keyup(function(){
                $(this).colpickSetColor(this.value);
        });
    }
    
});


