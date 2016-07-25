Chạy câu lệnh install

> sh install.sh

### Thêm dòng này vào để Doctrine hiểu thư mục Respositories ###

```php
<?php
        // register all repositories class to the ClassLoader
        (new ClassLoader('Repositories', APPPATH.'models'))->register();
?>
```

