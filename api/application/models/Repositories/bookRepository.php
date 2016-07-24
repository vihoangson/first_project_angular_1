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
}