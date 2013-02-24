#/bin/sh
#
# 入力された地名の緯度経度情報を取得する
# 

QUERY="$@"

APPKEY="buxd.Puxg662idT4Kd8LGdoNWBKywhPDbp4dfPupYfrbu.0ICiES_bkM9iImHA--"
ENDPOINT="http://search.olp.yahooapis.jp/OpenLocalPlatform/V1/localSearch"
ENDPOINT="http://geo.search.olp.yahooapis.jp/OpenLocalPlatform/V1/geoCoder"
URL="${ENDPOINT}?appid=${APPKEY}&query=${QUERY}"

curl "$URL" 2> /dev/null
