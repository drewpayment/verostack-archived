<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <!-- {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}} -->

    <!-- <title>{{ config('app.name', 'Verostack') }}</title> -->
    <title>Verostack</title>

    <base href="/">

    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Farro|Raleway&display=swap" rel="stylesheet">
    <link href="https://cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css" rel="stylesheet">
    <script>
        // https://github.com/angular/angular-cli/issues/9920
        // global shim was removed with release of Angular 6, but we still need shim for non-ng pkgs
        // that use the global keyword.
        if(global == null) {
            var global = window;
        }
    </script>

<link rel="stylesheet" href="dist/styles.css"></head>
<body>

    <app-root>

        <div class="app-loading">
            <div class="logo"></div>
            <svg class="spinner" viewBox="25 25 50 50">
            <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="2"
                stroke-miterlimit="10"
            />
            </svg>
        </div>

    </app-root>

    <!-- Scripts -->


    <small class="text-muted font-weight-light text-center legal-footer">Payment Group, Inc. &#xa9;2018</small>
<script src="dist/runtime.js" defer></script><script src="dist/polyfills-es5.js" nomodule defer></script><script src="dist/polyfills.js" defer></script><script src="dist/vend.lib.js" defer></script><script src="dist/vendor.js" defer></script><script src="dist/main.js" defer></script></body>
</html>
