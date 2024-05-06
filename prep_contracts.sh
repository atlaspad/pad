#!/usr/bin/env bash

CHAIN="31337"

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

chain_dir="$script_dir/evm/ignition/deployments/chain-$CHAIN"
artifacts_dir="$chain_dir/artifacts"
target_dir="$script_dir/src/lib/abi"

move_over() {
    cd "$script_dir"

    for file in $files; do
        new_filename="${file#*#}"
        cp -v "$artifacts_dir/$file" "$target_dir/$new_filename"
    done

    cp -v "$script_dir/evm/artifacts/contracts/Campaign/APCampaign.sol/APCampaign.json" "$target_dir/"

    cp -v "$chain_dir/deployed_addresses.json" "$target_dir/"
}

mkdir -p $target_dir

files="AtlaspadDemoModule#APLock.json AtlaspadDemoModule#APPool.json AtlaspadDemoModule#APPoolManager.json AtlaspadDemoModule#APToken.json AtlaspadDemoModule#APCampaignManager.json"

cd "$script_dir/evm"
pnpm run hardhat ignition deploy $script_dir/evm/ignition/modules/AtlaspadDemo.ts --network localhost

if [ "$?" -ne "1" ]; then
    move_over
fi
