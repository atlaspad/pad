# atlaspad/pad

This monorepo hosts the Web2 backend, EVM smart contract and Solidity frontend projects for Atlaspad Launchpad.

## project structure

- Directory `backend`: Express.js backend for the frontend to work
- Directory `evm`: Smart contracts for the launchpad
- Directory `frontend`: Svelte frontend web application of the launchpad

## development environment

### 1. set up ethereum net. on localnet

```bash
pnpm run hardhat node --network hardhat
```

### 2. compile contracts if needed

```bash
pnpm run hardhat compile
```

### 3. prepare contracts

This will deploy contracts to the network, then move ABIs to `frontend`.

```bash
./prep_contracts.sh
```

### 4. deploy a demo project

```bash
cd frontend/scripts
node create-campaign.js
node get-campaign-data.js
```

### 5. start vite to launch Svelte frontend

```bash
pnpm run dev -- --open
```

