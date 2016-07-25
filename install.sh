bower install --allow-root
cd api
composer install
php application/doctrine orm:schema-tool:create