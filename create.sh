#!/bin/bash

function createNewPage() {
    cp -r "src/app/template" "src/app/$page"
    for ext in html js scss; do
        mv "src/app/$page/template.$ext" "src/app/$page/$page.$ext"
        sed -i -e "s/template/$page/g" "src/app/$page/$page.$ext"
    done
}

echo "Please enter name of new page:"
read page
createNewPage $page