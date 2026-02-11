#!/bin/bash
set -e



# ================= FRONTEND =================
cd FrontendForTransfer

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t v1dkos/transfer-react-aws:latest \
  --build-arg VITE_API_BASE_URL=https://v1dkos.itstep.click \
  --push \
  .

echo "Done --- client ---"

cd ..

# ================= API =================
cd WebApiTransfer

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t v1dkos/transfer-api-aws:latest \
  --push \
  .

echo "Done --- api ---"