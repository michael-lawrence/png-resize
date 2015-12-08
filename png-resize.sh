#!/bin/bash

mkdir -p ./output

for pic in *.png; do
	mogrify -write "output/${pic%.*}-ldpi.png" -format png -resize 18.75% *.png
	mogrify -write "output/${pic%.*}-mdpi.png" -format png -resize 25% *.png
	mogrify -write "output/${pic%.*}-hdpi.png" -format png -resize 37.5% *.png
	mogrify -write "output/${pic%.*}-xhdpi.png" -format png -resize 50% *.png
	mogrify -write "output/${pic%.*}-xxhdpi.png" -format png -resize 75% *.png
	mogrify -write "output/${pic%.*}-xxxhdpi.png" -format png -resize 100% *.png
done


