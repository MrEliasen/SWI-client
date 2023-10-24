<script lang="ts">
    import SideMenuInventory from "./SideMenuInventory.svelte";
    import SideMenuPlayers from "./SideMenuPlayers.svelte";
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import { onDestroy, onMount } from "svelte";
    import PlayerStats from "./PlayerStats.svelte";
    import MapSideMenu from "./MapSideMenu.svelte";
    import { PlayerEvent, type PlayerList } from "$lib/proto/playerlist";
    import type { Stats } from "$lib/proto/stats";
    import type { GPS } from "$lib/proto/gps";
    import type { Coordinate, Item } from "$lib/proto/common";

    let subscriptions: { unsubscribe: () => void }[] = [];
    $: activeTab = "players";
    $: stats = {} as Stats;
    $: items = [] as Item[];
    $: currentLocation = null as Coordinate | null;
    $: grid = [] as { poi: string }[][];
    $: players = {} as { [key: string]: PlayerList };

    function hasPOI(
        n: number,
        e: number,
        pois: { east: number; north: number; poi: string }[],
    ): string {
        for (let i = 0; i < pois.length; i++) {
            if (pois[i].north === n && pois[i].east === e) {
                return pois[i].poi;
            }
        }

        return "";
    }

    function generateGrid(data: GPS) {
        const newGrid: { poi: string }[][] = [];

        if (data.enabled) {
            for (let n = 0; n <= data.height; n++) {
                newGrid[n] = [];

                for (let e = 0; e <= data.width; e++) {
                    newGrid[n][e] = {
                        poi: hasPOI(data.height - n, e, data.pois),
                    };
                }
            }
        }

        grid = newGrid;
    }

    onMount(() => {
        subscriptions.push(
            socketClient.subscribe(ClientEventType.players, (event) => {
                if (event.type === PlayerEvent.EVENT_TYPE_PLAYER_LEAVE) {
                    delete players[event.id];
                    return;
                }

                players[event.id] = event;
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.inventory, (event) => {
                items = event.items;
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.stats, (event) => {
                stats = event;
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.gps, (event) => {
                generateGrid(event);
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.game, (event) => {
                if (!event.coordinates) {
                    return;
                }

                currentLocation = event.coordinates;
            }),
        );
    });

    onDestroy(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
    });
</script>

<div class="w-[270px] h-full flex flex-col">
    <div class="border-b border-gray-700">
        <nav class="flex">
            <button
                aria-current={activeTab === "players" ? "page" : undefined}
                class="flex-1 rounded-md rounded-tl-none rounded-bl-none px-3 py-2 text-xs font-medium"
                class:bg-white={activeTab === "players"}
                class:text-black={activeTab === "players"}
                class:text-white={activeTab === "inventory"}
                on:click={() => (activeTab = "players")}
            >
                Players & Stats
            </button>

            <button
                aria-current={activeTab === "inventory" ? "page" : undefined}
                class="flex-1 rounded-md rounded-tr-none rounded-br-none px-3 py-2 text-xs font-medium"
                class:bg-white={activeTab === "inventory"}
                class:text-black={activeTab === "inventory"}
                class:text-white={activeTab === "players"}
                on:click={() => (activeTab = "inventory")}
            >
                Inventory & GPS
            </button>
        </nav>
    </div>

    {#if activeTab === "inventory"}
        <SideMenuInventory {items} />
        <MapSideMenu {currentLocation} gpsData={grid} />
    {:else}
        <SideMenuPlayers players={Object.values(players)} />
        <PlayerStats {stats} />
    {/if}
</div>
