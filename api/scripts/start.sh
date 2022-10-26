#!/bin/bash

chmod +x ./scripts/check_db.sh && ./scripts/check_db.sh
php artisan migrate --force

if [[ -z ${APP_KEY} ]]; then
    echo APP_KEY=$(php artisan key:generate --show) >> ~/.bashrc
    source ~/.bashrc
fi

php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache

service php7.2-fpm start && nginx -g "daemon off;"
