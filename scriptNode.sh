#!/bin/bash


apt-get install curl

curl -fsSL https://deb.nodesource.com/setup_17.x | bash -

apt-get install -y nodejs

apt-get install git

node -v

git --version
