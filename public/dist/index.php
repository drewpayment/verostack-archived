<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}

    <title>{{ config('app.name', 'Verostack') }}</title>

    <base href="/">

    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script>
        // https://github.com/angular/angular-cli/issues/9920
        // global shim was removed with release of Angular 6, but we still need shim for non-ng pkgs
        // that use the global keyword.
        if(global == null) {
            var global = window;
        }
    </script>

<link rel="stylesheet" href="dist/styles.5ee54ca51282db99fbab.css"></head>
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



<script type="text/javascript" src="dist/runtime.90050927e0c994a937e4.js"></script><script type="text/javascript" src="dist/polyfills.6f97a6de716e35ce02b2.js"></script><script type="text/javascript" src="dist/vend.lib.917d066848c5f8907f85.js"></script><script type="text/javascript" src="dist/main.0190b64686624d91a9b6.js"></script></body>
</html>
