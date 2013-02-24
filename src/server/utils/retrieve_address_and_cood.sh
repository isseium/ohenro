#!/bin/sh
# RESULT=$(sh ./geoencode.sh "$1" | grep Coordinates | sed -e 's/.*\<Coordinates\>\(.*\)\<\/Coordinates\>.*\<Address\>\(.*\)\<\/Address\>.*/\2	\2/' | head -1)
RESULT=$(sh ./geoencode.sh "$1" | grep Coordinates | sed 's/.*\<Coordinates\>\(.*\)\<\/Coordinates\>.*\<Address\>\(.*\)\<\/Address\>.*/\1 \2/')

echo $1	$RESULT
