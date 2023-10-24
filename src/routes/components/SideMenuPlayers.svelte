<script lang="ts">
    import type { PlayerList } from "$lib/proto/playerlist";

    export let players: PlayerList[] = [];
</script>

<ul class="flex-1 text-white overflow-y-auto">
    {#each players as player}
        <li class="px-4">
            {player.gangTag !== "" ? player.gangTag : player.hometown} - {player.name}
        </li>
    {/each}
</ul>
