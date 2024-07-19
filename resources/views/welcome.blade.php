<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>CRoom Frontend</title>
    <script type="module" crossorigin src="http://localhost:5173/@vite/client"></script>
    <script type="module" crossorigin src="http://localhost:5173/src/main.jsx"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>