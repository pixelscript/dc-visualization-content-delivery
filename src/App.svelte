<script>
  import { CDService } from "./cd.service.js";
  import APIOptions from "./APIOptions.svelte";
  import { afterUpdate } from "svelte";
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import "highlight.js/styles/github.css";
  hljs.registerLanguage("json", json);
  const sparams = new URLSearchParams(window.location.search);
  let codeBlock;
  let codeBlockFormatted;
  const vse = sparams.get("vse");
	const id = sparams.get("id");
	// once we have Nullish Coalescing, this will look much nicer
  const format =
    sparams.get("format") && sparams.get("format") !== ""
      ? sparams.get("format")
      : "inlined";
  const depth =
    sparams.get("depth") && sparams.get("depth") !== ""
      ? sparams.get("depth")
      : "all";
  const locale = sparams.get("locale");
  const params = { vse, id, format, depth, locale };
  let service = new CDService(params);
  let error = false;
  let content = {};
  $: contentString = JSON.stringify(content, null, 2);
  const loadData = async () => {
    error = false;
    try {
      content = await service.fetchContent();
    } catch (e) {
      try {
        content = JSON.parse(e.message);
      } catch (b) {
        content = {
          error: {
            message: e.message,
            params
          }
        };
      }
      error = true;
    }
  };
  loadData();
  afterUpdate(() => {
    codeBlockFormatted.innerHTML = codeBlock.innerHTML;
    hljs.highlightBlock(codeBlockFormatted);
  });
</script>

<style>
  main {
    border: 1em solid white;
  }
  .hidden {
    display: none;
  }
  .error pre {
    border: 1px solid red;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2em 1fr;
		grid-template-areas: "tools" "code";
		grid-gap: 0.5em;
  }

  .tools {
    grid-area: tools;
  }

  .code {
    grid-area: code;
  }
</style>

<div />
<main class={error ? 'grid-container error' : 'grid-container'}>
  <div class="tools">
    <APIOptions
      {format}
      {depth}
      on:change={e => {
        service.setParams(e.detail);
        loadData();
      }} />
  </div>
  <div class="code">
    <pre>
      <code class="json" bind:this={codeBlockFormatted} />
    </pre>
    <code class="hidden" bind:this={codeBlock}>{contentString}</code>
  </div>

</main>
