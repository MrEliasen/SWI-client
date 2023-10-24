<script lang="ts">
    import type { Stats } from "$lib/proto/stats";

    export let stats: Stats = {} as Stats;
</script>

<div class="border-t border-gray-700 bg-gray-300 p-2 flex-shrink">
    <h4 class="text-xl font-medium text-center">{stats?.name ?? "-"}</h4>
    <p class="text-md text-center">{stats?.rank ? "The " : ""}{stats?.rank ?? "-"}</p>

    <div class="relative mt-1">
        <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-400" />
        </div>
        <div class="relative flex justify-center">
            <span class="px-2 bg-gray-300 text-sm text-gray-800">Stats</span>
        </div>
    </div>
    <div class="flex mt-1">
        <div class="flex-1">
            <h5 class="text-sm font-medium">Health</h5>
            <div>{stats?.health ?? "-"}/{stats?.maxHealth ?? "-"}</div>
        </div>
        <div class="flex-1">
            <h5 class="text-sm font-medium">Hometown</h5>
            <div>{stats.hometown ?? "-"}</div>
        </div>
    </div>

    <div class="flex mt-2">
        <div class="flex-1">
            <h5 class="text-sm">Cash</h5>
            <div>{stats?.cash?.toLocaleString() ?? "-"}</div>
        </div>
        <div class="flex-1">
            <h5 class="text-sm">Bank</h5>
            <div>{stats?.bank?.toLocaleString() ?? "-"}</div>
        </div>
    </div>

    <div class="flex mt-2">
        <div class="flex-1">
            <h5 class="text-sm font-medium">Reputation</h5>
            <div>{stats?.reputation ?? "-"}</div>
        </div>
        <div class="flex-1">
            <h5 class="text-sm font-medium">Next Rank</h5>
            <div>{stats?.nextRank ?? "-"}</div>
        </div>
    </div>

    <div class="relative my-1">
        <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-400" />
        </div>
        <div class="relative flex justify-center">
            <span class="px-2 bg-gray-300 text-sm text-gray-800">Skills</span>
        </div>
    </div>

    {#if stats?.skills}
        {#each stats.skills as skill, i}
            <div class="text-sm flex" class:mt-1={i > 0}>
                <div class="text-black flex-0 min-w-[80px]">{skill.key}</div>
                <div class="flex-1 bg-gray-600">
                    <div
                        class="bg-blue-600 text-xs h-full font-md text-blue-100 text-center p-0.5"
                        style:width={`${skill.value}%`}
                    >
                        {skill.value.toFixed(2)}%
                    </div>
                </div>
            </div>
        {/each}
    {/if}
</div>
