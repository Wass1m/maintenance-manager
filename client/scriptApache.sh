#!/bin/bash

a2enmod rewrite

sed -i '/<\/VirtualHost>/e cat apachelines.txt' /etc/apache2/sites-enabled/000-default.conf

systemctl restart apache2

cat /etc/apache2/sites-enabled/000-default.conf


