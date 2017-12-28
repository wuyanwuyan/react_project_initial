#!/usr/bin/env bash

rm -rf ./dist

yarn run production

#scp -r -P 6677 ./dist/* xiangsheng@121.41.91.93:/data/bitchart

scp -r -P 6677 ./dist/* xiangsheng@121.41.91.93:/data/bitchart
scp -r -P 6677 ./chartServer.js xiangsheng@121.41.91.93:/data/bitchart


ssh -p 6677 xiangsheng@121.41.91.93 "cd /data/bitchart ; yarn install ;sudo pm2 delete chartServer ; sudo pm2 start chartServer.js"

echo "deploy OK !!!"