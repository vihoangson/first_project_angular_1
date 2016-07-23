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

    private $em;

    function __construct()
    {
        parent::__construct();
        $this->em = $this->doctrine->em;
    }
    private function encodeUserDataToJson(User $user)
    {
        $userData = array(
            'id' => $user->getId(),
            'profile' => array(
                'nickname' => $user->getProfile()->getNickname()
            )
        );

        $jsonEncoder = new JsonEncoder();        
        return $jsonEncoder->encode($userData, $format = 'json');
    }
    public function index_get(){

        log_message('debug',time()."_index_get.log",json_encode('get'));

        $data_doctrine = $this->em->getRepository("Entity\User")->findAll();

        foreach ($data_doctrine as $key => $value) {
            $data[$key]["Id"] = $value->getId();
            $data[$key]["Description"] = $value->getUsername();
        }
        $status=true;
        $this->set_response([compact("data","status")]);
    }

    public function index_post(){
        log_message('debug',time()."_index_post.log",json_encode([$this->post("Name"),$this->post("Description")]));
        $user = new Entity\User;
        $user->setUsername($this->post("Name")."__".time());
        $user->setPassword($this->post("Description")."__".time());
        $user->setEmail($this->post("Name").time());
        $this->em->persist($user);
        $this->em->flush();
    }

    public function index_put(){
        log_message('debug',time()."_index_put.log",json_encode('put'.$this->delete('id')));
    }

    public function index_delete($id){
        log_message('debug',time()."_index_delete.log",json_encode('delete'.$this->delete('id')));
    }

}
