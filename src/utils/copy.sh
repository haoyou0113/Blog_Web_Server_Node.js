#!/bin/sh
cd /Users/you/暑假学习/node/blog1/logs
cp access.log $(date + %y-%m-%d).access.log
echo "" > access.log