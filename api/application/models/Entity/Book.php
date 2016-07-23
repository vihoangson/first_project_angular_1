<?php

namespace Entity;

/**
 * User Model
 *
 * @Entity
 * @Table(name="book")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Book
{

	/**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
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

}
