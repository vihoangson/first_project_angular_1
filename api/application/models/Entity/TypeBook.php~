<?php

namespace Entity;

/**
 * Book Model
 *
 *
 * @Entity(repositoryClass="Repositories\TypeBookRepository")
 * @Table(name="TypeBook")
 */
class TypeBook
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
     * @return TypeBook
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
     * @return TypeBook
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
     * @return TypeBook
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
     * @return TypeBook
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
     * @return TypeBook
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
}
