#!/usr/bin/env fish
npm run build
cd dist
scp -r * root@hub.nojs.de:/var/www/robotron-kontakt.nojs.de/
