<?php

namespace Entity;

/**
 * Book Model
 *
 *
 * @Entity(repositoryClass="Repositories\BookRepository")
 * @Table(name="book")
 */
class Book
{

	/**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 * 
	 */
	protected $id;

	/**
	 * @Column(type="string", length=32, unique=true, nullable=false)
	 */
	protected $name;

	/**
	 * @Column(type="string", length=564, nullable=false)
	 */
	protected $description;


	/**
	 * @Column(type="integer", length=5, nullable=false, options={"default":0})
	 */
	protected $star;

	/**
	 * @Column(type="string", length=5000, nullable=false, options={"default":""})
	 */
	protected $images;

	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getName(){
		return $this->name;
	}

	public function setName($name){
		$this->name = $name;

	}

	public function getDescription(){
		return $this->description;

	}

	public function setDescription($description){
		$this->description = $description;
	}

	public function getStar(){
		return $this->star;
	}

	public function setStar($star){
		$this->star = $star;
	}

	public function getImages(){
		return $this->images;
	}

	public function setImages($images){
		$this->images = $images;
	}

}
