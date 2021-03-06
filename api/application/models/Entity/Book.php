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
	 * @ManyToOne(targetEntity="TypeBook")
	 * @JoinColumn(name="id_typebook", referencedColumnName="id")
	 */
	protected $id_typebook;

	/**
	 * @Column(type="string", length=32, unique=true, nullable=false)
	 */
	protected $name;

	/**
	 * @Column(type="string", length=2000, nullable=false)
	 */
	protected $description;


	/**
	 * @Column(type="integer", length=5, nullable=false, options={"default":0})
	 */
	protected $star;

	/**
	 * @Column(type="string", length=5000, nullable=true, options={"default":""})
	 */
	protected $images;

	/**
	 * @Column(type="integer", length=1, nullable=false, options={"default":0})
	 */
	protected $status;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Book
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Book
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set star
     *
     * @param integer $star
     *
     * @return Book
     */
    public function setStar($star)
    {
        $this->star = $star;

        return $this;
    }

    /**
     * Get star
     *
     * @return integer
     */
    public function getStar()
    {
        return $this->star;
    }

    /**
     * Set images
     *
     * @param string $images
     *
     * @return Book
     */
    public function setImages($images)
    {
        $this->images = $images;

        return $this;
    }

    /**
     * Get images
     *
     * @return string
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Book
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set idTypebook
     *
     * @param \Entity\TypeBook $idTypebook
     *
     * @return Book
     */
    public function setIdTypebook(\Entity\TypeBook $idTypebook = null)
    {
        $this->id_typebook = $idTypebook;

        return $this;
    }

    /**
     * Get idTypebook
     *
     * @return \Entity\TypeBook
     */
    public function getIdTypebook()
    {
        return $this->id_typebook;
    }
}
