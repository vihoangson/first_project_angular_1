
```php
<?php
        // register all repositories class to the ClassLoader
        (new ClassLoader('Repositories', APPPATH.'models'))->register();
?>
```