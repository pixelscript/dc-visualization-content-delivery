<script>
  import { createEventDispatcher } from "svelte";
  export let format;
  export let depth;
  export let v2;
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
  select,
  input {
    margin-right: 1em;
  }
  nav {
    padding: 0.5em;
    background: #eee;
    box-sizing: border-box;
  }
</style>

<nav>
  <label for="v2">v2</label>
  <input
    type="checkbox"
    id="v2"
    bind:checked={v2}
    on:change={() => {
      dispatch('change', { format, depth, v2 });
    }} />
  <label for="depth">depth</label>
  <select
    id="depth"
    bind:value={depth}
    on:change={() => {
      dispatch('change', { format, depth, v2 });
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
      dispatch('change', { format, depth, v2 });
    }}>
    {#each formatOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</nav>
