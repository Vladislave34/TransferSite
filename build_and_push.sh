#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd FrontendForTransfer
docker build -t transfer-react .
docker tag transfer-react:latest v1dkos/transfer-react:latest
docker push v1dkos/transfer-react:latest
echo "Done ---client---!"

cd ../WebApiTransfer
docker build -t transfer-api .
docker tag transfer-api:latest v1dkos/transfer-api:latest
docker push v1dkos/transfer-api:latest

echo "Done ---api---!"

read -p "Press any key to exit..."
 