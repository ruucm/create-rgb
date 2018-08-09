#!/bin/bash
read -p "App Name: " name
read -p "Git Repo: " url
mkdir "$name"
cd "$name"
git clone git@github.com-ruucm:ruucm/react-gui-builder.git .
rm -rf .git
git init
git remote add origin "$url"
git add --all && git commit -m 'Init 🎉' && git push origin master
npm install
npm run dev
