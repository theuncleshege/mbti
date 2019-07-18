#!/bin/bash

COMMAND="mysql -h $DB_HOST -P ${DB_PORT} -u $DB_USERNAME -p$DB_PASSWORD -e exit"
until $COMMAND > /dev/null; do
    echo "DB is currently unavailable - Sleeping..."
    sleep 15
done
