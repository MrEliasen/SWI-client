<script lang="ts">
    import type { Coordinate } from "$lib/proto/common";
    import { Popover } from "flowbite-svelte";
    export let gpsData: { poi: string }[][];
    export let currentLocation: Coordinate | null = null;
</script>

<div class="h-[279px] gps relative overflow-hidden flex flex-col items-center justify-center">
    <div class="cover bg-neutral-600 flex flex-col" class:offline={!gpsData?.length}>
        {#if gpsData?.length}
            {#each gpsData as row, n}
                <div class="flex">
                    {#each row as cell, e}
                        <div
                            id={`n${n}-e${e}`}
                            class="w-[9px] h-[9px] bg-black border border-gray-800"
                            class:bg-blue-500={!cell.poi &&
                                currentLocation?.north === gpsData.length - 1 - n &&
                                currentLocation?.east === e}
                            class:bg-red-500={cell.poi &&
                                !(
                                    currentLocation?.north === gpsData.length - 1 - n &&
                                    currentLocation?.east === e
                                )}
                            class:bg-purple-500={cell.poi &&
                                currentLocation?.north === gpsData.length - 1 - n &&
                                currentLocation?.east === e}
                        />
                        {#if cell.poi !== ""}
                            <Popover
                                class="text-sm font-light"
                                triggeredBy={`#n${n}-e${e}`}
                                trigger="hover">{cell.poi}</Popover
                            >
                        {/if}
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
    <p class="text-2xl text-red-700" class:hidden={gpsData?.length}>No GPS</p>
    <p class="text-sm text-gray-500" class:hidden={gpsData?.length}>Missing smart phone</p>
</div>

<style lang="scss">
    $ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
    $ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);

    .cover {
        position: absolute;
        height: 100%;
        width: 100%;
        animation: turn-on 0.55s linear;
        animation-fill-mode: forwards;
    }
    .cover.offline {
        animation: turn-off 0.55s $ease-out-quint;
        animation-fill-mode: forwards;
    }

    @keyframes turn-on {
        0% {
            -webkit-filter: contrast(0) brightness(0);
            filter: contrast(0) brightness(0);
            opacity: 0;
        }

        100% {
            -webkit-filter: contrast(1) brightness(1.2) saturate(1.3);
            filter: contrast(1) brightness(1.2) saturate(1.3);
            opacity: 1;
        }
    }
    @keyframes turn-off {
        0% {
            transform: scale(1, 1.3) translate3d(0, 0, 0);
            -webkit-filter: brightness(1);
            filter: brightness(1);
            opacity: 1;
        }
        60% {
            transform: scale(1.3, 0.001) translate3d(0, 0, 0);
            -webkit-filter: brightness(10);
            filter: brightness(10);
        }
        100% {
            animation-timing-function: $ease-in-quint;
            transform: scale(0, 0.0001) translate3d(0, 0, 0);
            -webkit-filter: brightness(50);
            filter: brightness(50);
        }
    }
</style>
