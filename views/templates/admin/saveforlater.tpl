<script type="text/javascript">
    var sfl_date_format = "mm/dd/yy";
</script>
<style>
    .icon-question-sign { color: #526D9E; }
       .vss_demo_block2 {
width: 100%;
height: auto;
opacity: 1;
}

.vss_demo_block_hovered2 {
cursor: not-allowed;
opacity: 0.3;	
}

.vss_overlay_paid2 {
{*    float: left; *}
{*   position: absolute;*}
   width: 100%;
   bottom: 139px;
   text-align: center;
   padding: 44px;
   height: auto;
   margin: 0.5%;
{*   display: none;*}
   background: rgba(85, 85, 85, 0.529412);
}

.vss_overlay_paid_text2 {
font-size:18px;
color:white;
}

.vss_free_version_button2 {
   color: #FFF;
   background: #f69c55;
   padding: 7px 14px;
   font-size: 13px;
   text-align: center;
}
.vss_free_version_link2 {
       padding: 4px;
}
.vss_free_version_link2:hover{
text-decoration: none !important;
}
</style>
<div id="kb_container" class="content" style="width: 100%;">
    <div class="box">
        <div class="navbar main hidden-print" style="width: 100%;"></div>
        <div style="width: 100%;">
            <div class="widget velsof-widget-left" style="width: 100%;">
                <div class="widget-body velsof-widget-left" style="width: 100%; padding: 0px !important">
                    <div id="wrapper" style="width: 100%;">
                        <div id="menuVel" class="hidden-print ui-resizable"  style="position: static">
                            <div class="slimScrollDiv">
                                <div class="slim-scroll">
                                    <ul>
                                        <li class="active"><a class="glyphicons settings" href="#tab_general_settings" data-toggle="tab"><i></i><span>{l s='Settings' mod='saveforlater'}</span></a></li>
                                        <li class=""><a class="glyphicons thumbs_up" href="#tab_recommend_opt" data-toggle="tab"><i></i><span>{l s='Recommendations' mod='saveforlater'}</span></a></li>
                                        <li class=""><a class="glyphicons signal" href="#tab_product_analysis" data-toggle="tab" onclick="setReportvar('preport');"><i></i><span>{l s='Product Analysis' mod='saveforlater'}</span></a></li>
                                        <li class=""><a class="glyphicons stats" href="#tab_customer_analysis" data-toggle="tab" onclick="setReportvar('creport');"><i></i><span>{l s='Customer Analysis' mod='saveforlater'}</span></a></li>
                                        <li class=""><a class="glyphicons cargo" href="#tab_order_analysis" data-toggle="tab" onclick="setReportvar('oreport');"><i></i><span>{l s='Order Analysis' mod='saveforlater'}</span></a></li>
                                    </ul>
                                    <div class="clearfix"></div>
                                    <div class="separator bottom"></div>
                                </div>
                            </div>
                            <div class="ui-resizable-handle ui-resizable-e" style="z-index: 1000;"></div>
                        </div>
                        <div id="content">
                            <div class="box">
                                <div class="content tabs">
                                    
                                        <input type='hidden' id='submit_form' name='submit_form' value=''>
                                        <div class="layout">
                                            <div class="tab-content even-height">
                                                <!--------------- Start - Settings -------------------->
                                                <div id="tab_general_settings" class="tab-pane active">
                                                    <form action="{$action|escape:'quotes':'UTF-8'}" action="" method="post" enctype="multipart/form-data" id="configuration_form">
                                                    <input type='hidden' name='configuration_form_key' value='{$configuration_key|escape:'htmlall':'UTF-8'}'>
                                                    <div class="block">
                                                        <h4 class="tab-heading heading-mosaic">
                                                            {l s='Settings' mod='saveforlater'}
                                                            <div class="topbuttons">
                                                                <button type="button" id="save_conf" onclick='saveConfiguration()' class="btn btn-success sfl-sv-btn">{l s='Save Settings' mod='saveforlater'}</button>
                                                            </div>
                                                        </h4>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                    <h4 class="heading">{l s='General' mod='saveforlater'}</h4>
                                                                </div>
                                                                <div class="widget-body">
                                                                    <table class="form">
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Enable/Disable' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Enable/Disable Save for Later Plugin' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                {if isset($kb_sfl_config['general']['enable']) && ($kb_sfl_config['general']['enable'] eq 1)}
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[general][enable]" id="alert_enable" checked="checked" />
                                                                                        </div>
                                                                                {else}                                                                                
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[general][enable]" id="alert_enable"/>
                                                                                        </div>
                                                                                {/if}
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Pop-up Border Color' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose the color for popup border.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                <input type="text" class="color-input" style="background-color: {$kb_sfl_config['general']['border_color']|escape:'htmlall':'UTF-8'}" name="kb_sfl_config[general][border_color]" value='{$kb_sfl_config['general']['border_color']|escape:'htmlall':'UTF-8'}' disabled=""/>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Buy button color' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose the color for the buy button in front of every product in the list.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                <input type="text" class="color-input buy-preview"  style="background-color: {$kb_sfl_config['general']['buy_color']|escape:'htmlall':'UTF-8'}" name="kb_sfl_config[general][buy_color]" value='{$kb_sfl_config['general']['buy_color']|escape:'htmlall':'UTF-8'}' disabled=""/>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Button Preview' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='This is just a preview of the buy button as it looks at the front-end.' mod='saveforlater'}"></i>
                                                                               <div class="row">
                                                                                    <span><p class="help"><b>{l s='Note' mod='saveforlater'}:</b> {l s='This is just a preview how the button looks at the front-end.' mod='saveforlater'}</p></span>
                                                                                </div>
                                                                            </td>
                                                                            <td class="settings" style="text-align: right;">
                                                                                <button class="velsof_buy" id="buy_button" style="background: {$kb_sfl_config['general']['buy_color']|escape:'htmlall':'UTF-8'};" disabled="disabled">{l s='BUY' mod='saveforlater'}</button>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Bar Backgroud Color' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose the color for backgroud of the bar at the front-end.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                <input type="text" class="color-input" style="background-color: {$kb_sfl_config['general']['bar_color']|escape:'htmlall':'UTF-8'}" name="kb_sfl_config[general][bar_color]" value='{$kb_sfl_config['general']['bar_color']|escape:'htmlall':'UTF-8'}' disabled=""/>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                    <h4 class="heading">{l s='Save for Later' mod='saveforlater'}</h4>
                                                                </div>
                                                                <div class="widget-body">
                                                                    <table class="form">
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Enable Save for Later' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Enable/Disable Save for Later option' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                {if isset($kb_sfl_config['saveforlater']['enable']) && ($kb_sfl_config['saveforlater']['enable'] eq 1)}
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[saveforlater][enable]" checked="checked" />
                                                                                        </div>
                                                                                {else}                                                                                
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[saveforlater][enable]"/>
                                                                                        </div>
                                                                                {/if}
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Show buy button' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose to display buy button in front of products in the list or not.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                                                                                                
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[saveforlater][enable_buy_btn]" disabled/>
                                                                                        </div>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align">
                                                                                <span class="control-label">{l s='Text above pop-up' mod='saveforlater'}: </span>
                                                                                    <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Text to be displayed above the save for later pop-up' mod='saveforlater'}"></i>
                                                                            </td>   
                                                                            <td class="left settings">
                                                                                <div class="row input-row-margin-bottom">
                                                                                    <div class="widget-body uniformjs align-controls">
                                                                                        <div class="font-style-options">
                                                                                            <ul class="font-options-list">
                                                                                                <li class="font-style">
                                                                                                    {if $kb_sfl_config['saveforlater']['bold'] eq 1}
                                                                                                    <div class="style-options bold-option velocity-font-style font-style-selected">
                                                                                                    {else}
                                                                                                    <div class="style-options bold-option velocity-font-style">
                                                                                                    {/if}
                                                                                                    <input type="hidden" name="kb_sfl_config[saveforlater][bold]" value="{$kb_sfl_config['saveforlater']['bold']|escape:'htmlall':'UTF-8'}"/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    {if $kb_sfl_config['saveforlater']['italic'] eq 1}
                                                                                                    <div class="style-options italic-option velocity-font-style font-style-selected">
                                                                                                    {else}
                                                                                                    <div class="style-options italic-option velocity-font-style">
                                                                                                    {/if}
                                                                                                    <input type="hidden" name="kb_sfl_config[saveforlater][italic]" value="{$kb_sfl_config['saveforlater']['italic']|escape:'htmlall':'UTF-8'}"/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    <div class="style-options font-color-option velocity-color-picker">
                                                                                                        <div class="color-display" style="background-color: {$kb_sfl_config['saveforlater']['color']|escape:'htmlall':'UTF-8'}"></div>
                                                                                                        <input type="hidden" name="kb_sfl_config[saveforlater][color]" value="{$kb_sfl_config['saveforlater']['color']|escape:'htmlall':'UTF-8'}"/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                            </ul>                                                                        
                                                                                        </div>                                                                
                                                                                    </div>
                                                                                </div>
                                                                                <table class="row input-row-margin-bottom">
                                                                                    {foreach from=$languages item='lang'}     
                                                                                        <tr>
                                                                                        <td><div class='span0'><img src="{$img_lang_dir|escape:'quotes':'UTF-8'}{$lang['id_lang']|intval}.jpg" alt="{$lang['name']|escape:'htmlall':'UTF-8'}" width="16px" height="11px" title="{$lang['name']|escape:'htmlall':'UTF-8'}"/></div></td>
                                                                                        <td>
                                                                                            <div class="span6">
                                                                                                <input type="text" class="text-width required-entry" name="kb_sfl_config[saveforlater][{$lang['id_lang']|intval}]" value="{if isset($kb_sfl_config['saveforlater'][$lang['id_lang']])}{$kb_sfl_config['saveforlater'][$lang['id_lang']]|escape:'quotes':'UTF-8'}{else if isset($kb_sfl_config['saveforlater']['default_text'])}{$kb_sfl_config['saveforlater']['default_text']|escape:'htmlall':'UTF-8'}{/if}"/>
                                                                                            </div>
                                                                                        </td>                                                                                
                                                                                        </tr>
                                                                                        <tr class="sfl_gap_div">
                                                                                            <td colspan="2"></td>
                                                                                        </tr>
                                                                                    {/foreach}
                                                                                </table>
                                                                            </td>                                                      
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                    <h4 class="heading">{l s='Recently Viewed' mod='saveforlater'}</h4>
                                                                </div>
                                                                <div class="widget-body">
                                                                    <table class="form">
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Enable Recently Viewed' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Enable/Disable Recently Viewed option' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                                                                                         
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[recently_view][enable]" disabled/>
                                                                                        </div>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Show buy button' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose to display buy button in front of products in the list or not.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                                                                                         
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[recently_view][enable_buy_btn]" disabled/>
                                                                                        </div>
                                                                            </td>
                                                                        </tr>
                                                                        
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Limit' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Set, how many products should be shown to customers.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                <div class="">
                                                                                    <input style="width:100px" type="text" class="text-width required-entry validate-integer" name="kb_sfl_config[recently_view][limit]" value="5" readonly=""/>
                                                                                </div>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align">
                                                                                <span class="control-label">{l s='Text above pop-up' mod='saveforlater'}: </span>
                                                                                    <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Text to be displayed above the Recently Viewed pop-up' mod='saveforlater'}"></i>
                                                                            </td>   
                                                                            <td class="left settings">
                                                                                <div class="row input-row-margin-bottom">
                                                                                    <div class="widget-body uniformjs align-controls">
                                                                                        <div class="font-style-options">
                                                                                            <ul class="font-options-list">
                                                                                                <li class="font-style">
                                                                                                
                                                                                                    <div class="style-options bold-option velocity-font-style">
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    
                                                                                                    <div class="style-options italic-option velocity-font-style">
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    <div class="style-options font-color-option velocity-color-picker">
                                                                                                        <div class="color-display"></div>
                                                                                                        <input type="hidden" name="kb_sfl_config[recently_view][color]" value=""/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                            </ul>                                                                        
                                                                                        </div>                                                                
                                                                                    </div>
                                                                                </div>
                                                                                <table class="row input-row-margin-bottom">
                                                                                    {foreach from=$languages item='lang'}     
                                                                                        <tr>
                                                                                        <td><div class='span0'><img src="{$img_lang_dir|escape:'quotes':'UTF-8'}{$lang['id_lang']|intval}.jpg" alt="{$lang['name']|escape:'htmlall':'UTF-8'}" width="16px" height="11px" title="{$lang['name']|escape:'htmlall':'UTF-8'}"/></div></td>
                                                                                        <td>
                                                                                            <div class="span6">
                                                                                                <input type="text" class="text-width required-entry" name="kb_sfl_config[recently_view][{$lang['id_lang']|intval}]" value="{if isset($kb_sfl_config['recently_view'][$lang['id_lang']])}{$kb_sfl_config['recently_view'][$lang['id_lang']]|escape:'quotes':'UTF-8'}{else if isset($kb_sfl_config['recently_view']['default_text'])}{$kb_sfl_config['recently_view']['default_text']|escape:'htmlall':'UTF-8'}{/if}" readonly=""/>
                                                                                            </div>
                                                                                        </td>
                                                                                        </tr>
                                                                                        <tr class="sfl_gap_div">
                                                                                            <td colspan="2"></td>
                                                                                        </tr>
                                                                                    {/foreach}
                                                                                </table>
                                                                            </td>                                                      
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                    <h4 class="heading">{l s='Recommendations' mod='saveforlater'}</h4>
                                                                </div>
                                                                <div class="widget-body">
                                                                    <table class="form">
                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Enable Recommendations' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Enable/Disable Recommendations option' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                                                                                          
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[recommendation][enable]" disabled/>
                                                                                        </div>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="name vertical_top_align"><span class="control-label">{l s='Show buy button' mod='saveforlater'}: </span>
                                                                                <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Choose to display buy button in front of products in the list or not.' mod='saveforlater'}"></i>
                                                                            </td>
                                                                            <td class="settings">
                                                                                                                                                         
                                                                                        <div class="make-switch" data-on="primary" data-off="default">
                                                                                            <input class="make-switch" type="checkbox" value="1" name="kb_sfl_config[recommendation][enable_buy_btn]" disabled/>
                                                                                        </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="name vertical_top_align">
                                                                                <span class="control-label">{l s='Text above pop-up' mod='saveforlater'}: </span>
                                                                                    <i class="icon-question-sign" data-toggle="tooltip"  data-placement="top" data-original-title="{l s='Text to be displayed above the Recently Viewed pop-up' mod='saveforlater'}"></i>
                                                                            </td>   
                                                                            <td class="left settings">
                                                                                <div class="row input-row-margin-bottom">
                                                                                    <div class="widget-body uniformjs align-controls">
                                                                                        <div class="font-style-options">
                                                                                            <ul class="font-options-list">
                                                                                                <li class="font-style">
                                                                                                   
                                                                                                    <div class="style-options bold-option velocity-font-style">
                                                                                                        <input type="hidden" name="kb_sfl_config[recommendation][bold]" value="" disabled/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    
                                                                                                    <div class="style-options italic-option velocity-font-style">
                                                                                                        <input type="hidden" name="kb_sfl_config[recommendation][italic]" value="" disabled/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                                <li class="font-style">
                                                                                                    <div class="style-options font-color-option velocity-color-picker">
                                                                                                        <div class="color-display"></div>
                                                                                                        <input type="hidden" name="kb_sfl_config[recommendation][color]" value="" disabled/>
                                                                                                    </div>    
                                                                                                </li>
                                                                                            </ul>                                                                        
                                                                                        </div>                                                                
                                                                                    </div>
                                                                                </div>
                                                                                <table class="row input-row-margin-bottom">
                                                                                        {foreach from=$languages item='lang'}     
                                                                                            <tr>
                                                                                            <td><div class='span0'><img src="{$img_lang_dir|escape:'quotes':'UTF-8'}{$lang['id_lang']|intval}.jpg" alt="{$lang['name']|escape:'htmlall':'UTF-8'}" width="16px" height="11px" title="{$lang['name']|escape:'htmlall':'UTF-8'}"/></div></td>
                                                                                            <td>
                                                                                                <div class="span6">
                                                                                                    <input type="text" class="text-width required-entry" name="kb_sfl_config[recommendation][{$lang['id_lang']|intval}]" value="{if isset($kb_sfl_config['recommendation'][$lang['id_lang']])}{$kb_sfl_config['recommendation'][$lang['id_lang']]|escape:'quotes':'UTF-8'}{else if isset($kb_sfl_config['recommendation']['default_text'])}{$kb_sfl_config['recommendation']['default_text']|escape:'htmlall':'UTF-8'}{/if}" readonly/>
                                                                                                </div>
                                                                                            </td>                                                                                    
                                                                                            </tr>
                                                                                            <tr class="sfl_gap_div">
                                                                                                <td colspan="2"></td>
                                                                                            </tr>
                                                                                        {/foreach}
                                                                                </table>
                                                                            </td>                                                      
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </form>
                                                </div>
                                                <!--------------- End - Settings -------------------->

                                                <!--------------- Start - Recommendations Options -------------------->
                                                <div id="tab_recommend_opt" class="tab-pane">
                                                    <div class="block">
                                                        <h4 id="analysis_report_heading" class="tab-heading heading-mosaic">
                                                            {l s='Recommendation Options' mod='saveforlater'}
                                                            <div class="topbuttons">
                                                                <button type="button" id="save_rec" onclick='saveRecommendationOption()' class="btn btn-success sfl-sv-btn" disabled="">{l s='Save Recommendation Options' mod='saveforlater'}</button>
                                                            </div>
                                                        </h4>
                                                        <div class="block">
                                                            <form action="{$action|escape:'quotes':'UTF-8'}" method="post" enctype="multipart/form-data" id="recommention_option_form" >
                                                                <input type="hidden" name="submit_recommend_option" value="1" />
                                                                <table class="form">
                                                                    <tr>
                                                                        <td>
                                                                            <div class="alert alert-info">{l s='These features are not available in Free Version. Here, you can set which type of information you want to recommend to customers.' mod='saveforlater'}</div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="settings" style="border-bottom: 1px solid #E5E5E5;">
                                                                            <input type="radio" class="recommendation_option" name="recommendations[setting]" value="1" style="margin-bottom: 7px;" disabled/><b style="margin-left: 8px;">{l s='Banner' mod='saveforlater'}</b>
                                                                            <input type="radio" class="recommendation_option" style="margin-left: 10px; margin-bottom: 7px;" name="recommendations[setting]" value="2" disabled/><b style="margin-left: 8px;">{l s='Related Products' mod='saveforlater'}</b>
                                                                            <input type="radio" class="recommendation_option" style="margin-left: 10px; margin-bottom: 7px;" name="recommendations[setting]" value="3" disabled/><b style="margin-left: 8px;">{l s='Selected Products' mod='saveforlater'}</b>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <div id="recommendation-content" class="block">
                                                                    
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--------------- End - Recommendations Options -------------------->
                                                
                                                <!--------------- Start - Product Analysis -------------------->
                                                <div id="tab_product_analysis" class="tab-pane">
                                                    <div class="block">
                                                        <h4 id="analysis_report_heading" class="tab-heading heading-mosaic">{l s='Product Analysis Report' mod='saveforlater'}</h4>
                                                        <div id="sfl_prod_analysis_msg_bar" class="modal_process_status_blk alert alert-danger"></div>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                     <h4 class="heading">{l s='Filter Your Analysis' mod='saveforlater'}</h4>
                                                                 </div>
                                                                 <div class="widget-body filter-widget-body">
                                                                    <div class="filter-block">
                                                                        <span class="span">
                                                                           <h5>{l s='Analysis Type' mod='saveforlater'}:</h5>
                                                                           <div class="sfl_filter_input_block">
                                                                               <select name="sfl_prod_analysis-type_list" id="sfl_prod_analysis-type_list" onchange="process_category(this)">
                                                                                    <option value="0">{l s='Category' mod='saveforlater'}</option>
                                                                                    <option value="1">{l s='Product' mod='saveforlater'}</option>
                                                                               </select>
                                                                               <img id="sfl_prod_analysis_type_loader" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                           </div>
                                                                        </span>
                                                                       <span class="span4" id="sfl_prod_analysis_cat_filter">
                                                                           <h5>{l s='Category(s)' mod='saveforlater'}:</h5>
                                                                           <div class="sfl_filter_input_block">
                                                                               <select name="product_report_cat_list" id="sfl_prod_analysis_c_list" >
                                                                                  {foreach $category as $categ}
                                                                                        {if $categ['id_category'] != ''}
                                                                                            <option value="{$categ['id_category']|escape:'htmlall':'UTF-8'}">{$categ['name']|escape:'htmlall':'UTF-8'}</option>
                                                                                        {/if}
                                                                                    {/foreach}
                                                                               </select>
                                                                               <img class="sfl_product_loader_img" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                           </div>
                                                                       </span>
                                                                        <span class="span3">
                                                                             <h5>{l s='Products' mod='saveforlater'}:</h5>
                                                                             <select name="product_report_prod_list" id="sfl_prod_analysis_p_list"></select>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                             <h5>{l s='From Date' mod='saveforlater'}:</h5>
                                                                             <div class="sfl_filter_input_block">
                                                                                 <input type="text" id="sfl_prod_analysis_from_date" name="sfl_prod_analysis_from_date" value="{$from_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                             </div>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                            <h5>{l s='To Date' mod='saveforlater'}:</h5>
                                                                            <div class="sfl_filter_input_block">
                                                                                <input type="text" id="sfl_prod_analysis_to_date" name="sfl_prod_analysis_to_date" value="{$to_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                            </div>
                                                                        </span>
                                                                            <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class='block'>
                                                                        <span class="span velsof-button-row">
                                                                            <span class="btn btn-success" onclick="getProductAnalysisReport('sfl_prod_analysis')">{l s='FILTER' mod='saveforlater'}</span>
                                                                            <span class="btn btn-primary" onclick="resetReport('sfl_prod_analysis', 1)">{l s='Reset' mod='saveforlater'}</span>
                                                                            <span class="btn btn-warning" onclick="getExcelReport('sfl_prod_analysis', 1)">{l s='EXPORT' mod='saveforlater'}</span>
                                                                            <img id="sfl_product_analysis_loader" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                        </span>                                                                        
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                </div>
                                                            </div>
                                                            <div id="report_container" class="">
                                                                <div class="widget">
                                                                    <div class="widget-head">
                                                                        <h4 id="sfl_prod_analysis_graph_title" class="heading">{l s='Category(s)' mod='saveforlater'} {l s='Statistics' mod='saveforlater'}</h4>
                                                                    </div>
                                                                    <div class="graph_container">
                                                                        <div id="sfl_prod_analysis_graph" style="margin: 0 auto; width:95%; height:350px">
                                                                            <div class="no_chart"><span>{l s='No data found' mod='saveforlater'}</span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="widget">
                                                                    <div class="widget-head"> 
                                                                        <h4 id="sfl_prod_analysis_list_title" class="heading">{l s='Category(s)' mod='saveforlater'} {l s='List' mod='saveforlater'}</h4>
                                                                    </div>
                                                                    <div class="list_container">
                                                                        <div id="sfl_prod_analysis_list_table_blk" class="bigldr-blk">
                                                                            <div class="tbl-blk">
                                                                                <div class="tbl-bigloader"></div>
                                                                                <table class="pure-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th class="s_no">{l s='S. No.' mod='saveforlater'}</th>
                                                                                            <th>{l s='Category Name' mod='saveforlater'}</th>
                                                                                            <th>{l s='Shortlisted Products Count' mod='saveforlater'}</th>
                                                                                        </tr>
                                                                                    </thead>

                                                                                    <tbody id="sfl_prod_analysis_tbl_body">
                                                                                        {if $product_analysis_report['flag']}
                                                                                            {$i = 0}
                                                                                            {foreach $product_analysis_report['data'] as $templ}
                                                                                                <tr class="pure-table-{if $i%2 == 0}even{else}odd{/if}">
                                                                                                    <td class="right">{($i+1)|intval}</td>
                                                                                                    <td >{$templ['name']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td class="right">{$templ['count']|escape:'htmlall':'UTF-8'}</td>
                                                                                                </tr>
                                                                                                {$i = $i+1}
                                                                                            {/foreach}
                                                                                        {else}
                                                                                            <tr class="pure-table-odd empty-tbl">
                                                                                                <td colspan="3" class="center"><span>{l s='No data found' mod='saveforlater'}</span></td>
                                                                                            </tr>
                                                                                        {/if}
                                                                                    </tbody>
                                                                                </table>
                                                                                    <script type="text/javascript">var sfl_product_analysis_page_number = 1; </script>
                                                                            </div>
                                                                            <div class="paginator-block block">
                                                                                {$product_analysis_report['pagination']|escape:'quotes':'UTF-8'}   
                                                                            </div>
                                                                            <div class="clearfix"></div>
                                                                        </div>
                                                                        <div class="modal fade" id="m_category_product_list" tab-index="-1" aria-hidden="true" aria-labelledby="modal-cpl">
                                                                            <div class="modal-dialog" style="width:50%">
                                                                                <div class="modal-content">
                                                                                    <div class="modal-header velsof-align-text">
                                                                                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">{l s='Close' mod='saveforlater'}</span></button>
                                                                                        <h3 class="modal-title" id="modal-cart">{l s='Saved Products' mod='saveforlater'}</h3>
                                                                                    </div>
                                                                                    <div class="modal-body" id="sfl_customer_data">
                                                                                        <table class="pure-table">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th class="s_no">{l s='S. No.' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Product Name' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Reference' mod='saveforlater'}</th>
                                                                                                    <th>{l s='No. of Customers' mod='saveforlater'}</th>
                                                                                                </tr>
                                                                                            </thead>

                                                                                            <tbody id="m_category_product_list_tbl_body">
                                                                                                <tr class="pure-table-odd empty-tbl">
                                                                                                    <td colspan="4" class="center"><span>{l s='No data found' mod='saveforlater'}</span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                    </div>                                                    
                                                </div>
                                                <!--------------- End - Product Analysis -------------------->
                                                
                                                <!--------------- Start - Customer Analysis -------------------->
                                                <div id="tab_customer_analysis" class="tab-pane">
                                                    <div class="block">
                                                        <h4 id="analysis_customer_heading" class="tab-heading heading-mosaic">{l s='Customer Analysis Report' mod='saveforlater'}</h4>
                                                        <div id="sfl_cust_analysis_msg_bar" class="modal_process_status_blk alert alert-danger"></div>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                     <h4 class="heading">{l s='Filter Your Analysis' mod='saveforlater'}</h4>
                                                                 </div>
                                                                 <div class="widget-body filter-widget-body">
                                                                    <div class="filter-block">                                                                       
                                                                       <span class="span4" id="sfl_cust_analysis_cat_filter">
                                                                           <h5>{l s='Category(s)' mod='saveforlater'}:</h5>
                                                                           <div class="sfl_filter_input_block">
                                                                               <select name="product_report_cat_list" id="sfl_cust_analysis_c_list" >
                                                                                  {foreach $category as $categ}
                                                                                        {if $categ['id_category'] != ''}
                                                                                            <option value="{$categ['id_category']|escape:'htmlall':'UTF-8'}">{$categ['name']|escape:'htmlall':'UTF-8'}</option>
                                                                                        {/if}
                                                                                    {/foreach}
                                                                               </select>
                                                                               <img class="sfl_product_loader_img" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                           </div>
                                                                       </span>
                                                                        <span class="span4">
                                                                             <h5>{l s='Products' mod='saveforlater'}:</h5>
                                                                             <select name="product_report_prod_list" id="sfl_cust_analysis_p_list"></select>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                             <h5>{l s='From Date' mod='saveforlater'}:</h5>
                                                                             <div class="sfl_filter_input_block">
                                                                                 <input type="text" id="sfl_cust_analysis_from_date" name="sfl_cust_analysis_from_date" value="{$from_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                             </div>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                            <h5>{l s='To Date' mod='saveforlater'}:</h5>
                                                                            <div class="sfl_filter_input_block">
                                                                                <input type="text" id="sfl_cust_analysis_to_date" name="sfl_cust_analysis_to_date" value="{$to_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                            </div>
                                                                        </span>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="block">
                                                                        <span class="span4">
                                                                            <div class="span velsof-button-row">
                                                                                <span class="btn btn-success" onclick="getCustomerAnalysisReport('sfl_cust_analysis')">{l s='FILTER' mod='saveforlater'}</span>
                                                                                <span class="btn btn-primary" onclick="resetReport('sfl_cust_analysis', 2)">{l s='Reset' mod='saveforlater'}</span>
                                                                                <span class="btn btn-warning" onclick="getExcelReport('sfl_cust_analysis', 2)">{l s='EXPORT' mod='saveforlater'}</span>
                                                                                <img id="sfl_cust_analysis_loader" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                            </div>
                                                                        </span>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="report_container" class="">                                                             
                                                                <div class="widget">
                                                                    <div class="widget-head">
                                                                        <h4 class="heading">{l s='Customer Analysis Report' mod='saveforlater'}</h4>
                                                                    </div>
                                                                    <div class="list_container">
                                                                        <div id="sfl_cust_analysis_list_table_blk" class="bigldr-blk">
                                                                            <div class="tbl-blk">
                                                                                <div class="tbl-bigloader"></div>
                                                                                <table class="pure-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th class="s_no">{l s='S. No.' mod='saveforlater'}</th>
                                                                                            <th>{l s='Customer Name' mod='saveforlater'}</th>
                                                                                            <th>{l s='Customer Email' mod='saveforlater'}</th>
                                                                                            <th>{l s='No. of Products' mod='saveforlater'}</th>
                                                                                        </tr>
                                                                                    </thead>

                                                                                    <tbody id="sfl_cust_analysis_tbl_body">
                                                                                        {if $customer_analysis_report['flag']}
                                                                                            {$i = 0}
                                                                                            {foreach $customer_analysis_report['data'] as $templ}
                                                                                                <tr class="pure-table-{if $i%2 == 0}even{else}odd{/if}">
                                                                                                    <td class="right">{($i+1)|intval}</td>
                                                                                                    <td >{$templ['firstname']|escape:'htmlall':'UTF-8'} {$templ['lastname']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td><a class="sfl_customer_products" href="javascript:void(0)" type="{$templ['id']|escape:'htmlall':'UTF-8'}">{$templ['email']|escape:'htmlall':'UTF-8'}</a></td>
                                                                                                    <td class="right">{$templ['count']|escape:'htmlall':'UTF-8'}</td>
                                                                                                </tr>
                                                                                                {$i = $i+1}
                                                                                            {/foreach}
                                                                                        {else}
                                                                                            <tr class="pure-table-odd empty-tbl">
                                                                                                <td colspan="4" class="center"><span>{l s='No data found' mod='saveforlater'}</span></td>
                                                                                            </tr>
                                                                                        {/if}
                                                                                    </tbody>
                                                                                </table>
                                                                                    <script type="text/javascript">var sfl_cust_analysis_page_number = 1; </script>
                                                                            </div>
                                                                            <div class="paginator-block block">
                                                                                {$customer_analysis_report['pagination']|escape:'quotes':'UTF-8'}   
                                                                            </div>
                                                                            <div class="clearfix"></div>
                                                                        </div>
                                                                        <div class="modal fade" id="customer_product_list" tab-index="-1" aria-hidden="true" aria-labelledby="modal-cart">
                                                                            <div class="modal-dialog" style="width:50%">
                                                                                <div class="modal-content">
                                                                                    <div class="modal-header velsof-align-text">
                                                                                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">{l s='Close' mod='saveforlater'}</span></button>
                                                                                        <h3 class="modal-title" id="modal-cart">{l s='Saved Products' mod='saveforlater'}</h3>
                                                                                    </div>
                                                                                    <div class="modal-body" id="sfl_customer_data">
                                                                                        <table class="pure-table">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th class="s_no">{l s='S. No.' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Product Name' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Reference' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Date Added' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Purchased' mod='saveforlater'}</th>
                                                                                                    <th>{l s='Order Date' mod='saveforlater'}</th>
                                                                                                </tr>
                                                                                            </thead>

                                                                                            <tbody id="sfl_customer_product_tbl_body">
                                                                                                <tr class="pure-table-odd empty-tbl">
                                                                                                    <td colspan="6" class="center"><span>{l s='No data found' mod='saveforlater'}</span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>                                                    
                                                </div>
                                                <!--------------- End - Customer Analysis -------------------->
                                                
                                                <!--------------- Start - Order Analysis -------------------->
                                                <div id="tab_order_analysis" class="tab-pane">
                                                    <div class="block">
                                                        <h4 id="order_report_heading" class="tab-heading heading-mosaic">{l s='Order Analysis Report' mod='saveforlater'}</h4>
                                                        <div class="block">
                                                            <div class="widget">
                                                                <div class="widget-head">
                                                                     <h4 class="heading">{l s='Filter Your Analysis' mod='saveforlater'}</h4>
                                                                 </div>
                                                                 <div class="widget-body filter-widget-body">
                                                                    <div class="filter-block">                                                                        
                                                                       <span class="span4" id="sfl_order_analysis_cat_filter">
                                                                           <h5>{l s='Category(s)' mod='saveforlater'}:</h5>
                                                                           <div class="sfl_filter_input_block">
                                                                               <select name="product_report_cat_list" id="sfl_order_analysis_c_list" >
                                                                                  {foreach $category as $categ}
                                                                                        {if $categ['id_category'] != ''}
                                                                                            <option value="{$categ['id_category']|escape:'htmlall':'UTF-8'}">{$categ['name']|escape:'htmlall':'UTF-8'}</option>
                                                                                        {/if}
                                                                                    {/foreach}
                                                                               </select>
                                                                               <img class="sfl_product_loader_img" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                           </div>
                                                                       </span>
                                                                        <span class="span4">
                                                                             <h5>{l s='Products' mod='saveforlater'}:</h5>
                                                                             <select name="order_report_prod_list" id="sfl_order_analysis_p_list"></select>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                             <h5>{l s='From Date' mod='saveforlater'}:</h5>
                                                                             <div class="sfl_filter_input_block">
                                                                                 <input type="text" id="sfl_order_analysis_from_date" name="sfl_order_analysis_from_date" value="{$from_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                             </div>
                                                                        </span>
                                                                        <span class="span0 sfl_filter_date">
                                                                            <h5>{l s='To Date' mod='saveforlater'}:</h5>
                                                                            <div class="sfl_filter_input_block">
                                                                                <input type="text" id="sfl_order_analysis_to_date" name="sfl_order_analysis_to_date" value="{$to_date|escape:'htmlall':'UTF-8'}" readonly="true"/>
                                                                            </div>
                                                                        </span>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="block">
                                                                        <span class="span4">
                                                                            <div class="span velsof-button-row">
                                                                                <span class="btn btn-success" onclick="getOrderAnalysisReport('sfl_order_analysis')">{l s='FILTER' mod='saveforlater'}</span>
                                                                                <span class="btn btn-primary" onclick="resetReport('sfl_order_analysis', 3)">{l s='Reset' mod='saveforlater'}</span>
                                                                                <span class="btn btn-warning" onclick="getExcelReport('sfl_order_analysis', 3)">{l s='EXPORT' mod='saveforlater'}</span>
                                                                                <img id="sfl_order_analysis_loader" src="{$module_images_loc|escape:'quotes':'UTF-8'}loader_small.gif" style="display:none;">
                                                                            </div>
                                                                        </span>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="report_container" class="">
                                                                <div class="widget">
                                                                    <div class="widget-head">
                                                                        <h4 class="heading">{l s='Order Statistics (Saved vs Purchased Products)' mod='saveforlater'}</h4>
                                                                    </div>
                                                                    <div class="graph_container">
                                                                        <div id="sfl_order_analysis_graph" style="margin: 0 auto; height:350px">
                                                                            <div class="no_chart"><span>{l s='No data found' mod='saveforlater'}</span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="widget">
                                                                    <div class="widget-head">
                                                                        <h4 class="heading">{l s='Order Report (Saved Products)' mod='saveforlater'}</h4>
                                                                    </div>
                                                                    <div class="list_container">
                                                                        <div id="sfl_order_analysis_list_table_blk" class="bigldr-blk">
                                                                            <div class="tbl-blk">
                                                                                <div class="tbl-bigloader"></div>
                                                                                <table class="pure-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th class="s_no">{l s='S. No.' mod='saveforlater'}</th>
                                                                                            <th>{l s='Customer Name' mod='saveforlater'}</th>
                                                                                            <th>{l s='Customer Email' mod='saveforlater'}</th>
                                                                                            <th>{l s='Product' mod='saveforlater'}</th>
                                                                                            <th>{l s='Reference' mod='saveforlater'}</th>
                                                                                            <th>{l s='Date Added' mod='saveforlater'}</th>
                                                                                            <th>{l s='Purchased' mod='saveforlater'}</th>
                                                                                            <th>{l s='Order Date' mod='saveforlater'}</th>
                                                                                        </tr>
                                                                                    </thead>

                                                                                    <tbody id="sfl_order_analysis_tbl_body">
                                                                                        {if $order_analysis_report['flag']}
                                                                                            {$i = 0}
                                                                                            {foreach $order_analysis_report['data'] as $templ}
                                                                                                <tr class="pure-table-{if $i%2 == 0}even{else}odd{/if}">
                                                                                                    <td class="right">{($i+1)|intval}</td>
                                                                                                    <td >{$templ['firstname']|escape:'htmlall':'UTF-8'} {$templ['lastname']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td>{$templ['email']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td >{$templ['name']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td >{$templ['reference']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td >{$templ['date_add']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td >{$templ['status']|escape:'htmlall':'UTF-8'}</td>
                                                                                                    <td >{$templ['order_date']|escape:'htmlall':'UTF-8'}</td>
                                                                                                </tr>
                                                                                                {$i = $i+1}
                                                                                            {/foreach}
                                                                                        {else}
                                                                                            <tr class="pure-table-odd empty-tbl">
                                                                                                <td colspan="8" class="center"><span>{l s='No data found' mod='saveforlater'}</span></td>
                                                                                            </tr>
                                                                                        {/if}
                                                                                    </tbody>
                                                                                </table>
                                                                                    <script type="text/javascript">var sfl_order_analysis_page_number = 1; </script>
                                                                            </div>
                                                                            <div class="paginator-block block">
                                                                                {$order_analysis_report['pagination']|escape:'quotes':'UTF-8'}   
                                                                            </div>
                                                                            <div class="clearfix"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                    </div>                                                    
                                                </div>
                                                <!--------------- End - Product Analysis -------------------->                                                
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<script type="text/javascript">
    var mod_dir = "{$module_images_loc|escape:'quotes':'UTF-8'}";
    var download_url = "{$download_url|escape:'quotes':'UTF-8'}";
    var action = "{$action|escape:'quotes':'UTF-8'}";
    var select_pro_err = "{l s='Please select a product to filter data' mod='saveforlater'}";
    var select_date_err = "{l s='Please select a date' mod='saveforlater'}";
    var sfl_date_error = "{l s='From date should be less than To date' mod='saveforlater'}";
    var empty_list_msg = "{l s='No data found' mod='saveforlater'}";
    var sfl_required_field_lbl = "{l s='Required Field' mod='saveforlater'}";
    var sfl_invalid_field_lbl = "{l s='Invalid value' mod='saveforlater'}";
    var configuration_validation_error = "{l s='Please fill all the required informations.' mod='saveforlater'}";
    var sfl_l_cat_lbl = "{l s='Choose Category(s)' mod='saveforlater'}";
    var sfl_l_prod_lbl = "{l s='Choose Product(s)' mod='saveforlater'}";
    var sfl_category_label = "{l s='Category(s)' mod='saveforlater'}";
    var sfl_product_label = "{l s='Products' mod='saveforlater'}";
    var sfl_list_label = "{l s='List' mod='saveforlater'}";
    var sfl_statistics_label = "{l s='Statistics' mod='saveforlater'}";
    var sfl_top_10_cat_label = "{l s='Top 10 Categories' mod='saveforlater'}";
    var sfl_top_10_product_label = "{l s='Top 10 Products' mod='saveforlater'}";
    var sfl_num_of_customer = "{l s='No. of Customers' mod='saveforlater'}";
    var sfl_num_of_products = "{l s='No. of Products' mod='saveforlater'}";
    var sfl_products_count = "{l s='Shortlisted Products Count' mod='saveforlater'}";
    var sfl_category_name_title = "{l s='Category Name' mod='saveforlater'}";
    var sfl_product_name_title = "{l s='Product Name' mod='saveforlater'}";
    var sfl_s_no_title = "{l s='S. No.' mod='saveforlater'}";
    var sfl_saved_label = "{l s='Saved Products' mod='saveforlater'}";
    var sfl_purchased_label = "{l s='Purchased' mod='saveforlater'}";
    var close_modal_label = "{l s='Close' mod='saveforlater'}";
    var sfl_date_label_graph = "{l s='Date' mod='saveforlater'}";
    var sfl_l_prod_lbl = "{l s='Choose Product(s)' mod='saveforlater'}";
    var no_match_found = "{l s='No matches found' mod='saveforlater'}";

    {if $recommendations['setting'] == 1}
        renderRecommendOptionHtml('getrecommendbanner');
    {elseif $recommendations['setting'] == 3}
        renderRecommendOptionHtml('getrecommendproducts');
    {/if}
        
        velovalidation.setErrorLanguage({
            empty_field: "{l s='Field cannot be empty.' mod='saveforlater'}",
            number_field: "{l s='You can enter only numbers.' mod='saveforlater'}",
            positive_number: "{l s='Number should be greater than 0.' mod='saveforlater'}",
            maxchar_field: "{l s='Fields cannot be greater than {#} characters.' mod='saveforlater'}",
            minchar_field: "{l s='Fields cannot be greater than {#} characters.' mod='saveforlater'}",
            invalid_date: "{l s='Invalid date format.' mod='saveforlater'}",
            validate_range: "{l s='Number is not in the valid range.' mod='saveforlater'}",
            invalid_ip: "{l s='Invalid IP format.' mod='saveforlater'}",
            invalid_url: "{l s='Invalid URL format.' mod='saveforlater'}",
            empty_url: "{l s='Please enter URL.' mod='saveforlater'}",
            empty_amount: "{l s='Amount cannot be empty.' mod='saveforlater'}",
            valid_amount: "{l s='Amount should be numeric.' mod='saveforlater'}",
            max_email: "{l s='Email cannot be greater than {#} characters.' mod='saveforlater'}",
            specialchar_zip: "{l s='Zip should not have special characters.' mod='saveforlater'}",
            max_url: "{l s='URL cannot be greater than {#} characters.' mod='saveforlater'}",
            valid_percentage: "{l s='Percentage should be in number.' mod='saveforlater'}",
            between_percentage: "{l s='Percentage should be between 0 and 100.' mod='saveforlater'}",
            positive_amount: "{l s='Amount should be positive.' mod='saveforlater'}",
            maxchar_color: "{l s='Color could not be greater than {#} characters.' mod='saveforlater'}",
            invalid_color: "{l s='Color is not valid.' mod='saveforlater'}",
            specialchar: "{l s='Special characters are not allowed.' mod='saveforlater'}"
        });
        
</script>
    </div>
</div>
<div class="vss_overlay_paid2">
       <span class="vss_overlay_paid_text2">
           {l s='You are using the Free version of the module. Click here to buy the Paid version which is having the advanced features.' mod='saveforlater'}
       </span>
       <br>
       <br>
       <a target="_blank" class="vss_free_version_link2" href="https://www.knowband.com/prestashop-advanced-wish-list">
           <span class="vss_free_version_button2">{l s='Buy Now' mod='saveforlater'}</span>
       </a>
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
* Save for Later Admin Panel
*}
