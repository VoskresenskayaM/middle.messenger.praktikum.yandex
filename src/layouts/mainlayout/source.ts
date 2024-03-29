export const source = `<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <link rel="'icon" type="image/svg+xml" href="/static/favicon/message.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>

<body>
    <div id="app">
        {{> @partial-block}}
    </div>
    <script type="module" src={{scriptPath}}></script>
</body>

</html>`;
