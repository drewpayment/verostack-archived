# Verostack

### Scheme
- Laravel 5.7 API
	- Supports native and web apps
	- Laravel Passport, JWT authentication and Firebase authentication capabilities
- Angular 7 SPA Frontend

## Getting Started 
This application is designed to be a decoupled json api service that can be accessible to a multitude of different types of applications. For the sake of dev ops simplicity, the Angular SPA is installed within this Laravel API. This means that the web middleware and routing is enabled for a single route. 

The users have to be authenticated via Laravel Passport and issued a JWT token or there are particular Firebase authorized endpoints that the mobile application is allowed to hit directly from a Firebase authentication. This has limited scope of use at this point, because of the way we are relying on user management.

## Installation
----
Install Apache and MySql in the platform of our choice. Links below are detailed information on both and are FOSS. However, there are alternatives that package the webserver and sql requirements into desktop software like WAMP, XAMP AND MAMP. Sometimes they come at a cost of giving out some advertising info, or even cost small fees in the case of MAMP. 

The other advantage of using an all-in-one solution (especially on Windows) is that they bundle PHP and everything else you need... 

### Manual Server Installation

You will need: 
1. PHP
	- [PHP for Windows](http://kizu514.com/blog/install-php7-and-composer-on-windows-10/)
	- [PHP for mac OS](https://medium.com/@romaninsh/install-php-7-2-on-macos-high-sierra-with-homebrew-bdc4d1b04ea6)
2. Apache
	- [Apache for Windows](https://httpd.apache.org/docs/2.4/platform/windows.html) 
	- [Apache for mac OS](https://tecadmin.net/install-apache-macos-homebrew/)
3. MySql
	- [MySql for Windows](https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html)
	- [MySql for mac OS](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html)


Windows: 

[Apache for Windows](https://httpd.apache.org/docs/2.4/platform/windows.html) 

[MySql for Windows](https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html)

Mac/Linux:

[Apache for mac OS](https://tecadmin.net/install-apache-macos-homebrew/)

[MySql for mac OS](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html)

Next, clone the Git repository.

```
git clone https://github.com/drewpayment/verostack
```

### Install Laravel Dependencies and setup .env

```
// install deps
composer install

// create .env file windows 
COPY .env.example .env

// create .env file mac os/linux
cp .env.example .env
```

Next, make appropriate changes to .env
```
// required vars
APP_NAME, APP_ENV, APP_KEY, APP_DEBUG, APP_LOG_LEVEL, APP_URL, 
HEADLESS, NODE_PATH, FIREBASE_PROJECT_NAME

// mysql credentials required
DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

### Run Laravel Migrations
Navigate to the root of your project root in CLI

```
php artisan migrate
```

### Angular
Navigate to `~/resources/assets/ng`
```
npm install

ng build --watch
```

