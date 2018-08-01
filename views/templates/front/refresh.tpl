<script type="text/javascript">
    var sry_txt = "{l s='Sorry' mod='saveforlater'}";
    var no_sfl_data = "{l s='No data found. Add products to shortlist first.' mod='saveforlater'}";    
</script>
<div class="velsof_container">
    <input type="hidden" id="sfl_total_shortlisted" name="sfl_total_shortlisted" value="{count($shortlisted_products)|intval}" />
    {if count($shortlisted_products) == 0}
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
                        {if (Product::getRealQuantity($short['product_id']) > 0 && StockAvailable::getQuantityAvailableByProduct($short['product_id'], $short['product_id_attr']) > 0) || $short['outofstock'] == '1'}
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
*
* Description
*
* Refresh Shortlist Pop-up Page
*}