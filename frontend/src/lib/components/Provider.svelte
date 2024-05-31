<script>
  import { createEventDispatcher, createContext } from 'svelte';


  const mainContext = createContext();


  const mainContextValue = buildMainContextValue();

  const dispatch = createEventDispatcher();

  export let children;
</script>

<mainContext.Provider value={mainContextValue}>
  {children}
</mainContext.Provider>

<style>
  /* :p */
</style>
