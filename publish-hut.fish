#!/usr/bin/env fish

npm install
npm run build
tar -C dist -cvz . > site.tar.gz
hut pages publish -d robotron.srht.site site.tar.gz
rm site.tar.gz
rm -rf node_modules
rm -rf dist