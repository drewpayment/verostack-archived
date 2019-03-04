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
    <link href="https://cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css" rel="stylesheet">
    <script>
        // https://github.com/angular/angular-cli/issues/9920
        // global shim was removed with release of Angular 6, but we still need shim for non-ng pkgs
        // that use the global keyword.
        if(global == null) {
            var global = window;
        }
    </script>

<link rel="stylesheet" href="dist/styles.a051f7f07470159f475b.css"></head>
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
<script type="text/javascript" src="dist/runtime.90050927e0c994a937e4.js"></script><script type="text/javascript" src="dist/polyfills.30b5c0daca886afc0d4e.js"></script><script type="text/javascript" src="dist/vend.lib.917d066848c5f8907f85.js"></script><script type="text/javascript" src="dist/main.d9df7b5d2d9a5a8d2244.js"></script></body>
</html>
