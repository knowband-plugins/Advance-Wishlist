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

class SFLCore extends Module
{

    const SFL_MODEL_NAME = 'kb_sfl';
    const MODULE_KEY = 'saveforlater1234';

    /* Recommendation Options */
    const SFL_BANNER = 1;
    const SFL_RELATED = 2;
    const SFL_SEL_PRODUCTS = 3;

    /* Banner Parameters */
    const BANNER_PATH = 'views/img/banner/';
    const DEFAULT_BANNER_FILE = 'sfl_default_banner.jpg';

    /*
     * Maximum size of banner upload
     * 500kb
     */
    const MAX_UPLOAD_SIZE = 512000;
    const BANNER_WIDTH = 400;
    const BANNER_HEIGHT = 160;
    const SFL_TBL_LIMIT = 10;
    /*
     * use "left" to display pagination on left side
     */
    const PAGINATION_ALIGN = 'right';
    const REPORT_LOCATION = 'reports/';

    public function __construct()
    {
        parent::__construct();

        if (!Configuration::get('KB_SAVE_LATER')) {
            $this->warning = $this->l('No name provided');
        }
    }

    public function install()
    {
        if (!parent::install() || !$this->registerHook('displayTop') || !$this->registerHook('displayOrderConfirmation') || !$this->registerHook('displayProductPriceBlock')) {
            return false;
        }

        return true;
    }

    public function uninstall()
    {
        if (!parent::uninstall() || !Configuration::deleteByName('KB_SAVE_LATER') || !$this->unregisterHook('displayTop') || !$this->unregisterHook('displayProductPriceBlock') || !$this->unregisterHook('displayOrderConfirmation')) {
            return false;
        }

        Configuration::deleteByName('KB_SAVE_LATER_RECOMM');

        return true;
    }

    protected function installModel()
    {
        $sql = 'CREATE TABLE if not exists `' . _DB_PREFIX_ . self::SFL_MODEL_NAME . '` (
				`short_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
				`id_product` int(10) unsigned NOT NULL,
				`id_customer` int(11) NOT NULL,
				`email` varchar(50) NOT NULL,
                                `id_order` int(10) unsigned NULL,
				`id_currency` int(4) NOT NULL,
				`currency_code` varchar(10) NOT NULL,
				`id_shop` int(10) unsigned NULL,
                                `id_lang` int(10) unsigned NULL,
                                `date_add` datetime NOT NULL,
				`date_upd` datetime NOT NULL,
				FOREIGN KEY (id_product) references ' . _DB_PREFIX_ . 'product (id_product) ON DELETE CASCADE,
				FOREIGN KEY (id_lang) references ' . _DB_PREFIX_ . 'lang (id_lang) ON DELETE SET NULL,
				FOREIGN KEY (id_shop) references ' . _DB_PREFIX_ . 'shop (id_shop) ON DELETE SET NULL,
				FOREIGN KEY (id_order) references ' . _DB_PREFIX_ . 'orders (id_order) ON DELETE SET NULL
				)';

        if (!Db::getInstance(_PS_USE_SQL_SLAVE_)->execute($sql)) {
            $this->custom_errors[] = 'Installation Failed: Error Occurred while installing models.';
            return false;
        }
    }

    protected function getDefaultSettings()
    {
        $settings = array(
            'general' => array(
                'enable' => 0,
                'border_color' => '#dedede',
                'buy_color' => '#134baa',
                'bar_color' => '#e4e4e4'
            ),
            'saveforlater' => array(
                'enable' => 0,
                'enable_buy_btn' => 1,
                'bold' => 0,
                'italic' => 0,
                'color' => '#000000',
                'default_text' => $this->l('My Shortlist')
            ),
            'recently_view' => array(
                'enable' => 0,
                'enable_buy_btn' => 1,
                'bold' => 0,
                'italic' => 0,
                'color' => '#000000',
                'limit' => $this->getDefaultRecentLimit(),
                'default_text' => $this->l('Recently Viewed')
            ),
            'recommendation' => array(
                'enable' => 0,
                'enable_buy_btn' => 1,
                'bold' => 0,
                'italic' => 0,
                'color' => '#000000',
                'default_text' => $this->l('Recommendations')
            )
        );
        return $settings;
    }

    public function getDefaultRecentLimit()
    {
        return 10;
    }

    protected function processSettingBeforeSave(&$setting)
    {
        if (!isset($setting['general']['enable'])) {
            $setting['general']['enable'] = 0;
        }
        if (!isset($setting['saveforlater']['enable'])) {
            $setting['saveforlater']['enable'] = 0;
        }
        if (!isset($setting['saveforlater']['enable_buy_btn'])) {
            $setting['saveforlater']['enable_buy_btn'] = 0;
        } else {
            $setting['saveforlater']['enable_buy_btn'] = 0;
        }
        if (!isset($setting['recently_view']['enable'])) {
            $setting['recently_view']['enable'] = 0;
        } else {
            $setting['recently_view']['enable'] = 0;
        }
        if (!isset($setting['recently_view']['enable_buy_btn'])) {
            $setting['recently_view']['enable_buy_btn'] = 0;
        } else {
            $setting['recently_view']['enable_buy_btn'] = 0;
        }
        if (!isset($setting['recommendation']['enable'])) {
            $setting['recommendation']['enable'] = 0;
        } else {
            $setting['recommendation']['enable'] = 0;
        }
        if (!isset($setting['recommendation']['enable_buy_btn'])) {
            $setting['recommendation']['enable_buy_btn'] = 0;
        } else {
            $setting['recommendation']['enable_buy_btn'] = 0;
        }
    }

    protected function getTotalPages($qry, $cols = 'count(*) as total', $use_count = true)
    {
        $total_records = 0;
        if ($use_count) {
            $temp = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow(str_replace('{COLUMN}', $cols, $qry));
            if (!empty($temp) && count($temp) > 0) {
                $total_records = (int) $temp['total'];
            }
        } else {
            $temp = Db::getInstance(_PS_USE_SQL_SLAVE_)->getExecuteS(str_replace('{COLUMN}', $cols, $qry));
            if (!empty($temp) && count($temp) > 0) {
                $total_records = (int) count($temp);
            }
        }

        $records = array('total_records' => $total_records, 'total_pages' => ceil($total_records / self::SFL_TBL_LIMIT));
        return $records;
    }

    protected function customPaginator($total_records, $total_pages, $ajaxcallfn = '', $current_page = 1)
    {
        $summary_txt = '';
        $pagination = '';
        if ($total_pages > 0 && $total_pages != 1 && $current_page <= $total_pages) {
            $summary_align = 'abd-pagination-left';
            $pagination_align = 'abd-pagination-left';
            if (self::PAGINATION_ALIGN == 'right') {
                $summary_align = 'abd-pagination-left';
                $pagination_align = 'abd-pagination-right';
            }
            $record_start = $current_page;
            $record_end = self::SFL_TBL_LIMIT;
            if ($current_page > 1) {
                $record_start = (($current_page - 1) * self::SFL_TBL_LIMIT) + 1;
                if ($current_page == $total_pages) {
                    $record_end = $total_records;
                } else {
                    $record_end = $current_page * self::SFL_TBL_LIMIT;
                }
            }

            $summary_txt = '<div class="' . $summary_align . ' abd-paginate-summary">
				Showing ' . $record_start . ' to ' . $record_end . ' of ' . $total_records . ' (' . $total_pages . ' pages)</div>';

            $pagination .= '<div class="' . $pagination_align . '"><ul class="abd-pagination">';

            $ajax_call_function = '';
            if ($ajaxcallfn != '') {
                $ajax_call_function .= $ajaxcallfn . '({page_number});';
            }

            $right_links = $current_page + 3;
            $previous = $current_page - 3; //previous link
            $first_link = true; //boolean var to decide our first link

            if ($current_page > 1) {
                $previous_link = ($previous == 0) ? 1 : $previous;
                $pagination .= '<li class="first"><a href="javascript:void(0)" data-page="1" 
					onclick="' . str_replace('{page_number}', 1, $ajax_call_function) . '" 
					title="First">&laquo;</a></li>'; //first link
                $pagination .= '<li><a href="javascript:void(0)" data-page="' . $previous_link . '" 
					onclick="' . str_replace('{page_number}', $previous_link, $ajax_call_function) . '" 
					title="Previous">&lt;</a></li>'; //previous link
                for ($i = ($current_page - 2); $i < $current_page; $i++) {
                    if ($i > 0) {
                        $pagination .= '<li><a href="javascript:void(0)" data-page="' . $i . '" 
						onclick="' . str_replace('{page_number}', $i, $ajax_call_function) . '" 
						title="Page' . $i . '">' . $i . '</a></li>';
                    }
                }
                $first_link = false; //set first link to false
            }

            if ($first_link) {
                $pagination .= '<li class="first active">' . $current_page . '</li>';
            } elseif ($current_page == $total_pages) {
                $pagination .= '<li class="last active">' . $current_page . '</li>';
            } else {
                $pagination .= '<li class="active">' . $current_page . '</li>';
            }

            for ($i = $current_page + 1; $i < $right_links; $i++) {
                if ($i <= $total_pages) {
                    $pagination .= '<li><a href="javascript:void(0)" data-page="' . $i . '" 
					onclick="' . str_replace('{page_number}', $i, $ajax_call_function) . '" 
					title="Page ' . $i . '">' . $i . '</a></li>';
                }
            }
            if ($current_page < $total_pages) {
                $next_link = ($i > $total_pages) ? $total_pages : $i;
                $pagination .= '<li><a href="javascript:void(0)" data-page="' . $next_link . '" 
					onclick="' . str_replace('{page_number}', $next_link, $ajax_call_function) . '" 
					title="Next">&gt;</a></li>'; //next link
                $pagination .= '<li class="last"><a href="javascript:void(0)" data-page="' . $total_pages . '" 
					onclick="' . str_replace('{page_number}', $total_pages, $ajax_call_function) . '" 
					title="Last">&raquo;</a></li>'; //last link
            }

            $pagination .= '</div></ul>';
            return $summary_txt . $pagination;
        }
        return '';
    }

    protected function getDefaultRecommendOption()
    {
        $option = array(
            'setting' => self::SFL_RELATED,
            'content' => array()
        );
        return $option;
    }

    protected function loadMedia()
    {
        $css_path = $this->_path . 'views/css/';
        $js_path = $this->_path . 'views/js/';

        //CSS files
        $this->context->controller->addCSS($css_path . 'saveforlater.css');
        $this->context->controller->addCSS($css_path . 'bootstrap.css');
        $this->context->controller->addCSS($css_path . 'responsive.css');
        $this->context->controller->addCSS($css_path . 'fonts/glyphicons_regular.css');
        $this->context->controller->addCSS($css_path . 'fonts/font-awesome.min.css');
        $this->context->controller->addCSS($css_path . 'bootstrap-switch.css');
        $this->context->controller->addCSS($css_path . 'style-light.css');
        $this->context->controller->addCSS($css_path . 'multiple-select.css');

        $this->context->controller->addJs($js_path . 'common.js');
        $this->context->controller->addJs($js_path . 'uniform/jquery.uniform.min.js');
        $this->context->controller->addJs($js_path . 'bootstrap-switch.js');
        $this->context->controller->addJs($js_path . 'jscolor.js');
        $this->context->controller->addJs($js_path . 'jquery.multiple.select.js');
        $this->context->controller->addJs($js_path . 'saveforlater.js');
        $this->context->controller->addJs($js_path . 'velovalidation.js');

        //Font style options
        $this->context->controller->addCSS($css_path . 'font_style_option.css');
        $this->context->controller->addJs($js_path . 'font-style-option.js');
        $this->context->controller->addCSS($css_path . 'colpick.css');
        $this->context->controller->addJs($js_path . 'colpick.js');

        //Charts
        if (_PS_VERSION_ < '1.6.0') {
            $this->context->controller->addJs($js_path . 'flot/jquery.flot.min.js');
        } else {
            $this->context->controller->addJqueryPlugin('flot');
        }

        $this->context->controller->addJs($js_path . 'flot/jquery.flot.tooltip.js');
        $this->context->controller->addJs($js_path . 'flot/jquery.flot.symbol.js');
        $this->context->controller->addJs($js_path . 'flot/jquery.flot.axislabels.js');
        $this->context->controller->addJs($js_path . 'flot/jquery.flot.orderBars.js');
    }

    protected function getBaseLink($id_shop = null, $ssl = null)
    {
        static $force_ssl = null;

        if ($ssl === null) {
            if ($force_ssl === null) {
                $force_ssl = (Configuration::get('PS_SSL_ENABLED') && Configuration::get('PS_SSL_ENABLED_EVERYWHERE'));
            }
            $ssl = $force_ssl;
        }

        if (Configuration::get('PS_MULTISHOP_FEATURE_ACTIVE') && $id_shop !== null) {
            $shop = new Shop($id_shop);
        } else {
            $shop = $this->context->shop;
        }

        $base = (($ssl && (bool) Configuration::get('PS_SSL_ENABLED')) ? 'https://' . $shop->domain_ssl : 'http://' . $shop->domain);

        return $base . $shop->getBaseURI();
    }

    private function getDefaultBanner()
    {
        $file_path = _PS_MODULE_DIR_ . 'saveforlater/' . self::BANNER_PATH;
        $banner_arr = array();
        $banner_arr['banner_1'] = array(
            'name' => self::DEFAULT_BANNER_FILE,
            'title' => 'Banner 1',
            'src' => ImageManager::thumbnail($file_path . self::DEFAULT_BANNER_FILE, 'cached_' . self::DEFAULT_BANNER_FILE, 100),
            'link' => '',
        );

        $banner_arr['banner_2'] = array(
            'name' => self::DEFAULT_BANNER_FILE,
            'title' => 'Banner 2',
            'src' => ImageManager::thumbnail($file_path . self::DEFAULT_BANNER_FILE, 'cached_' . self::DEFAULT_BANNER_FILE, 100),
            'link' => '',
        );
        return $banner_arr;
    }


    protected function createCategoryTree()
    {
        $data = array();
        $root_category = Category::getRootCategories();
        $all = Category::getSimpleCategories($this->context->language->id);
        foreach ($all as $c) {
            if ($root_category[0]['id_category'] != $c['id_category']) {
                $tmp = new Category($c['id_category'], $this->context->language->id, $this->context->shop->id);
                $parents = $tmp->getParentsCategories();

                $parents = array_reverse($parents);
                $str = '';
                foreach ($parents as $p) {
                    $str .= '>>' . $p['name'];
                }

                $data[] = array(
                    'id_category' => $c['id_category'],
                    'name' => ltrim($str, '>>')
                );
            }
        }
        return $data;
    }

    protected function getProducts($categories = array())
    {
        if (count($categories) > 0) {
            $cat_condition = ' WHERE id_category IN (\'' . pSQL(implode(',', $categories)) . '\')';
            $sql = 'Select distinct(id_product) as id_product from ' . _DB_PREFIX_ . 'category_product' . $cat_condition;
            $cat_products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        } else {
            $cat_products = Product::getSimpleProducts($this->context->language->id);
        }

        $products = array();
        foreach ($cat_products as $id_product) {
            $pro = new Product($id_product['id_product'], false, $this->context->language->id, $this->context->shop->id);
            $id_image = $pro->getCoverWs();
            $path_to_image = _PS_IMG_DIR_ . 'p/' . Image::getImgFolderStatic($id_image) . (int) $id_image . '.jpg';
            $image = ImageManager::thumbnail($path_to_image, 'product_mini_' . $id_product['id_product'] . '_' . $pro->id_shop_default . '.jpg', 60, '.jpg');
            $products[$id_product['id_product']] = array(
                'id_product' => $id_product['id_product'],
                'name' => $pro->name,
                'reference' => $pro->reference,
                'image' => $image
            );
            unset($pro);
        }

        return $products;
    }

    protected function getProduct($id_product = 0)
    {
        $json = array();
        if ($id_product > 0) {
            $pro = new Product($id_product, false, $this->context->language->id, $this->context->shop->id);
            $id_image = $pro->getCoverWs();
            $path_to_image = _PS_IMG_DIR_ . 'p/' . Image::getImgFolderStatic($id_image) . (int) $id_image . '.jpg';
            $image = ImageManager::thumbnail($path_to_image, 'product_mini_' . $id_product . '_' . $pro->id_shop_default . '.jpg', 60, '.jpg');
            $json = array(
                'id_product' => $id_product['id_product'],
                'name' => $pro->name,
                'reference' => $pro->reference,
                'image' => $image
            );
        }

        return $json;
    }

    protected function createCategoryLevel($cat_name, $id_parent, $categories)
    {
        foreach ($categories as $cat) {
            if ($cat['id_category'] == $id_parent) {
                $cat_name[] = $cat['name'];
                if ($cat['id_parent'] == 0) {
                    return $cat_name;
                } else {
                    $cat_name = $this->createCategoryLevel($cat_name, $cat['id_parent'], $categories);
                }
            }
        }
        return $cat_name;
    }

    protected function saveRecommendOptions()
    {
        $recommend_setting = Tools::getValue('recommendations');
        $recommend_setting['setting'] = 2;
        if (!isset($recommend_setting['content']) || empty($recommend_setting['content'])) {
            $recommend_setting['content'] = array();
        }
        $content_setting = array();
        $error = false;
        $recommend_setting['setting'] = self::SFL_RELATED;
        $content_setting = array();

        $setting_array = array(
            'setting' => $recommend_setting['setting'],
            'content' => $content_setting
        );

        Configuration::updateValue('KB_SAVE_LATER_RECOMM', Tools::jsonEncode($setting_array), true);

        if (!$error) {
            return $this->displayConfirmation($this->l('Recommended options has been saved successfully.'));
        } else {
            return $this->displayError($str);
        }
    }

    private function validateBanner($file)
    {
        /* Knowband image validation start */
        $post_max_size = ini_get('post_max_size');
        $bytes = trim($post_max_size);
        $detectedType = exif_imagetype($file['tmp_name']);
        $allowedTypes = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF);
        $extensions = array("jpeg", "jpg", "png", "JPEG", "JPG", "PNG", "gif", "GIF");
        $file_ext = pathinfo($file['original_name'], PATHINFO_EXTENSION);

        $last = Tools::strtolower($post_max_size[Tools::strlen($post_max_size) - 1]);

        switch ($last) {
            case 'g':
                $bytes *= 1024 * 1024 * 1024;
                break;
            case 'm':
                $bytes *= 1024 * 1024;
                break;
            case 'k':
                $bytes *= 1024;
                break;
        }

        $error = '';
        if ($bytes && ($_SERVER['CONTENT_LENGTH'] > $bytes)) {
            $error = $this->l('The uploaded file exceeds the post_max_size directive in php.ini');
        } elseif (preg_match('/\%00/', $file['name'])) {
            $error = $this->l('Invalid file name.');
        } elseif ($file['size'] > self::MAX_UPLOAD_SIZE) {
            $error = $this->l('File is too big.');
        } elseif (in_array($detectedType, $allowedTypes) === false) {
            $error = $this->l('File Type not allowed, please choose a JPEG or PNG or GIF file.');
        } elseif (in_array($file_ext, $extensions) === false) {
            $error = $this->l('Extension not allowed, please choose a JPEG or PNG or GIF file.');
        }

        return $error;
        /* Knowband image validation end */
    }

    protected function getFromDate()
    {
        $total_days = date('t', strtotime(date('Y-m-d', strtotime(date('Y-m') . ' -1 month')))) + date('d', time());
        return date('Y-m-d 00:00:00', strtotime('-' . ($total_days - 1) . ' day', strtotime(date('Y-m-d', time()))));
    }

    protected function prepareFilterVariable($action = null)
    {
        $param = array();
        $param['type'] = 0;
        $param['products'] = '';
        $param['from_date'] = $this->getFromDate();
        $param['to_date'] = date('Y-m-d 00:00:00', time());
        $param['categories'] = '';
        if ($action == null) {
            $param['products'] = Tools::getValue('products');
            $param['from_date'] = (Tools::getValue('from_date') != '') ? Tools::getValue('from_date') : $this->getFromDate();
            $param['to_date'] = (Tools::getValue('to_date') != '') ? Tools::getValue('to_date') : date('Y-m-d h:i:s', time());
            if (Tools::getIsset('type')) {
                $param['type'] = Tools::getValue('type');
                if (Tools::getValue('type') == 0) {
                    $param['categories'] = Tools::getValue('categories');
                }
            }
        }
        return $param;
    }

    protected function removeExportedReport()
    {
        $files = glob(_PS_MODULE_DIR_ . 'saveforlater/' . self::REPORT_LOCATION . '*.csv');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }
}
