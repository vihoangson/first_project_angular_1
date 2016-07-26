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
  
    public function index_get(){
        if($this->get("id")){
            $data_doctrine[0] = $this->em->getRepository("Entity\Book")->find($this->get("id"));
        }else{
            $data_doctrine = $this->em->getRepository("Entity\Book")->findAll();
        }
        foreach ($data_doctrine as $key => $value) {
            $data[$key]["Id"]          = $value->getId();
            $data[$key]["Name"]        = $value->getName();
            $data[$key]["Description"] = $value->getDescription();
            $data[$key]["Star"]        = $value->getStar();
            $data[$key]["Images"]      = $value->getImages();
        }
        if(count($data)==1){
            $data = $data[0];
        }
        $success=true;
        $this->set_response(compact("data","success"));
    }

    public function index_post(){
        $book = new Entity\Book;
        $book->setName($this->post("Name"));
        $book->setDescription($this->post("Description"));
        $book->setStar($this->post("Star"));
        $book->setImages($this->post("Images"));
        $this->em->persist($book);
        $this->em->flush();
    }

    public function index_put(){
        if($this->put('Id') && $this->put('Id')){
            $book = $this->em->getRepository("Entity\Book")->find($this->put('Id'));
            $book->setName($this->put('Name'));
            $book->setDescription($this->put('Description'));
            $book->setStar($this->put("Star"));
            $book->setImages($this->post("Images"));
            $this->em->persist($book);
            $this->em->flush();
        }
    }

    public function index_delete($id){
        $book = $this->em->getRepository("Entity\Book")->find($id);
        $this->em->remove($book);
        $this->em->flush();
    }

    public function upload_post(){
        $this->log->write_log("debug","upload".time().json_encode($_FILES));
        $config['upload_path'] = '../images/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size']  = '100000';
        $config['max_width']  = '10204';
        $config['max_height']  = '76800';
        $this->load->library('upload', $config);
        
        if ( ! $this->upload->do_upload("file")){
            $error = array('error' => $this->upload->display_errors());
            $return = ["status"=>"error","alert_error"=>$error];
        }
        else{
            $data = array('upload_data' => $this->upload->data());
            $this->log->write_log("debug","info_upload".time().json_encode($data));
            $return = ["status"=>"success","info_file"=>$data["upload_data"]];
        }
        $this->set_response($return);
    }

}
