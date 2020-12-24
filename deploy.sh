#!/bin/bash
set -x

#Deployment script

# Change to the project directory
cd ~/plsapp/

# Turn on maintenance mode
#php artisan down

# Install/update composer dependecies
#composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
composer install --no-interaction --prefer-dist --optimize-autoloader
composer dump-autoload

# Run database migrations
#php artisan migrate --force

# Run database seeders
#php artisan db:seed --class=NxxxxXxxxxYyy

# Clear caches
php artisan cache:clear

# Clear expired password reset tokens
# php artisan auth:clear-resets

# Clear and cache routes
php artisan route:clear
php artisan route:cache

# Clear and cache config
php artisan config:clear
php artisan config:cache

# Clear view
# php artisan view:clear;

# Install node modules
npm install
npm run prod

# Build assets using Laravel Mix
#gulp --scope=all --production
# gulp --scope=all

# Turn off maintenance mode
#php artisan up
