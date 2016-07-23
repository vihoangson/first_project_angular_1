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

    // index
    public function index_get(){
        // $data_doctrine = $this->em->getRepository("Entity\Book")->findAll();
        // foreach ($data_doctrine as $key => $value) {
        //     $data[$key]["Id"] = $value->getId();
        //     $data[$key]["Name"] = $value->getName();
        //     $data[$key]["Description"] = $value->getDescription();
        // }
        
        $data = $this->em->getRepository("Entity\Book")->getAll();
        $success=true;
        $this->set_response(compact("data","success"));
    }

    // Create
    public function index_post(){
        $book = new Entity\Book;
        $book->setName($this->post("name"));
        $book->setDescription($this->post("Description"));
        $this->em->persist($book);
        $this->em->flush();
    }

    // Update
    public function index_put(){
        if($this->put('id') && $this->put('id')){
            $book = $this->em->getRepository("Entity\Book")->find($this->put('id'));
            $book->setName($this->put('name'));
            $book->setDescription($this->put('Description'));
            $this->em->persist($book);
            $this->em->flush();
        }
    }

    // Delete
    public function index_delete($id){
        $book = $this->em->getRepository("Entity\Book")->find($id);
        $this->em->remove($book);
        $this->em->flush();
    }

}
