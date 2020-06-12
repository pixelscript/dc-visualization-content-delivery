<script>
  import { afterUpdate } from "svelte";
  import { CDService } from "./cd.service.js";
  import APIOptions from "./APIOptions.svelte";
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import "highlight.js/styles/github.css";
  import { vse, id, format, depth, locale } from "./urlparams";

  hljs.registerLanguage("json", json);
  const params = { vse, id, format, depth, locale };
  let service = new CDService(params);
  let error = false;
  let content = {};
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
            params,
          },
        };
      }
      error = true;
    }
  };
  let load = loadData();
</script>

<style>
  main {
    border: 1em solid white;
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
      on:change={(e) => {
        service.setParams(e.detail);
        loadData();
      }} />
  </div>
  {#await load then show}
    <div class="code">
      <pre>
        <code class="json">
          {@html hljs.highlight('json', JSON.stringify(content, null, 2), true).value}
        </code>
      </pre>
    </div>
  {/await}
</main>
