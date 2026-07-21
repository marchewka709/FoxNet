export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Błąd | Foxnet</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; }
    .container { text-align: center; padding: 2rem; }
    h1 { font-size: 3rem; margin: 0; }
    p { font-size: 1.125rem; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>500</h1>
    <p>Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj ponownie później.</p>
  </div>
</body>
</html>`;
}