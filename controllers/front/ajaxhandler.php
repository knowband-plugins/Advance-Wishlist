<?php
/**
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future.If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 * We offer the best and most useful modules PrestaShop and modifications for your online store.
 *
 * @author    knowband.com <support@knowband.com>
 * @copyright 2017 Knowband
 * @license   see file: LICENSE.txt
 * @category  PrestaShop Module
 */

class SaveForLaterAjaxHandlerModuleFrontController extends ModuleFrontController
{

    public function init()
    {
        parent::init();
        $temp_obj = new SaveForLater();

        if (Tools::getValue('method') == 'remove') {
            $json = array();
            $json['status'] = false;
            if (Tools::getValue('type') == 'sfl') {
                $json['status'] = $temp_obj->removeProductFromShortlist(Tools::getValue('sfl_shortproduct_id'));
            } elseif (Tools::getValue('type') == 'rv') {
                $json['status'] = $temp_obj->removeRecentViewedProduct(Tools::getValue('sfl_shortproduct_id'));
            }
            echo Tools::jsonEncode($json);
            die;
        } elseif (Tools::getValue('method') == 'buy') {
            $id_product = (int) trim(Tools::getValue('product_id'));
            $this->buyProduct($id_product);
        } else {
            echo $temp_obj->processProduct(Tools::getValue('sfl_shortproduct_id'));
        }
    }

    public function buyProduct($id_product)
    {
        $id_product_attribute = (int) Product::getDefaultAttribute($id_product);
        if ($this->context->cart->id) {
            $this->context->cart->updateQty(1, $id_product, $id_product_attribute);
        } else {
            $this->context->cart->add();
            if ($this->context->cart->id) {
                $this->context->cookie->id_cart = (int) $this->context->cart->id;
            }
            $this->context->cart->updateQty(1, $id_product, $id_product_attribute);
        }
        $link = $this->context->link->getPageLink('order');
        echo $link;
        die;
    }
}
