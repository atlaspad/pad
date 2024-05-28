# Atlaspad/pad

## Localnet/Dev Environment

### 1. deploy ethereum vm on localnet

```bash
pnpm run hardhat node --network hardhat
```

### 2. deploy contracts to the network

```bash
pnpm run hardhat compile
pnpm run hardhat ignition deploy ./ignition/modules/AtlaspadDemo.ts --network localhost
```

### 3. move ABIs to UI directory

```bash
./move_stuff.sh
```

### start vite to launch Svelte frontend

```bash
pnpm run dev -- --open
```

