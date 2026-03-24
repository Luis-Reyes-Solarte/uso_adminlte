# Usamos la imagen oficial de PHP 8.0 con Apache
FROM php:8.0-apache

# Instalamos las extensiones que mencionaste: mysqli, curl y mbstring
# Instalamos mysqli Y TAMBIÉN pdo_mysql
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli pdo_mysql   

# Habilitamos el módulo de reescritura de Apache (útil para frameworks y AdminLTE)
RUN a2enmod rewrite

# Copiamos los archivos de tu proyecto al contenedor
COPY . /var/www/html/

# Damos permisos a la carpeta para que Apache pueda leerla
RUN chown -R www-data:www-data /var/www/html