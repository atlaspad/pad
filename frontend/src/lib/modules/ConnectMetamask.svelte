<script lang="ts">
  import { writable } from 'svelte/store';
  import { tryWithToast } from "../utils/toast";
  import { formatPadTokenAmount, shortenAddress } from "../utils/ui";
  import { web3 } from "../web3";

  const connectedAccount = writable<string | null>(null);
  const padTokenBalance = writable<number | null>(null);

  async function connectMetamask() {
    await tryWithToast("Connect MetaMask", async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();

      connectedAccount.set(accounts[0]);
    });
  }

  function disconnectWallet() {
    connectedAccount.set(null);
  }

  $: $connectedAccount = $connectedAccount;

  function handleConnect() {
    if ($connectedAccount) {
      disconnectWallet();
    } else {
      connectMetamask();
    }
  }
</script>

<button
  type="button"
  class="btn"
  on:click={handleConnect}>
  {#if $connectedAccount}
    <span>{shortenAddress($connectedAccount)}</span>
    {#if $padTokenBalance !== null}
      <div class="badge badge-secondary">
        {$padTokenBalance}
      </div>
    {/if}
  {:else}
    Connect MetaMask
  {/if}
</button>
