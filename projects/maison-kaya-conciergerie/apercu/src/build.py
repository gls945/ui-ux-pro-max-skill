import os, urllib.parse
D = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(D, "..", "preview")
WA = "https://wa.me/33763901469?text=" + urllib.parse.quote("Bonjour Maison Kaya, je suis propriétaire d'un logement et souhaiterais obtenir des informations sur votre accompagnement.")
body = open(os.path.join(D, "body.html")).read()
body = body.replace("{{LOGO}}", "data:image/png;base64," + open(os.path.join(P, "logo-ink-dark.b64")).read())
body = body.replace("{{LOGO_LIGHT}}", "data:image/png;base64," + open(os.path.join(P, "logo-ink-light.b64")).read())
body = body.replace("{{WA}}", WA.replace("'", "%27"))
js = open(os.path.join(D, "photos.js")).read() + f"const WA = {WA.replace(chr(39), '%27')!r};\n" + open(os.path.join(D, "app.js")).read()
html = f"""<title>Maison Kaya Conciergerie</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Conciergerie Airbnb à Champigny-sur-Marne et dans le Val-de-Marne : accompagnement des propriétaires en location courte durée.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap">
<style>
{open(os.path.join(D, "style.css")).read()}
</style>
{body}
<script type="importmap">{{"imports":{{"three":"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"}}}}</script>
<script type="module">
{js}
</script>
"""
open(os.path.join(D, "maison-kaya.html"), "w").write(html)
open(os.path.join(D, "test.html"), "w").write('<!doctype html><html lang="fr" data-type="service"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + html + "</body></html>")
print(len(html) // 1024, "KB")
