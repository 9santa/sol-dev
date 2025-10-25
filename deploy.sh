#!/bin/bash
echo "Building..."
anchor build

echo "Deploying with solana CLI (bypassing Anchor bug)..."
solana program deploy \
    --url https://devnet.helius-rpc.com/?api-key=266b2cbf-077e-4c0f-8bfd-a41756fd0885 \
    --keypair ~/.config/solana/devnet.json \
    --program-id target/deploy/favorites-keypair.json \
    target/deploy/favorites.so

echo "Done! Program ID: HthP1rPekRR4Vrgs5TZxiK7zQiF73bZ3ZewpJwk4jYLv"
