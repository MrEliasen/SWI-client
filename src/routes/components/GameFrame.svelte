<script lang="ts">
    import type { Location } from "$lib/proto/location";
    import GameFrameBuilding from "./GameFrameBuilding.svelte";
    import GameFrameItems from "./GameFrameItems.svelte";
    export let frame: Location;
</script>

<div
    class="flex-shrink text-white border-gray-300 border border-t-transparent border-b-transparent p-2"
>
    <p>[{frame.cityName}]</p>
    <p>Compass: N{frame?.coordinates?.north}-E{frame?.coordinates?.east}</p>
    <p>{frame.description}</p>
    <GameFrameBuilding {frame} />
    <p class="text-xs text-gray-400">Legend: <span class="text-purple-400">NPCS</span>, <span class="text-orange-400">Players</span></p>
    <p>*********************</p>
    {#if frame.npcs.length > 0}
        {#each frame.npcs as npc}
            <p>You see <span class="text-purple-400">{npc.name}</span> the {npc.rank} (HP: {npc.health}) standing here with you.</p>
        {/each}
    {/if}
    {#if frame.players.length > 0}
        {#each frame.players as player}
            <p>{player.name} the {player.rank} is here with you.</p>
        {/each}
    {/if}
    <GameFrameItems {frame} />
    <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-start">
            <span class="bg-black ml-2 pl-2 pr-2 text-sm text-gray-500"
                >Events History ("r" to clear/refresh):</span
            >
        </div>
    </div>
</div>

<style>
    p {
        font-family: "Roboto Mono", monospace;
    }
</style>
