{addJsDef sfl_already_added_products=$sfl_aleady_added_products}
{addJsDef sfl_shortlist_text=$sfl_shorlist_text}
{addJsDef sfl_already_added_text=$sfl_already_added_text}
<script type="text/javascript">
    var sry_txt = "{l s='Sorry' mod='saveforlater'}";
    var no_sfl_data = "{l s='No data found. Add products to shortlist first.' mod='saveforlater'}";
    var no_rviewed_data = "{l s='No recently viewed products found.' mod='saveforlater'}";
    var try_again_msg = "{l s='Sorry! Please try again after some time.' mod='saveforlater'}";
    var request_failed_msg = "{l s='Request Failed' mod='saveforlater'}";
    var product_remove_msg = "{l s='Error occurred while removing product.' mod='saveforlater'}";
    var ajaxurl = "{$ajaxurl|escape:'quotes':'UTF-8'}";
    var buy_button_background = "{$kb_sfl_config['general']['buy_color']|escape:'quotes':'UTF-8'}";
    var saveforlater_enable = {$saveforlater_enable|escape:'htmlall':'UTF-8'};    
</script>
<div id='sfl_add_product'> 
    <input type="hidden" name="sfl_shortproduct_id" id='sfl_shortproduct_id' value="0">
</div>


<style>
    .stored-settings
    {
        -moz-box-shadow: 0 0 0 4px {$kb_sfl_config['general']['border_color']|escape:'quotes':'UTF-8'};
        -webkit-box-shadow: 0 0 0 4px {$kb_sfl_config['general']['border_color']|escape:'quotes':'UTF-8'};
        box-shadow: 0 0 0 4px {$kb_sfl_config['general']['border_color']|escape:'quotes':'UTF-8'};
    }
</style>

{if $kb_sfl_config['general']['enable']}
    <div class="bottom_bar" style="background: {$kb_sfl_config['general']['bar_color']|escape:'quotes':'UTF-8'} {if $kb_sfl_config['saveforlater']['enable'] eq 0 && $kb_sfl_config['recently_view']['enable'] eq 0 && $kb_sfl_config['recommendation']['enable'] eq 0}visibility: hidden; border-top: none;{/if}">
        {if $kb_sfl_config['saveforlater']['enable'] == 1}
            <span class='bar_item'>
                <span class='velsof_item' id="border_short">
                    <span class="bar_icons" id='shortlist_icon'></span> 
                    <span class="bar_text">{$kb_sfl_config['saveforlater'][$id_lang]|escape:'htmlall':'UTF-8'}</span>
                    <span class="circleCount" id="shortlist_count" style="visibility: visible;">{count($shortlisted_products)|intval}</span>
                </span>
                <span class="velsof_popup stored-settings" id="short_popup">
                    <div class="headers">
                        <div class="main_header">
                            <label style='color: {$kb_sfl_config['saveforlater']['color']|escape:'quotes':'UTF-8'}; {if $kb_sfl_config['saveforlater']['italic'] eq 1}font-style: italic;{/if} {if $kb_sfl_config['saveforlater']['bold'] eq 1}font-weight: bold;{/if}'>{$kb_sfl_config['saveforlater'][{$id_lang|escape:'htmlall':'UTF-8'}]|escape:'quotes':'UTF-8'}</label>
                            <span class="list_count" id="short_count">(<label>{count($shortlisted_products)|intval}</label>)</span>
                            <a title="{l s='Close' mod='saveforlater'}" id="hide_short" class="close_popup"></a>
                        </div>
                    </div>
                    <div class="velsof_product_list" id="velsof_list">
                        <div class="velsof_container">
                            <div class="ajax_loader">
                                <div id="loading_img" align="center">
                                    <img src="{$img_location|escape:'quotes':'UTF-8'}loading.gif" style="opacity: 1;"> 
                                </div>
                            </div>
                            {if count($shortlisted_products) <= 0}
                                <div class="no_data">
                                    <span>{l s='Sorry!' mod='saveforlater'}</span><br>
                                    {l s='No data found. Add products to shortlist first.' mod='saveforlater'}
                                </div>
                            {else}
                                {foreach $shortlisted_products as $short}
                                    <div id="sfl_shortlisted_row_{$short['product_id']|intval}" class="product_item shortlist_products">
                                        <div class="product_image">
                                            <a href="{$short['url']|escape:'quotes':'UTF-8'}"><img width="60" src="{$link->getImageLink($short['link_rewrite'], $short['id_image'] , 'home_default')|escape:'quotes':'UTF-8'}"></a>
                                        </div>
                                        <div class='product_detail'>
                                            <div class='product_title'>
                                                <a href="{$short['url']|escape:'quotes':'UTF-8'}">{$short['name']|escape:'htmlall':'UTF-8'}</a>
                                            </div>
                                            <div class="sfl_product_price">
                                                <div class="product_price">
                                                    <div class="sfl_calculated_price">{$short['price_formatted']|escape:'quotes':'UTF-8'}</div>
                                                    {if $short['show_slashed_price']}
                                                        <div class="slashed_price">{$short['price_before_formatted']|escape:'quotes':'UTF-8'}</div>
                                                    {/if}
                                                </div>
                                                {if $kb_sfl_config['saveforlater']['enable_buy_btn'] eq 1}
                                                    {if (Product::getRealQuantity($short['product_id']) > 0 && StockAvailable::getQuantityAvailableByProduct($short['product_id'], $short['product_id_attr']) > 0) || $short['outofstock'] == '1' }
                                                        <div class="sfl_buy_btn">                            
                                                            <a class='velsof_buy' href='javascript:void(0)' onclick="buyProduct({$short['product_id']|intval});" style="background-color: {$kb_sfl_config['general']['buy_color']|escape:'quotes':'UTF-8'};">{l s='BUY' mod='saveforlater'}</a>
                                                        </div>
                                                    {/if}
                                                {/if}
                                            </div>
                                            <div class="sfl_clear"></div>
                                            <div class='remove_button remove_product' onclick="removeProductFromList(this, {$short['product_id']|intval}, 'sfl')"></div>
                                        </div>
                                    </div>
                                {/foreach}
                            {/if}            
                        </div>        
                    </div>
                </span>
            </span>
        {/if}
    </div>
{/if}

{*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer tohttp://www.prestashop.com for more information.
* We offer the best and most useful modules PrestaShop and modifications for your online store.
*
* @category  PrestaShop Module
* @author    knowband.com <support@knowband.com>
* @copyright 2017 Knowband
* @license   see file: LICENSE.txt
*}
