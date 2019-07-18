#!/bin/bash

chmod +x ./scripts/check_db.sh && ./scripts/check_db.sh
php artisan migrate --force && php artisan db:seed --force
