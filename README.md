# Atlaspad/pad

## Localnet/Dev Environment

### 1. Stand Up `Localhost` Network in a Window

```bash
pnpm run hardhat node --network hardhat
```

### 2. `Deploy` Smart-contracts in Another Window

```bash
pnpm run hardhat ignition deploy ./ignition/modules/AtlaspadDemo.ts --network localhost
pnpm run hardhat compile
```

### 3. `Run` Move Deployment Scripts

```bash
./move_stuff.sh
```

### `Stand Up` Svelte Frontend

```bash
pnpm run dev -- --open
```

