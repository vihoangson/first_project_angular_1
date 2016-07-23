<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Book extends REST_Controller {

    function __construct()
    {
        parent::__construct();
    }

    public function index_get(){
        file_put_contents(time()."_index_get.log",json_encode('get'));
        $this->set_response(
            ["data"=>[
                ["Id"=>1,"Name"=>"son1","Description"=>"Description1"],
                ["Id"=>2,"Name"=>"son2","Description"=>"Description2"],
                ["Id"=>3,"Name"=>"son3","Description"=>"Description3"],
                ["Id"=>4,"Name"=>"son4","Description"=>"Description4"],
            ]]);
    }

    public function index_post(){
        file_put_contents(time()."_index_post.log",json_encode([$this->post("Name"),$this->post("Description")]));
    }

    public function index_delete(){
        file_put_contents(time()."_index_delete.log",json_encode('delete'));
    }

}
