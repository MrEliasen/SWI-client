<script lang="ts">
    import { spacer } from "$lib/helper";
    import type { Location } from "$lib/proto/location";
    import { socketClient } from "$lib/socket/client";
    export let frame: Location;

    function buildingClick(commands: string[]) {
        if (commands.length > 1) {
            socketClient.send("/here");
            return;
        }

        socketClient.send(`${commands[0]} help`);
    }
</script>

{#if frame.buildings.length > 0}
    <div class="text-white">
        <p>
            This Location gives you access to the
            {#each frame.buildings as bld, i}
                {spacer(i, frame.buildings.length)}<button
                    on:click={() => buildingClick(bld.commands)}
                    class="text-indigo-400">{bld.name}</button
                >
            {/each}
        </p>
    </div>
{/if}

<style>
    p {
        font-family: "Roboto Mono", monospace;
    }
</style>
