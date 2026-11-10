"""Assemble apercu/ : page unique (CSS intégré) + dossier assets, prêt pour un hébergement de fichiers."""
import re, glob, os, shutil
src = 'preview-dist'
out = '/tmp/claude-0/artifact'
shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
shutil.copytree(f'{src}/assets', f'{out}/assets')
css_path = glob.glob(f'{src}/assets/styles-*.css')[0]
css = open(css_path).read()
js = os.path.basename(glob.glob(f'{src}/assets/index-*.js')[0])
os.remove(f'{out}/assets/' + os.path.basename(css_path))
page = f'''<title>Maison Kaya Conciergerie</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Confiez votre location courte durée à Maison Kaya : du temps retrouvé, un logement suivi avec soin et un accompagnement local dans le Val-de-Marne.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600&display=swap">
<style>{css}
html,body{{background:var(--background);color:var(--foreground)}}
</style>
<script>
(function(){{try{{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(r)return;d.classList.add("mk-motion");if(matchMedia("(min-width: 768px)").matches)d.classList.add("mk-pin");setTimeout(function(){{if(!window.__mkReady){{d.classList.remove("mk-motion","mk-pin");d.classList.add("mk-failsafe")}}}},5000)}}catch(e){{}}}})();
</script>
<div id="root"></div>
<script type="module" src="./assets/{js}"></script>
'''
open(f'{out}/maison-kaya.html','w').write(page)
print(len(page), js)
