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

var lastScrollTop = 0;
$(window).scroll(function() {
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.bottom_bar').fadeOut('slow');
        }
   } else {
      $('.bottom_bar').fadeIn('slow');
   }
   lastScrollTop = st;
});

var click = true;
$(document).ready(function(){
    if (saveforlater_enable == 1) {
        if($('#center_column .product_list').length){
            if (!$(document).find('.sfl_shorlist_large_link').length) {
                if($('#center_column .product_list .ajax_block_product')){
                    $('#center_column .product_list .ajax_block_product').each(function(){
                        if($(this).find('.product-container .product-image-container').length){
                            var sfl_image_container = $(this).find('.product-container .product-image-container');
                            var image_element = $(sfl_image_container).find('a.product_img_link');
                            var id_product = $(this).find('.ajax_add_to_cart_button').attr('data-id-product');
                            if(id_product > 0){
                                if(!$(sfl_image_container).css('position') || $(sfl_image_container).css('position') == '' || $(sfl_image_container).css('position') == 'static'){
                                    $(sfl_image_container).css('position', 'relative');
                                }
                                $(sfl_image_container).append(sfl_create_shorlist_link('large', id_product));
                            }
                        }
                    });
                }
            }
        }
    }
    if (saveforlater_enable == 1) {
        if($('#center_column #image-block').length){
            $('#center_column #image-block').parent().append(sfl_create_shorlist_link('large', $('#product_page_product_id').val()));
        }
    }

    $('#border_short').on('click', function () {
        $('#recommend_popup').hide();
        $('#recent_popup').hide();
        $('#short_popup').toggle();
        if($('#short_popup').css('display') == 'none'){ 
            $('#border_short').css("border-color", "transparent");
            $('#shortlist_icon').css("background-position", "5px -18px");
        } else {
            $('#border_recent').css("border-color", "transparent");
            $('#border_recommend').css("border-color", "transparent");
            $('#border_short').css("border-color", "#C24546");
            $('#recent_icon').css("background-position", "5px 3px");
            $('#recommend_icon').css("background-position", "5px -64px");
            $('#shortlist_icon').css("background-position", "5px -135px");
        }
    });        
    
    $('#border_recent').on('click', function () {
        $('#recommend_popup').hide();        
        $('#short_popup').hide();
        $('#recent_popup').toggle();
        if($('#recent_popup').css('display') == 'none'){ 
            $('#border_recent').css("border-color", "transparent");
            $('#recent_icon').css("background-position", "5px 3px");
        } else {
            $('#border_recommend').css("border-color", "transparent");
            $('#border_short').css("border-color", "transparent");
            $('#border_recent').css("border-color", "#C24546");
            $('#recommend_icon').css("background-position", "5px -64px");
            $('#shortlist_icon').css("background-position", "5px -18px");
            $('#recent_icon').css("background-position", "5px -114px");
        }
    });
    
    $('#border_recommend').on('click', function () {
        $('#short_popup').hide();
        $('#recent_popup').hide();
        $('#recommend_popup').toggle();
        if($('#recommend_popup').css('display') == 'none'){ 
            $('#border_recommend').css("border-color", "transparent");
            $('#recommend_icon').css("background-position", "5px -64px");
        } else {
            $('#border_short').css("border-color", "transparent");
            $('#border_recent').css("border-color", "transparent");
            $('#border_recommend').css("border-color", "#C24546");
            $('#recent_icon').css("background-position", "5px 3px");
            $('#shortlist_icon').css("background-position", "5px -18px");
            $('#recommend_icon').css("background-position", "4px -90px");
        }
    });
    
    $('#hide_short').on('click', function () {        
        $(this).parent().parent().parent().parent().find("#short_popup").hide();
        $('#border_short').css("border-color", "transparent");
        $('#shortlist_icon').css("background-position", "5px -18px");
    });
    
    $('#hide_recent').on('click', function () {
        $(this).parent().parent().parent().parent().find("#recent_popup").hide();
        $('#border_recent').css("border-color", "transparent");
        $('#recent_icon').css("background-position", "5px 3px");
    });
    
    $('#hide_recommend').on('click', function () {
        $(this).parent().parent().parent().parent().find("#recommend_popup").hide();
        $('#border_recommend').css("border-color", "transparent");
        $('#recommend_icon').css("background-position", "5px -64px");
    });
    
    $(".velsof_buy").mouseover(function() {
        $(this).css("background", ColorLuminance(buy_button_background, -0.4));
    });
    $(".velsof_buy").mouseout(function() {
        $(this).css("background", buy_button_background);
    });
});

function sfl_create_shorlist_link(type, id_product)
{
    if(sfl_already_added_products.indexOf(id_product) > -1){
        var label = sfl_already_added_text;
    }else{
        var label = sfl_shortlist_text;
    }
    if(type == 'small'){
        var html = '<div class="sfl_shorlist_small_link"><span onclick="addShortList(this, '+id_product+')" class="sfl_product_link_'+id_product+'">'+label+'</span></div>';
    }else{
        var html = '<div class="sfl_shorlist_large_link"><span onclick="addShortList(this, '+id_product+')" class="sfl_product_link_'+id_product+'">'+label+'</span></div>';
    }
    
    return html;
}

function sfl_get_product_id_from_url(url)
{
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    if(vars['id_product'] != undefined && vars['id_product'] > 0){
        return vars['id_product'];
    }else{
        return 0;
    }
}

function addShortList(ele, id_product)
{
    var pro_id = id_product;    
    $("#sfl_shortproduct_id").val(id_product);    
    $.ajax({
//        url: baseDir+'modules/saveforlater/process_product.php',
        url: ajaxurl,
        type: 'POST',
        dataType: 'json',
        data: $('#sfl_add_product input').serialize()+'&method=process',
        success: function(json) {
            if(json['status'] == true){
                var cart = $('#shortlist_count');
                imgtodrag = false;
                if($(ele).parent().parent().find('a.product_img_link img').length){
                    imgtodrag = $(ele).parent().parent().find('a.product_img_link img').eq(0);
                }else if($(ele).parent().parent().find('#image-block #bigpic').length){
                    imgtodrag = $(ele).parent().parent().find('#image-block #bigpic').eq(0);
                }else if($(ele).parent().parent().find('.products-block-image img').length){
                    imgtodrag = $(ele).parent().parent().find('.products-block-image img').eq(0);
                }

                if (imgtodrag && json['action'] == 1) {
                    var imgclone = imgtodrag.clone()
                        .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': '250px',
                        'width': '250px',     
                        'z-index': '10000'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 1500, 'easeInOutCubic');

                    imgclone.animate({
                        'width': 0,
                        'height': 0
                    }, function () {
                        $(this).detach()
                    });
                }

                var label = sfl_already_added_text;
                if(json['action'] == 0){
                    label = sfl_shortlist_text;
                }
                if($('.sfl_product_link_'+pro_id).length){
                    $('.sfl_product_link_'+pro_id).each(function(){
                        $(this).html(label);
                    });
                }

                $("#velsof_list").html(json['content']);

                var updated_count = $('#velsof_list #sfl_total_shortlisted').val();
                if(json['action'] == 1){
                    $("#shortlist_count").html(updated_count);
                    $("#shortlist_count").fadeOut('slow').fadeIn('fast');
                    $('#short_count label').html(($('#shortlist_count').html()));
                    $("#shortlist_count").css("background-color","#dd4b39");
                }else{
                    $("#shortlist_count").css("background-color","#dd4b39");
                    $("#shortlist_count").fadeOut('fast').fadeIn('slow');
                    $("#shortlist_count").html(updated_count);
                    $('#short_count label').html(($('#shortlist_count').html()));
                }

            }else{
                alert(try_again_msg);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(request_failed_msg);
        }
    });
    
}

function removeProductFromList(ele, product_id, type)
{
    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: "sfl_shortproduct_id="+product_id+'&method=remove&type='+type,
        dataType: 'json',
        beforeSend: function(){
            if(type == 'sfl'){
                $('#velsof_list .ajax_loader').show();
            }else if(type == 'rv'){
                $('#recent_popup .ajax_loader').show();
            }
        },
        complete: function()
        {
            if(type == 'sfl'){
                $('#velsof_list .ajax_loader').hide();
            }else if(type == 'rv'){
                $('#recent_popup .ajax_loader').hide();
            }
        },
        success: function(json){
            if(json['status'] == true){
                $(ele).closest(".shortlist_products").remove();
                if(type == 'sfl'){
                    var label = sfl_shortlist_text;
                    if($('.sfl_product_link_'+product_id).length){
                        $('.sfl_product_link_'+product_id).each(function(){
                            $(this).html(label);
                        });
                    }
                    $('#sfl_shortlisted_row_'+product_id).remove();
                    $('#shortlist_count').html(($('#shortlist_count').html() - 1));
                    $('#short_count label').html(($('#shortlist_count').html()));
                    if ($('#shortlist_count').html() == '0') {
                        var html = '<div class="no_data"><span>'+sry_txt+'! </span><br>'+no_sfl_data+'</div>';
                        $('#velsof_list .velsof_container').html(html);
                    }
                }else if(type == 'rv'){
                    $('#sfl_recent_viewed_row_'+product_id).remove();
                    $('#recentlist_count').html(($('#recentlist_count').html() - 1));
                    $('#recent_count label').html(($('#recent_count label').html() - 1));
                    if ($('#recentlist_count').html() == '0') {
                        var html = '<div class="no_data"><span>'+sry_txt+'! </span><br>'+no_rviewed_data+'</div>';
                        $('#recent_popup .velsof_container').html(html);
                    }
                }
            }else{
                alert(product_remove_msg);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(request_failed_msg);
        }
    });
}

function buyProduct(id_product)
{
    if(!click){
        return false;
    }
    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: "product_id="+id_product+'&method=buy',
        beforeSend: function(){
            click = false;
        },
        complete: function()
        {
            click = true;
        },
        success: function(json){
            window.open(json, '_blank');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(request_failed_msg);
        }
    });
}

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
