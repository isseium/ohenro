#!/bin/sh -x

for file in $(ls)
do
    echo "mysql -u issei_ohenro -p < $file"
done
