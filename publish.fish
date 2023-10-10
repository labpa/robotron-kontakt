#!/usr/bin/env fish
tar -C src -cvz . > site.tar.gz
hut pages publish -d robotron.srht.site site.tar.gz
rm sites.tar.gz
