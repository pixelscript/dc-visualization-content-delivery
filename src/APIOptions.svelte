<script>
  import { createEventDispatcher } from "svelte";
  export let format;
  export let depth;
  const dispatch = createEventDispatcher();
  const depthOptions = [
    {
      label: "----",
      value: "",
    },
    {
      label: "root",
      value: "root",
    },
    {
      label: "all",
      value: "all",
    },
  ];

  const formatOptions = [
    {
      label: "----",
      value: "",
    },
    {
      label: "linked",
      value: "linked",
    },
    {
      label: "inlined",
      value: "inlined",
    },
  ];
</script>

<style>
  select,
  label {
    font-family: Helvetica, Arial, sans-serif;
    line-height: 1em;
    box-sizing: border-box;
    color: #333;
  }
  select {
    margin-right: 1em;
  }
  nav {
    padding: 0.5em;
    background: #eee;
    box-sizing: border-box;
  }
</style>

<nav>
  <label for="depth">depth</label>
  <select
    id="depth"
    bind:value={depth}
    on:change={() => {
      dispatch('change', { format, depth });
    }}>
    {#each depthOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <label for="format">format</label>
  <select
    id="format"
    bind:value={format}
    on:change={() => {
      dispatch('change', { format, depth });
    }}>
    {#each formatOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</nav>
