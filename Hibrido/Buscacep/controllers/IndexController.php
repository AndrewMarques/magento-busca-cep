<?php

/**
 * @category Hibrido
 * @package Hibrido_Buscacep
 * @author Hibrido <hibrido@souhibrido.com.br>
 */
class Hibrido_Buscacep_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     * @var string
     */
    private $url = 'http://cep.republicavirtual.com.br/web_cep.php';

    /**
     * @access public
     * @return string
     */
    public function indexAction()
    {
        echo 'dadasda';
        die;
        if ($this->getRequest()->getPost()) {
            $cep = $this->getRequest()->getPost('cep', false);
        } else {
            $cep = $this->getRequest()->getQuery('cep', false);
        }

        echo file_get_contents($this->url .'?cep=' . urlencode($cep) . '&formato=javascript');
    }
}
