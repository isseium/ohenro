#!/bin/sh -x

for file in $(ls create_*.sql)
do
    mysql ohenro_test -u ohenro -p < $file
done
