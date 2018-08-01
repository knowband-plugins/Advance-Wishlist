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

var message_delay = 10000; //10 seconds
var is_product_analysis_graph_loaded = false;
var banner_upload_index = null;
var numeric_reg = /^[0-9]*$/;
var prod_click = true;
var cust_click = true;
var ord_click = true;
var export_prod_click = true;
var reset_prod_click = true;
var selected_cat_product_analysis = '';
var selected_cat_customer_analysis = '';
var selected_cat_order_analysis = '';
var selected_cat_recommend_analysis = '';
function saveConfiguration()
{
    $('#configuration_form .validation-advice').remove();
    $('#kb_container').parent().find('.kb-global-message').remove();
    var error = false;
    /*Knowband validation start*/
    $('#configuration_form input.required-entry').each(function () {
        $(this).removeClass('velsof-error-field');
        var field_err = velovalidation.checkMandatory($(this));
        if (field_err != true) {
            error = true;
            $(this).addClass('velsof-error-field');
            $(this).parent().append('<span class="validation-advice">' + field_err + '</span>');
        }
    });
    /*Knowband validation end*/
    /*Knowband validation start*/
    $('#configuration_form input.validate-integer').each(function () {
        $(this).removeClass('velsof-error-field');
        var num_err = velovalidation.isNumeric($(this));
        if (num_err != true) {
            error = true;
            $(this).addClass('velsof-error-field');
            $(this).parent().append('<span class="validation-advice">' + num_err + '</span>');
        }
//        if (!numeric_reg.test($(this).val())) {
//            error = true;
//            $(this).parent().append('<span class="validation-advice">' + sfl_invalid_field_lbl + '</span>');
//        }
    });
    /*Knowband validation end*/
    if (!error) {
        /*Knowband button  validation start*/
        $('#save_conf').attr('disabled', 'disabled');
        /*Knowband button  validation end*/
        $('#configuration_form').submit();
    } else {
        var errorHtml = '<div class="bootstrap kb-global-message"><div class="alert alert-danger">';
        errorHtml += '<button type="button" class="close" data-dismiss="alert">×</button>';
        errorHtml += configuration_validation_error;
        errorHtml += '</div></div>';
        $('#kb_container').before(errorHtml);
        setTimeout(function () {
            $('#kb_container').parent().find('.kb-global-message').remove();
        }, message_delay);
    }
}


$(document).ready(function () {
    $("#sfl_prod_analysis_from_date, #sfl_prod_analysis_to_date").datepicker({showOtherMonths: true, dateFormat: sfl_date_format});
    $("#sfl_cust_analysis_from_date, #sfl_cust_analysis_to_date").datepicker({showOtherMonths: true, dateFormat: sfl_date_format});
    $("#sfl_order_analysis_from_date, #sfl_order_analysis_to_date").datepicker({showOtherMonths: true, dateFormat: sfl_date_format});

    if ($('.color-input').length) {

        $('.color-input').colpick({
            layout: 'hex',
            submit: 0,
            colorScheme: 'light',
            onBeforeShow: function (hsb, hex, rgb, el, bySetColor) {
                $(this).colpickSetColor($(this).attr('value'));
            },
            onChange: function (hsb, hex, rgb, el, bySetColor) {
                $(el).css('background-color', '#' + hex);
                $(el).attr('value', '#' + hex);
                if ($(el).attr('name') == 'kb_sfl_config[general][buy_color]') {
                    $('#buy_button').css('background-color', '#' + hex);
                }


                if (!bySetColor) {
                    //$(el).val(hex);
                }
            }
        }).keyup(function () {
            $(this).colpickSetColor(this.value);
        });
    }

    $('#sfl_prod_analysis_p_list').multipleSelect({
        placeholder: sfl_l_prod_lbl,
        noMatchesFound: no_match_found,
        filter: true,
    });
    $('#sfl_cust_analysis_p_list').multipleSelect({
        placeholder: sfl_l_prod_lbl,
        noMatchesFound: no_match_found,
        filter: true,
    });
    $('#sfl_order_analysis_p_list').multipleSelect({
        placeholder: sfl_l_prod_lbl,
        noMatchesFound: no_match_found,
        filter: true,
    });

    $("#sfl_prod_analysis_c_list").multipleSelect({
        placeholder: sfl_l_cat_lbl,
        minumimCountSelected: 0,
        filter: true,
        onCheckAll: function () {
            getCategoryProducts('sfl_prod_analysis');
        },
        onUncheckAll: function () {
            getCategoryProducts('sfl_prod_analysis');
        },
        onClick: function () {
            getCategoryProducts('sfl_prod_analysis');
        }
    });

    $('#sfl_prod_analysis_c_list').multipleSelect("refresh");
    $('#sfl_prod_analysis_c_list').multipleSelect("uncheckAll");

    $("#sfl_cust_analysis_c_list").multipleSelect({
        placeholder: sfl_l_cat_lbl,
        minumimCountSelected: 0,
        filter: true,
        onCheckAll: function () {
            getCategoryProducts('sfl_cust_analysis');
        },
        onUncheckAll: function () {
            getCategoryProducts('sfl_cust_analysis');
        },
        onClick: function () {
            getCategoryProducts('sfl_cust_analysis');
        }
    });

    $('#sfl_cust_analysis_c_list').multipleSelect("refresh");
    $('#sfl_cust_analysis_c_list').multipleSelect("uncheckAll");

    $("#sfl_order_analysis_c_list").multipleSelect({
        placeholder: sfl_l_cat_lbl,
        minumimCountSelected: 0,
        filter: true,
        onCheckAll: function () {
            getCategoryProducts('sfl_order_analysis');
        },
        onUncheckAll: function () {
            getCategoryProducts('sfl_order_analysis');
        },
        onClick: function () {
            getCategoryProducts('sfl_order_analysis');
        }
    });

    $('#sfl_order_analysis_c_list').multipleSelect("refresh");
    $('#sfl_order_analysis_c_list').multipleSelect("uncheckAll");

    $('#tab_customer_analysis').on('click', '.sfl_customer_products', function () {
        var params = '&products=' + customer_analysis_params.products
                + '&from_date=' + customer_analysis_params.from_date
                + '&to_date=' + customer_analysis_params.to_date;

        var html = '<tr class="pure-table-odd empty-tbl"><td colspan="6" class="center"><span>' + empty_list_msg + '</span></td><tr>'
        $('#customer_product_list #sfl_customer_product_tbl_body').html(html);
        $.ajax({
            url: action,
            type: 'POST',
            data: '&ajax=true&method=customerproducts&id_customer=' + $(this).attr('type') + params,
            dataType: 'json',
            success: function(json) {
                var response = $.map(json, function(el) { return el; });
                if(response.length > 0){
                    html = '';
                    var i = 0;
                    var row_class = 'odd';
                    var tmp_s_no = 1;
                    for (i = 0; i < response.length; i++) {
                        if (i % 2 == 0)
                            row_class = 'even';
                        html += '<tr class="pure-table-' + row_class + '">';
                        html += '<td class="right">' + tmp_s_no + '</td>';
                        html += '<td>' + response[i]['name'] + '</td>';
                        html += '<td >' + response[i]['reference'] + '</td>';
                        html += '<td >' + response[i]['date'] + '</td>';
                        html += '<td >' + response[i]['purchased'] + '</td>';
                        html += '<td >' + response[i]['order_date'] + '</td>';
                        html += '</tr>';
                        tmp_s_no++;
                    }
                    $('#customer_product_list #sfl_customer_product_tbl_body').html(html);

                }
                $('#customer_product_list').modal('show');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Technical error occurred. Contact to support.');
            }
        });
    });

    $('#recommendation-content').on('change', '.banner-upload-btn', function () {
        banner_upload_index = jQuery(this).attr('data-index');
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            var ele = $(this);
            /*Knowband validation start*/
            reader.onload = function (e) {
                var img_err = velovalidation.checkImage(ele, 512000, 'kb');
                var container = 'tr#sfl-banner-' + banner_upload_index;
                var cvar = '';
                if (banner_upload_index == 'banner_1') {
                    cvar = 'b1';
                } else {
                    cvar = 'b2';
                }
                $('.' + cvar).remove();
                if (img_err === true) {
                    $(container + ' .banner_block img').attr('src', e.target.result);
                    $(container).find('input[name="recommendations[content][' + banner_upload_index + '][remove]"]').attr('value', 1);
                    $('#remove_button_'+banner_upload_index).prop('disabled', false);
                } else {
                    $(container).find('.banner_action').after('<span class="validation-advice ' + cvar + '">' + img_err + '</span>');
                    $(container).find('input[name="recommendations[content][' + banner_upload_index + '][remove]"]').attr('value', 0);
                    $(container).find('input[name="banner[' + banner_upload_index + '][file]"]').val('');
                    banner_upload_index = null;
                    $('#remove_button_'+banner_upload_index).prop('disabled', true);
                }
            };
            /*Knowband validation end*/
            reader.readAsDataURL(this.files[0]);
        }
    });
    $('.buy-preview').on('change', function () {
        var col = "#" + this.color;
        document.getElementById("buy_button").style.backgroundColor = col;
    });
});

function renderRecommendOptionHtml(method)
{
    $.ajax({
        url: action,
        data: '&ajax=true&method=' + method,
        dataType: 'html',
        beforeSend: function () {
            $("#recommendation-content").html('<div class="content-loader">&nbsp;</div>');
        },
        success: function (html) {
            $("#recommendation-content").html('');
            $("#recommendation-content").html(html);
            if (method == 'getrecommendproducts') {
                $("#recommendoption_c_list").multipleSelect({
                    placeholder: sfl_l_cat_lbl,
                    filter: true,
                    minumimCountSelected: 0,
                    onCheckAll: function () {
                        getCategoryProducts('recommendoption');
                    },
                    onUncheckAll: function () {
                        getCategoryProducts('recommendoption');
                    },
                    onClick: function (view) {
                        getCategoryProducts('recommendoption');
                    }
                });

                $("#recommendoption_p_list").multipleSelect({
                    placeholder: sfl_l_prod_lbl,
                    filter: true,
                    selectAll: false,
                    minumimCountSelected: 0,
                    onCheckAll: function () {
                        var ids = $("#recommendoption_p_list").multipleSelect("getSelects");
                        for (var i = 0; i < ids.length; i++) {
                            getSelectedRecomProduct(ids.i);
                        }
                    },
                    onUncheckAll: function () {
                        $('#recommended_selected_products tr').not('tr:first').remove();
                        $('#recommended_selected_products').hide();
                    },
                    onClick: function (view) {
                        if (view.checked) {
                            getSelectedRecomProduct(view.value);
                        } else {
                            removeRecommendedSelProduct(view.value);
                        }
                    }
                });
            } else {
                console.log($('input[name="recommendations[content][banner_1][old]"]').val());
                if ($('input[name="recommendations[content][banner_1][old]"]').val() != 'sfl_default_banner.jpg') {
                    $('#remove_button_banner_1').prop('disabled', false);
                } else {
                    $('#remove_button_banner_1').prop('disabled', true);
                }
                console.log($('input[name="recommendations[content][banner_2][old]"]').val());
                if ($('input[name="recommendations[content][banner_2][old]"]').val() != 'sfl_default_banner.jpg') {
                    $('#remove_button_banner_2').prop('disabled', false);
                } else {
                    $('#remove_button_banner_2').prop('disabled', true);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

function renderUploadedBanner(ele)
{
//    if (validateBannerUpload(e.target.result)) {
//        var container = 'tr#sfl-banner-' + banner_upload_index;
//        $(container + ' .banner_block img').attr('src', e.target.result);
//        $(container).find('input[name="recommendations[content][' + banner_upload_index + '][remove]"]').attr('value', 1);
//    } else {
//        banner_upload_index = null;
//        alert('File format is invalid');
//    }
    var img_err = velovalidation.checkImage(ele);
    if (img_err === true) {
        var container = 'tr#sfl-banner-' + banner_upload_index;
//        $(container + ' .banner_block img').attr('src', ele.target.result);
        $(container).find('input[name="recommendations[content][' + banner_upload_index + '][remove]"]').attr('value', 1);
    } else {
        banner_upload_index = null;
        alert(img_err);
//        alert('File format is invalid');
    }
}

function validateBannerUpload(val)
{
    var img_format = ['jpeg', 'png', 'jpg', 'gif'];
    for (var i = 0; i < img_format.length; i++)
    {
        var str = 'image/' + img_format[i];
        if (val.indexOf(str.toLowerCase()) > -1) {
            return true;
        }
    }
    return false;
}

function removeBanner(e, row)
{
    $(e).parent().find('input[name="recommendations[content][' + row + '][remove]"]').attr('value', 1);
    $(e).parent().find('input[name="banner[' + row + '][file]"]').val('');
    $('#sfl-banner-' + row + ' .banner_block').html(default_image_url);
    $('#remove_button_'+row).prop('disabled', true);
}

function saveRecommendationOption()
{
    $('.validation-advice').remove();
    $('input[name="recommendations[content][banner_1][link]"]').removeClass('velsof-error-field');
    $('input[name="recommendations[content][banner_2][link]"]').removeClass('velsof-error-field');
    $('input[name="recommendations[content][banner_1][title]"]').removeClass('velsof-error-field');
    $('input[name="recommendations[content][banner_2][title]"]').removeClass('velsof-error-field');
    var error = false;
    var check = false;
    $('.recommendation_option').each(function(){
        if($(this).is(':checked')){
            if($(this).val() == 1){
                check = true;
            }
        }
    });
    if (check) {
        /*Knowband validation start*/
        var ban_url_1_err = velovalidation.checkUrl($('input[name="recommendations[content][banner_1][link]"]'));
        if (ban_url_1_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_1][link]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_1][link]"]').after('<span class="validation-advice">' + ban_url_1_err + '</span>');
        }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var ban_url_2_err = velovalidation.checkUrl($('input[name="recommendations[content][banner_2][link]"]'));
        if (ban_url_2_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_2][link]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_2][link]"]').after('<span class="validation-advice">' + ban_url_2_err + '</span>');
        }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var ban_title_1_err = velovalidation.checkTags($('input[name="recommendations[content][banner_1][title]"]'));
        if (ban_title_1_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_1][title]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_1][title]"]').after('<span class="validation-advice">' + ban_title_1_err + '</span>');
        } else {
        
        var ban_title_1_err = velovalidation.checkHtmlTags($('input[name="recommendations[content][banner_1][title]"]'));
        if (ban_title_1_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_1][title]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_1][title]"]').after('<span class="validation-advice">' + ban_title_1_err + '</span>');
        }
    }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var ban_title_2_err = velovalidation.checkTags($('input[name="recommendations[content][banner_2][title]"]'));
        if (ban_title_2_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_2][title]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_2][title]"]').after('<span class="validation-advice">' + ban_title_2_err + '</span>');
        } else {
         
        var ban_title_2_err = velovalidation.checkHtmlTags($('input[name="recommendations[content][banner_2][title]"]'));
        if (ban_title_2_err != true) {
            var error = true;
            $('input[name="recommendations[content][banner_2][title]"]').addClass('velsof-error-field');
            $('input[name="recommendations[content][banner_2][title]"]').after('<span class="validation-advice">' + ban_title_2_err + '</span>');
        }
    }
        /*Knowband validation end*/
    }

//    recommendations[content][banner_2][link]
    if (error) {
        return false;
    }
    $('#save_rec').attr('disabled', 'disabled');
    $('#recommention_option_form').submit();
}

function getSelectedRecomProduct(id_product)
{
    $.ajax({
        url: action,
        type: 'POST',
        dataType: 'json',
        data: '&ajax=true&method=getselectedrecomproducts&id_product=' + id_product,
        beforeSend: function () {

        },
        success: function (json) {
            $('.sfl_product_loader_img').hide();
            var response = $.map(json, function (el) {
                return el;
            });
            if (response.length)
            {
                renderSelectedRecomendProductRow(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

function renderSelectedRecomendProductRow(data)
{
    var id = 'recommended-sel-pro-' + data[0];
    if (!$('#recommended_selected_products #' + id).length) {
        var html = '<tr id="' + id + '">';
        html += '<td class="selected-item-cell cell-pro-image">' + data[3] + '</td>';
        html += '<td class="selected-item-cell span5">' + data[1] + '<small>Reference: ' + data[2] + '</small></td>';
        html += '<td class="selected-item-cell cls-row-cell">';
        html += '<span class="sfl-close-icn" onclick="removeRecommendedSelProduct(' + data[0] + ')"></span>';
        html += '</td>';
        html += '</tr>';

        if ($('#recommended_selected_products tr').length > 1) {
            $('#recommended_selected_products tr:nth-child(2)').before(html);
        } else {
            $('#recommended_selected_products').append(html);
        }
        $('#recommended_selected_products').show();
    }
}

function removeRecommendedSelProduct(id_product)
{
    var id = 'recommended-sel-pro-' + id_product;
    if ($('#recommended_selected_products #' + id).length) {
        $('#recommended_selected_products #' + id).remove();
        if ($('#recommended_selected_products tr').length == 1) {
            $('#recommended_selected_products').hide();
        }
        $('#recommendoption_p_list').find('option[value="' + id_product + '"]').removeAttr('selected');
        $('#recommendoption_p_list').multipleSelect("refresh");
    }
}

function process_category(e)
{
    var report_type = $(e).attr('id').split('-');
    sfl_analysis_type = report_type[0];
    if ($(e).find('option:selected').attr('value') == 0) {
        $('#' + sfl_analysis_type + '_p_list').empty();
        $('#' + sfl_analysis_type + '_p_list').find('option').remove().end();
        $('#' + sfl_analysis_type + '_p_list').multipleSelect("refresh");
        $('#' + sfl_analysis_type + '_p_list').multipleSelect("uncheckAll");
        $('#' + sfl_analysis_type + '_c_list').multipleSelect("refresh");
        $('#' + sfl_analysis_type + '_c_list').multipleSelect("uncheckAll");
        $('#' + sfl_analysis_type + '_cat_filter').show();
    } else {
        $('#' + sfl_analysis_type + '_cat_filter').hide();
        $('#' + sfl_analysis_type + '_c_list').multipleSelect("refresh");
        $('#' + sfl_analysis_type + '_c_list').multipleSelect("checkAll");
        getCategoryProducts(sfl_analysis_type);
        $('#' + sfl_analysis_type + '_type_loader').hide();
    }
}

function getCategoryProducts(drop_down_elem)
{
    var categories = $('#' + drop_down_elem + '_c_list').multipleSelect("getSelects");
    if (categories.length == 0) {
        categories = '';
    } else {
        categories = categories.join(',');
    }
    var stored_cat = '';
    switch(drop_down_elem) {
        case 'sfl_prod_analysis':
            stored_cat = selected_cat_product_analysis;
            selected_cat_product_analysis = categories;
            break;
        case 'sfl_cust_analysis':
            stored_cat = selected_cat_customer_analysis;
            selected_cat_customer_analysis = categories;
            break;
        case 'sfl_order_analysis':
            stored_cat = selected_cat_order_analysis;
            selected_cat_order_analysis = categories;
            break;
        case 'recommendoption':
            stored_cat = selected_cat_recommend_analysis;
            selected_cat_recommend_analysis = categories;
            break;
    }
    
    if (stored_cat === categories) {
        return;
    }
    
    $.ajax({
        url: action,
        type: 'POST',
        dataType: 'json',
        data: '&ajax=true&method=getcategoryproducts&categories=' + categories,
        beforeSend: function () {
            $('.sfl_product_loader_img').show();
            $('#' + drop_down_elem + '_type_loader').show();
        },
        success: function (json) {
            $('.sfl_product_loader_img').hide();
            $('#' + drop_down_elem + '_type_loader').hide();
            var response = $.map(json, function (el) {
                return el;
            });
            $('#' + drop_down_elem + '_p_list').empty();
            $('#' + drop_down_elem + '_p_list').find('option').remove().end();
            for (var i = 0; i < response.length; i++) {
                $('#' + drop_down_elem + '_p_list').append($("<option/>", {
                    value: response[i]['id_product'],
                    text: response[i]['name'] + '(' + response[i]['reference'] + ')'
                }));
            }
            $('#' + drop_down_elem + '_p_list').multipleSelect("refresh");
            $('#' + drop_down_elem + '_p_list').multipleSelect("uncheckAll");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.sfl_product_loader_img').hide();
            alert('Technical error occurred. Contact to support.');
        }
    });
}



var is_product_graph_loaded = false;
var is_customer_graph_loaded = false;
var is_order_graph_loaded = false;
function setReportvar(param)
{
    if (param == 'preport' && !is_product_graph_loaded) {
        is_product_graph_loaded = true;
        sfl_analysis_type = 'sfl_prod_analysis';
        getProductAnalysisReport('sfl_prod_analysis');
    } else if (param == 'creport' && !is_customer_graph_loaded) {
        is_customer_graph_loaded = true;
        sfl_analysis_type = 'sfl_cust_analysis';
        getCustomerAnalysisReport('sfl_cust_analysis');
    } else if (param == 'oreport' && !is_order_graph_loaded) {
        is_order_graph_loaded = true;
        sfl_analysis_type = 'sfl_order_analysis';
        getOrderAnalysisReport('sfl_order_analysis');
    }
}


var filter_params = {};
function prepareFilterVariable(tab, report_type)
{
    filter_params = {};
    var error = false;
    var date_from = $('#' + tab + '_from_date').val();
    var date_to = $("#" + tab + "_to_date").val();
    var from = new Date(date_from);
    var to = new Date(date_to);

    if (from > to)
    {
        $("#" + tab + "_date_error").html(sfl_date_error);
        error = true;
    }

    if (!error) {
        var tmp = [];
        var products = '';
        tmp = $('#' + tab + '_p_list').multipleSelect("getSelects");
        if (tmp.length) {
            products = tmp.join(',');
        }

        filter_params.products = products;
        filter_params.from_date = date_from;
        filter_params.to_date = date_to;
        +'&from_date=' + date_from
                + '&to_date=' + date_to
                + '&report_type=' + type;

        if (report_type == 1) {
            var categories = '';
            tmp = $('#' + tab + '_c_list').multipleSelect("getSelects");
            if (tmp.length) {
                categories = tmp.join(',');
            }
            var type = $('#' + tab + '-type_list').val();
            filter_params.type = type;
            if (type == 0) {
                filter_params.categories = categories;
            }
        }
    }

    return error;
}

/* Start - Product Analysis Report */

var product_analysis_params = {};

function getProductAnalysisReport(tab)
{
    if (!prod_click) {
        return false;
    }
    var error = prepareFilterVariable(tab, 1);

    if (!error)
    {
        var params = '&type=' + filter_params.type
                + '&products=' + filter_params.products
                + '&from_date=' + filter_params.from_date
                + '&to_date=' + filter_params.to_date;

        product_analysis_params = {
            'type': filter_params.type,
            'products': filter_params.products,
            'from_date': filter_params.from_date,
            'to_date': filter_params.to_date
        };


        if (filter_params.type == 0) {
            params += '&categories=' + filter_params.categories;
            product_analysis_params.categories = filter_params.categories;
        }
        var error_val = false;
        /*Knowband validation start*/
        var from_prod_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_prod_analysis_from_date"]'));
        if (from_prod_date_err != true) {
            error_val = true;
            $('input[name="sfl_prod_analysis_from_date"]').addClass('velsof-error-field');
            $('input[name="sfl_prod_analysis_from_date"]').after('<span class="validation-advice">' + from_prod_date_err + '</span>');
        }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var to_prod_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_prod_analysis_to_date"]'));
        if (to_prod_date_err != true) {
            error_val = true;
            $('input[name="sfl_prod_analysis_to_date"]').addClass('velsof-error-field');
            $('input[name="sfl_prod_analysis_to_date"]').after('<span class="validation-advice">' + to_prod_date_err + '</span>');
        }
        /*Knowband validation end*/

        if (!error_val) {
            $.ajax({
                url: action + '&ajax=true&method=product_analysis',
                type: 'POST',
                dataType: 'json',
                data: params,
                beforeSend: function () {
                    $('#sfl_product_analysis_loader').css('display', 'inline-block');
                    prod_click = false;
                },
                success: function (json) {
                    $('#sfl_product_analysis_loader').hide();
                    var html = '';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th class="s_no">' + sfl_s_no_title + '</th>';
                    if (filter_params.type == 0) {
                        $('#sfl_prod_analysis_graph_title').html(sfl_category_label + ' ' + sfl_statistics_label);
                        $('#sfl_prod_analysis_list_title').html(sfl_category_label + ' ' + sfl_list_label);
                        html += '<th >' + sfl_category_name_title + '</th>';
                        html += '<th >' + sfl_products_count + '</th>';

                    } else if (filter_params.type == 1) {
                        $('#sfl_prod_analysis_graph_title').html(sfl_product_label + ' ' + sfl_statistics_label);
                        $('#sfl_prod_analysis_list_title').html(sfl_product_label + ' ' + sfl_list_label);
                        html += '<th >' + sfl_product_name_title + '</th>';
                        html += '<th >' + sfl_num_of_customer + '</th>';
                    }
                    html += '</tr>';
                    html += '</thead>';

                    html += '<tbody id="sfl_prod_analysis_tbl_body">';

                    if (json['flag'] == true) {
                        if (json['graph'].length > 0) {
                            if (filter_params.type == 0) {
                                productAnalysisGraph('sfl_prod_analysis_graph', json['graph'], sfl_top_10_cat_label, sfl_num_of_products);
                            } else if (filter_params.type == 1) {
                                productAnalysisGraph('sfl_prod_analysis_graph', json['graph'], sfl_top_10_product_label, sfl_num_of_customer);
                            }
                        } else {
                            $('#sfl_prod_analysis_graph').html('<div class="no_chart"><span>' + empty_list_msg + '</span></div>');
                        }

                        var i = 0;
                        var row_class = 'odd';
                        var tmp_s_no = 1;
                        for (i = 0; i < json['data'].length; i++) {
                            if (i % 2 == 0)
                                row_class = 'even';
                            html += '<tr class="pure-table-' + row_class + '">';
                            html += '<td class="right">' + tmp_s_no + '</td>';
                            html += '<td >' + json['data'][i]['name'] + '</td>';
                            if (filter_params.type == 0) {
                                html += '<td class="right"><a href="javascript:void(0)" title="click to view products" onclick="displayCategoryProduct(' + json['data'][i]['id'] + ')">' + json['data'][i]['count'] + '</a></td>';
                            } else {
                                html += '<td class="right">' + json['data'][i]['count'] + '</td>';
                            }
                            html += '</tr>';
                            tmp_s_no++;
                        }
                        sfl_product_analysis_page_number = 1;

                    } else {
                        $('#sfl_prod_analysis_graph').html('<div class="no_chart"><span>' + empty_list_msg + '</span></div>');
                        var html = '<tr class="pure-table-odd empty-tbl"><td colspan="3" class="center"><span>' + empty_list_msg + '</span></td><tr>';
                    }
                    html += '</tbody>';
                    $('#sfl_prod_analysis_list_table_blk table').html(html);

                    $('#sfl_prod_analysis_list_table_blk .paginator-block').html(json['pagination']);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('Technical error occurred. Contact to support.');
                },
                complete: function () {
                    prod_click = true;
                }
            });
        }
    }
}

function getProductAnalysisTableReport(page)
{
    var sfl_analysis_id = 'sfl_prod_analysis';
    var params = '&type=' + product_analysis_params.type
            + '&products=' + product_analysis_params.products
            + '&from_date=' + product_analysis_params.from_date
            + '&to_date=' + product_analysis_params.to_date;
    if (product_analysis_params.type == '0' || product_analysis_params.type == 0) {
        params += '&categories=' + product_analysis_params.categories;
    }
    $.ajax({
        url: action + '&ajax=true&method=product_analysis',
        type: 'POST',
        dataType: 'json',
        data: params + '&fetch_graph=false+&page_number=' + page,
        beforeSend: function () {
            $('#sfl_prod_analysis_list_table_blk .tbl-bigloader').show();
        },
        success: function (json) {
            $('#sfl_prod_analysis_list_table_blk .tbl-bigloader').hide();
            if (json['flag'] == true) {

                var html = '';
                var i = 0;
                var row_class = 'odd';
                var tmp_s_no = (page == 1) ? 1 : page + 1;
                for (i = 0; i < json['data'].length; i++) {
                    if (i % 2 == 0)
                        row_class = 'even';
                    html += '<tr class="pure-table-' + row_class + '">';
                    html += '<td class="right">' + tmp_s_no + '</td>';
                    html += '<td >' + json['data'][i]['name'] + '</td>';
                    if (product_analysis_params.type == 0) {
                        html += '<td class="right"><a href="javascript:void(0)" title="click to view products" onclick="displayCategoryProduct(' + json['data'][i]['id'] + ')">' + json['data'][i]['count'] + '</a></td>';
                    } else {
                        html += '<td class="right">' + json['data'][i]['count'] + '</td>';
                    }
                    html += '</tr>';
                    tmp_s_no++;
                }
                $('#' + sfl_analysis_id + '_tbl_body').html(html);
                sfl_product_analysis_page_number = page;

            } else {
                var html = '<tr class="pure-table-odd empty-tbl"><td colspan="3" class="center"><span>' + empty_list_msg + '</span></td><tr>';
                $('#' + sfl_analysis_id + '_tbl_body').html(html);
            }
            $('#sfl_prod_analysis_list_table_blk .paginator-block').html(json['pagination']);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

function productAnalysisGraph(container, data, xaxis_label, bar_label)
{
    var graph_data = [], ticks = [];
    var i, j;

    var length = 10;
    if (data.length < 10) {
        length = data.length;
    }

    for (i = 0; i < length; i++) {
        ticks.push([i, data[i]['label']]);
        graph_data.push([i, data[i]['count']]);
    }

    var dataset = [
        {
            label: bar_label,
            data: graph_data,
            bars: {order: 1, fillColor: '#edc240', lineWidth: 0}
        }
    ];

    var options = {
        series: {
            grow: {active: true}
        },
        bars: {
            show: true,
            barWidth: 0.2,
            fill: 1
        },
        xaxis: {
            axisLabel: xaxis_label,
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10,
            ticks: ticks
        },
        legend: {
            noColumns: 0,
            labelBoxBorderColor: "#000000",
            position: "ne"
        },
        grid: {
            hoverable: true,
            borderWidth: 1,
            axisMargin: 20,
            backgroundColor: {colors: ["#ffffff", "#EDF5FF"]}
        }
    };

    $.plot($("#" + container), dataset, options);
    $("#" + container).CreateVerticalGraphToolTip();
}

function displayCategoryProduct(id_category) {
    var params = '&products=' + product_analysis_params.products
            + '&from_date=' + product_analysis_params.from_date
            + '&to_date=' + product_analysis_params.to_date;

    var html = '<tr class="pure-table-odd empty-tbl"><td colspan="6" class="center"><span>' + empty_list_msg + '</span></td><tr>'
    $('#m_category_product_list #m_category_product_list_tbl_body').html(html);
    $.ajax({
        url: action,
        type: 'POST',
        data: '&ajax=true&method=getsavedproduct&id_category=' + id_category + params,
        dataType: 'json',
        success: function (json) {
            var response = $.map(json, function (el) {
                return el;
            });
            if (response.length > 0) {
                html = '';
                var i = 0;
                var row_class = 'odd';
                var tmp_s_no = 1;
                for (i = 0; i < response.length; i++) {
                    if (i % 2 == 0)
                        row_class = 'even';
                    html += '<tr class="pure-table-' + row_class + '">';
                    html += '<td class="right">' + tmp_s_no + '</td>';
                    html += '<td>' + response[i]['name'] + '</td>';
                    html += '<td >' + response[i]['reference'] + '</td>';
                    html += '<td >' + response[i]['count'] + '</td>';
                    html += '</tr>';
                    tmp_s_no++;
                }
                $('#m_category_product_list #m_category_product_list_tbl_body').html(html);

            }
            $('#m_category_product_list').modal('show');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

/* End - Product Analysis Report */

/* Start - Customer Analysis Report */

var customer_analysis_params = {};
function getCustomerAnalysisReport(tab)
{
    
/*Knowband button validation start*/
    if (!cust_click) {
        return false;
    }
/*Knowband button validation end*/
    var error = prepareFilterVariable(tab, 2);
    if (!error)
    {
        var params = '&products=' + filter_params.products
                + '&from_date=' + filter_params.from_date
                + '&to_date=' + filter_params.to_date;

        customer_analysis_params = {
            'products': filter_params.products,
            'from_date': filter_params.from_date,
            'to_date': filter_params.to_date
        };

        var error_val = false;
        /*Knowband validation start*/
        var from_cus_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_order_analysis_from_date"]'));
        if (from_cus_date_err != true) {
            error_val = true;
            $('input[name="sfl_order_analysis_from_date"]').addClass('velsof-error-field');
            $('input[name="sfl_order_analysis_from_date"]').after('<span class="validation-advice">' + from_cus_date_err + '</span>');
        }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var to_cust_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_order_analysis_to_date"]'));
        if (to_cust_date_err != true) {
            error_val = true;
            $('input[name="sfl_order_analysis_to_date"]').addClass('velsof-error-field');
            $('input[name="sfl_order_analysis_to_date"]').after('<span class="validation-advice">' + to_cust_date_err + '</span>');
        }
        /*Knowband validation end*/
        if (!error_val) {
            $.ajax({
                url: action + '&ajax=true&method=customer_analysis',
                type: 'POST',
                dataType: 'json',
                data: params,
                beforeSend: function () {
                    $('#' + tab + '_loader').css('display', 'inline-block');
                    cust_click = false;
                },
                success: function (json) {
                    $('#' + tab + '_loader').hide();
                    var html = '';

                    if (json['flag'] == true) {

                        var i = 0;
                        var row_class = 'odd';
                        var tmp_s_no = 1;
                        for (i = 0; i < json['data'].length; i++) {
                            if (i % 2 == 0)
                                row_class = 'even';
                            html += '<tr class="pure-table-' + row_class + '">';
                            html += '<td class="right">' + tmp_s_no + '</td>';
                            html += '<td ><a class="sfl_customer_products" href="javascript:void(0)" type="' + json['data'][i]['id'] + '">' + json['data'][i]['firstname'] + ' ' + json['data'][i]['lastname'] + '</a></td>';
                            html += '<td >' + json['data'][i]['email'] + '</td>';
                            html += '<td class="right"><a class="sfl_customer_products" href="javascript:void(0)" type="' + json['data'][i]['id'] + '">' + json['data'][i]['count'] + '</a></td>';
                            html += '</tr>';
                            tmp_s_no++;
                        }
                        sfl_cust_analysis_page_number = 1;

                    } else {
                        var html = '<tr class="pure-table-odd empty-tbl"><td colspan="4" class="center"><span>' + empty_list_msg + '</span></td><tr>';
                    }
                    html += '</tbody>';
                    $('#' + tab + '_tbl_body').html(html);

                    $('#' + tab + '_list_table_blk .paginator-block').html(json['pagination']);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('Technical error occurred. Contact to support.');
                },
                complete: function () {
                    cust_click = true;
                }
            });
        }
    }
}

function getCustomerAnalysisTableReport(page)
{
    var sfl_analysis_id = 'sfl_cust_analysis';
    var params = '&products=' + customer_analysis_params.products
            + '&from_date=' + customer_analysis_params.from_date
            + '&to_date=' + customer_analysis_params.to_date;

    $.ajax({
        url: action + '&ajax=true&method=customer_analysis',
        type: 'POST',
        dataType: 'json',
        data: params + '&page_number=' + page,
        beforeSend: function () {
            $('#' + sfl_analysis_id + '_list_table_blk .tbl-bigloader').show();
        },
        success: function (json) {
            $('#' + sfl_analysis_id + '_list_table_blk .tbl-bigloader').hide();
            if (json['flag'] == true) {

                var html = '';
                var i = 0;
                var row_class = 'odd';
                var tmp_s_no = (page == 1) ? 1 : page + 1;
                for (i = 0; i < json['data'].length; i++) {
                    if (i % 2 == 0)
                        row_class = 'even';
                    html += '<tr class="pure-table-' + row_class + '">';
                    html += '<td class="right">' + tmp_s_no + '</td>';
                    html += '<td><a class="sfl_customer_products" href="javascript:void(0)" type="' + json['data'][i]['id'] + '">' + json['data'][i]['firstname'] + ' ' + json['data'][i]['lastname'] + '</a></td>';
                    html += '<td >' + json['data'][i]['email'] + '</td>';
                    html += '<td class="right"><a class="sfl_customer_products" href="javascript:void(0)" type="' + json['data'][i]['id'] + '">' + json['data'][i]['count'] + '</a></td>';
                    html += '</tr>';
                    tmp_s_no++;
                }
                sfl_cust_analysis_page_number = page;

            } else {
                var html = '<tr class="pure-table-odd empty-tbl"><td colspan="4" class="center"><span>' + empty_list_msg + '</span></td><tr>';
            }
            $('#' + sfl_analysis_id + '_tbl_body').html(html);
            $('#' + sfl_analysis_id + '_list_table_blk .paginator-block').html(json['pagination']);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

/* End - Customer Analysis Report */

/* Start - Order Analysis Report */

var order_analysis_params = {};
function getOrderAnalysisReport(tab)
{
    /*Knowband button validation start*/
    if (!ord_click) {
        return false;
    }
    /*Knowband button validation end*/
    var error = prepareFilterVariable(tab, 3);
    if (!error)
    {
        var params = '&products=' + filter_params.products
                + '&from_date=' + filter_params.from_date
                + '&to_date=' + filter_params.to_date;

        order_analysis_params = {
            'products': filter_params.products,
            'from_date': filter_params.from_date,
            'to_date': filter_params.to_date
        };

        var error_val = false;

        /*Knowband validation start*/
        var from_cus_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_cust_analysis_from_date"]'));
        if (from_cus_date_err != true) {
            error_val = true;
            $('input[name="sfl_cust_analysis_from_date"]').addClass('velsof-error-field');
            $('input[name="sfl_cust_analysis_from_date"]').after('<span class="validation-advice">' + from_cus_date_err + '</span>');
        }
        /*Knowband validation end*/
        /*Knowband validation start*/
        var to_cust_date_err = velovalidation.checkDatemmddyy($('input[name="sfl_cust_analysis_to_date"]'));
        if (to_cust_date_err != true) {
            error_val = true;
            $('input[name="sfl_cust_analysis_to_date"]').addClass('velsof-error-field');
            $('input[name="sfl_cust_analysis_to_date"]').after('<span class="validation-advice">' + to_cust_date_err + '</span>');
        }
        /*Knowband validation end*/
        if (!error_val) {
            $.ajax({
                url: action + '&ajax=true&method=order_analysis',
                type: 'POST',
                dataType: 'json',
                data: params,
                beforeSend: function () {
                    $('#' + tab + '_loader').css('display', 'inline-block');
                    ord_click = false;
                },
                success: function (json) {
                    $('#' + tab + '_loader').hide();

                    if (json['graph'].length) {
                        drawOrderGraph(json['graph']);
                    } else {
                        $('#sfl_order_analysis_graph').html('<div class="no_chart"><span>' + empty_list_msg + '</span></div>');
                    }

                    var html = '';

                    if (json['flag'] == true) {

                        var i = 0;
                        var row_class = 'odd';
                        var tmp_s_no = 1;
                        for (i = 0; i < json['data'].length; i++) {
                            if (i % 2 == 0)
                                row_class = 'even';
                            html += '<tr class="pure-table-' + row_class + '">';
                            html += '<td class="right">' + tmp_s_no + '</td>';
                            html += '<td >' + json['data'][i]['firstname'] + ' ' + json['data'][i]['lastname'] + '</td>';
                            html += '<td >' + json['data'][i]['email'] + '</td>';
                            html += '<td >' + json['data'][i]['name'] + '</td>';
                            html += '<td >' + json['data'][i]['reference'] + '</td>';
                            html += '<td >' + json['data'][i]['date_add'] + '</td>';
                            html += '<td >' + json['data'][i]['status'] + '</td>';
                            html += '<td >' + json['data'][i]['order_date'] + '</td>';
                            html += '</tr>';
                            tmp_s_no++;
                        }
                        sfl_order_analysis_page_number = 1;

                    } else {
                        var html = '<tr class="pure-table-odd empty-tbl"><td colspan="8" class="center"><span>' + empty_list_msg + '</span></td><tr>';
                    }
                    html += '</tbody>';
                    $('#' + tab + '_tbl_body').html(html);

                    $('#' + tab + '_list_table_blk .paginator-block').html(json['pagination']);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('Technical error occurred. Contact to support.');
                },
                complete: function () {
                    ord_click = true;
                }
            });
        }
    }
}

function drawOrderGraph(data)
{
    var saved_data = [], ticks = [], purchased_data = [];
    var i;

    var length = data.length;

    for (i = 0; i < length; i++)
    {
        ticks.push([i, String(data[i]['tick'])]);
        saved_data.push([i, parseInt(data[i]['saved'])]);
        purchased_data.push([i, parseInt(data[i]['purchased'])]);
    }

    if (saved_data.length > 0 || purchased_data.length > 0)
    {
        var dataset = [
            {
                label: sfl_saved_label,
                data: saved_data,
                bars: {order: 1, lineWidth: 0}
            },
            {
                label: sfl_purchased_label,
                data: purchased_data,
                bars: {order: 2, lineWidth: 0}
            }
        ];

        var options = {
            bars: {
                show: true,
                barWidth: 0.2,
                fill: 1
            },
            series: {
                grow: {active: true}
            },
            xaxis: {
                ticks: ticks,
                axisLabel: sfl_date_label_graph
            },
            legend: {
                noColumns: 0,
                backgroundColor: null,
                backgroundOpacity: 0.9,
                labelBoxBorderColor: null,
                position: "nw"
            },
            grid: {
                hoverable: true,
                borderWidth: 1,
                borderColor: '#EEEEEE',
                mouseActiveRadius: 10,
                backgroundColor: "#ffffff",
                axisMargin: 20
            }
        };

        $.plot($("#sfl_order_analysis_graph"), dataset, options);
        $("#sfl_order_analysis_graph").CreateVerticalGraphToolTip();
    }
    else
    {
        $('#sfl_order_analysis_graph').html('<div class="no_chart"><span>' + empty_list_msg + '</span></div>');
    }

}

function getOrderAnalysisTableReport(page)
{
    var sfl_analysis_id = 'sfl_order_analysis';
    var params = '&products=' + order_analysis_params.products
            + '&from_date=' + order_analysis_params.from_date
            + '&to_date=' + order_analysis_params.to_date;

    $.ajax({
        url: action + '&ajax=true&method=order_analysis',
        type: 'POST',
        dataType: 'json',
        data: params + '&page_number=' + page,
        beforeSend: function () {
            $('#' + sfl_analysis_id + '_list_table_blk .tbl-bigloader').show();
        },
        success: function (json) {
            $('#' + sfl_analysis_id + '_list_table_blk .tbl-bigloader').hide();
            if (json['flag'] == true) {

                var html = '';
                var i = 0;
                var row_class = 'odd';
                var tmp_s_no = (page == 1) ? 1 : page + 1;
                for (i = 0; i < json['data'].length; i++) {
                    if (i % 2 == 0)
                        row_class = 'even';
                    html += '<tr class="pure-table-' + row_class + '">';
                    html += '<td class="right">' + tmp_s_no + '</td>';
                    html += '<td >' + json['data'][i]['firstname'] + ' ' + json['data'][i]['lastname'] + '</td>';
                    html += '<td >' + json['data'][i]['email'] + '</td>';
                    html += '<td >' + json['data'][i]['name'] + '</td>';
                    html += '<td >' + json['data'][i]['reference'] + '</td>';
                    html += '<td >' + json['data'][i]['date_add'] + '</td>';
                    html += '<td >' + json['data'][i]['status'] + '</td>';
                    html += '<td >' + json['data'][i]['order_date'] + '</td>';
                    tmp_s_no++;
                }
                sfl_order_analysis_page_number = page;

            } else {
                var html = '<tr class="pure-table-odd empty-tbl"><td colspan="8" class="center"><span>' + empty_list_msg + '</span></td><tr>';
            }
            $('#' + sfl_analysis_id + '_tbl_body').html(html);
            $('#' + sfl_analysis_id + '_list_table_blk .paginator-block').html(json['pagination']);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Technical error occurred. Contact to support.');
        }
    });
}

/* End - Order Analysis Report */

function resetReport(tab, type)
{
    if (type == 1) {
        $('#' + tab + '-type_list').find('option').removeAttr('selected');
        $('#' + tab + '_cat_filter').show();
    }
    $('#' + tab + '_c_list').multipleSelect("refresh");
    $('#' + tab + '_c_list').multipleSelect("uncheckAll");

    $('#' + tab + '_p_list').empty();
    $('#' + tab + '_p_list').find('option').remove().end();
    $('#' + tab + '_p_list').multipleSelect("refresh");
    $('#' + tab + '_p_list').multipleSelect("uncheckAll");

    $('#' + tab + '_from_date').attr('value', '');
    $("#" + tab + "_to_date").attr('value', '');

    process_category($('#' + tab + '-type_list'));

    if (type == 1) {
        getProductAnalysisReport(tab);
    } else if (type == 2) {
        getCustomerAnalysisReport(tab);
    } else if (type == 2) {
        getOrderAnalysisReport(tab);
    }
}

function getExcelReport(tab, type)
{
    if (!export_prod_click) {
        return false;
    }
    $('#' + tab + '_msg_bar').hide();
    $('#' + tab + '_msg_bar').html('');
    var date_from = $('#' + tab + '_from_date').val();
    var date_to = $("#" + tab + "_to_date").val();

    var from = new Date(date_from);
    var to = new Date(date_to);
    var error = false;
    $("#" + tab + "_date_error").html('');
    if (from > to)
    {
        $('#' + tab + '_msg_bar').html(sfl_date_error);
        $('#' + tab + '_msg_bar').show();
        setTimeout(function () {
            $('#' + tab + '_msg_bar').hide();
            $('#' + tab + '_msg_bar').html('');
        }, message_delay);
        error = true;
    }

    if (!error)
    {
        var tmp = [];
        var products = '';
        tmp = $('#' + tab + '_p_list').multipleSelect("getSelects");
        if (tmp.length) {
            products = tmp.join(',');
        }

        var params = '&products=' + products
                + '&from_date=' + date_from
                + '&to_date=' + date_to
                + '&report_type=' + type;

        if (type == 1) {
            var categories = '';
            tmp = $('#' + tab + '_c_list').multipleSelect("getSelects");
            if (tmp.length) {
                categories = tmp.join(',');
            }
            var report_type = $('#' + tab + '-type_list').val();
            params += '&type=' + report_type;
            if (report_type == 0) {
                params += '&categories=' + categories;
            }
        }

        $.ajax({
            url: action + '&ajax=true&method=csv',
            type: 'POST',
            data: params,
            beforeSend: function () {
                $('#' + tab + '_loader').css('display', 'inline-block');
                export_prod_click = false;
            },
            dataType: 'json',
            success: function (json) {
                $('#' + tab + '_loader').hide();
                if (json['error'] == false)
                {
                    window.location.href = download_url + json['url'];
                }
                else
                {
                    $('#' + tab + '_msg_bar').html(json['msg']);
                    $('#' + tab + '_msg_bar').show();
                    setTimeout(function () {
                        $('#' + tab + '_msg_bar').hide();
                        $('#' + tab + '_msg_bar').html('');
                    }, message_delay);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Technical error occurred. Contact to support.');
            },
            complete: function () {
                export_prod_click = true;
            }
        });
    }
}

var previousPoint = null, previousLabel = null;
$.fn.CreateVerticalGraphToolTip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                var color = item.series.color;
                sfl_graph_showTooltip(item.pageX, item.pageY, color,
                        "<strong>" + item.series.label + "</strong>" +
                        " : <strong>" + y + "</strong> ");
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

function sfl_graph_showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 20,
        border: '1px solid ' + color,
        padding: '3px',
        'font-size': '11px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}