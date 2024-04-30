#!/usr/bin/env bash

# change this part according to your chain
CHAIN="31337"

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

chain_dir="$script_dir/evm/ignition/deployments/chain-$CHAIN"
artifacts_dir="$chain_dir/artifacts"
target_dir="$script_dir/src/lib/abi"

files="AtlaspadDemoModule#APLock.json AtlaspadDemoModule#APPool.json AtlaspadDemoModule#APPoolManager.json AtlaspadDemoModule#APToken.json"

for file in $files; do
    new_filename="${file#*#}"
    cp -v "$artifacts_dir/$file" "$target_dir/$new_filename"
done


cp -v "$chain_dir/deployed_addresses.json" "$target_dir/"