<?php
namespace Repositories;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class BookRepository extends EntityRepository {

    public function getAll()
    {
        return $this->getEntitymanager()->createQueryBuilder()
            ->select('p')
            ->from('Entity\Book', 'p')
            ->orderBy('p.name', 'DESC')
            ->getQuery()
            ->getArrayResult();
    }

    // public function getAllProductArrays()
    // {
    //     return $this->getEntitymanager()->createQueryBuilder()
    //         ->select('p')
    //         ->from('Entities\Product', 'p')
    //         ->orderBy('p.name', 'DESC')
    //         ->getQuery()
    //         ->getArrayResult();
    // }

    // public function getProductArrayById($id)
    // {
    //     return $this->getEntitymanager()->createQueryBuilder()
    //         ->select('p')
    //         ->from('Entities\Product', 'p')
    //         ->where('p.id = :id')
    //         ->setParameter('id', $id)
    //         ->getQuery()
    //         ->getOneOrNullResult(Query::HYDRATE_ARRAY);
    // }
}