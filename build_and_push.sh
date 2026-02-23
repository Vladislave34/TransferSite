#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd FrontendForTransfer
docker build -t transfer-react-aws --platform linux/amd64,linux/arm64 --build-arg VITE_API_BASE_URL=https://v1dkos.itstep.click .
docker tag transfer-react-aws:latest v1dkos/transfer-react-aws:latest
docker push v1dkos/transfer-react-aws:latest
echo "Done ---client---!"

cd ../WebApiTransfer
docker build -t transfer-api-aws --platform linux/amd64,linux/arm64 .
docker tag transfer-api-aws:latest v1dkos/transfer-api-aws:latest
docker push v1dkos/transfer-api-aws:latest

echo "Done ---api---!"

read -p "Press any key to exit..."
