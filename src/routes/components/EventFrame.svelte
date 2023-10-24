<script lang="ts">
    import { ResponseStatus } from "$lib/proto/common";
    import type { EventWrapper } from "$lib/socket/event-wrapper";
    export let frame: EventWrapper;
</script>

{#each (frame?.generic?.messages ?? []) as message}
    <p
        class="data"
        class:text-white={frame?.generic?.status == ResponseStatus.NORMAL}
        class:text-red-500={frame?.generic?.status == ResponseStatus.ERROR}
        class:text-green-500={frame?.generic?.status == ResponseStatus.SUCCESS}
        class:text-indigo-500={frame?.generic?.status == ResponseStatus.INFO}
        class:text-orange-500={frame?.generic?.status == ResponseStatus.WARN}
        class:ascii={frame?.generic?.ascii}
    >
        {message}
    </p>
{/each}

<style>
    p {
        font-family: "Roboto Mono", monospace;
    }
    .ascii {
        white-space: pre;
    }
</style>
