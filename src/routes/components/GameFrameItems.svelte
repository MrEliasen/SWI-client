<script lang="ts">
    import { spacer } from "$lib/helper";
    import type { Location } from "$lib/proto/location";
    import { socketClient } from "$lib/socket/client";
    export let frame: Location;

    function itemClick(itemId: string) {
        socketClient.send(`/pickup ${itemId}`);
    }
</script>

{#if frame.items.length > 0}
    <div class="text-white">
        <p>
            {frame.items.length > 1 ? "Some items have" : "An item has"} been dropped on the ground:
            {#each frame.items as itm, i}
                {spacer(i, frame.items.length)}<button
                    on:click={() => itemClick(itm.id)}
                    class="text-indigo-400">{itm.name}</button
                >
            {/each}
        </p>
    </div>
{/if}

<style>
    p {
        font-family: "Courier New", monospace;
    }
</style>
