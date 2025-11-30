#!/bin/bash

# Cloudflare Cache Purge Script for Job Ripper
# Usage: ./scripts/purge-cloudflare-cache.sh

set -e

ZONE_ID="da50bc321811392cea2a4e5405dcc36d"
API_URL="https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Cloudflare cache purge...${NC}"

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set${NC}"
    echo ""
    echo -e "${BLUE}To create and set your API token:${NC}"
    echo ""
    echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Click 'Create Token'"
    echo "3. Use 'Edit zone' template or create custom token with permissions:"
    echo "   - Zone → Cache Purge → Purge"
    echo "   - Zone → Zone Settings → Read"
    echo "4. Copy the token and run:"
    echo ""
    echo "   export CLOUDFLARE_API_TOKEN=your_token_here"
    echo ""
    echo "For permanent setup, add to ~/.zshrc or ~/.bashrc:"
    echo ""
    echo "   echo 'export CLOUDFLARE_API_TOKEN=your_token_here' >> ~/.zshrc"
    echo ""
    exit 1
fi

# Purge all cache
echo "Purging all cache for zone: ${ZONE_ID}"

RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}')

# Check if the request was successful
if echo "$RESPONSE" | grep -q '"success":[[:space:]]*true'; then
    echo -e "${GREEN}✅ Cache purged successfully!${NC}"
    echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1
    exit 0
else
    echo -e "${RED}❌ Failed to purge cache${NC}"
    echo "Response: $RESPONSE"
    exit 1
fi

