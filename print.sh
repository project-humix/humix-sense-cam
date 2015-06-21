#!/bin/bash

echo DIR: `pwd`
echo UID: $1


sudo composite -gravity south ./controls/humix-sense-cam/frame.png ./controls/humix-sense-cam/pics/$1.jpg ./controls/humix-sense-cam/pics/$1_frame.jpg
lp -d Canon_CP910_ipp ./controls/humix-sense-cam/pics/$1_frame.jpg
