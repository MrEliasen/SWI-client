<script lang="ts">
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
    import GameFrame from "./GameFrame.svelte";
    import { gameInitialised } from "$lib/store/ready";
    import EventFrame from "./EventFrame.svelte";
    import { SystemType } from "$lib/proto/system";
    import type { Location } from "$lib/proto/location";
    import GameFramePlayerMove from "./GameFramePlayerMove.svelte";
    import GameFrameNpcMove from "./GameFrameNpcMove.svelte";
    import { EventWrapper } from "$lib/socket/event-wrapper";

    let frameEvents: HTMLElement;
    let autoscroll = false;
    $: lastConnectionStatus = false;
    $: currentConnectionStatus = false;
    let frames: EventWrapper[] = [];
    let frameMain: Location;
    let subscriptions: { unsubscribe: () => void }[] = [];

    beforeUpdate(() => {
        if (frameEvents) {
            const scrollableDistance = frameEvents.scrollHeight - frameEvents.offsetHeight;
            autoscroll = frameEvents.scrollTop > scrollableDistance - 20;
        }
    });

    afterUpdate(() => {
        if (frameEvents && autoscroll) {
            frameEvents.scrollTo(0, frameEvents.scrollHeight);
        }
    });

    onMount(() => {
        subscriptions.push(
            socketClient.subscribe(ClientEventType.system, (event) => {
                switch (event.type) {
                    case SystemType.GAME_READY:
                        frames = [];
                        break;
                }
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.game, (event) => {
                if (event.clear === true) {
                    frames = [];
                }

                frameMain = event;
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.generic, (event) => {
                frames[frames.length] = new EventWrapper("generic", event);

                if (frames.length > 150) {
                    frames = frames.splice(0);
                }
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.playerMove, (event) => {
                frames[frames.length] = new EventWrapper("playerMove", null, event);

                if (frames.length > 150) {
                    frames = frames.splice(0);
                }
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.npcMove, (event) => {
                frames[frames.length] = new EventWrapper("npcMove", null, null, event);

                if (frames.length > 150) {
                    frames = frames.splice(0);
                }
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.connection, (event) => {
                lastConnectionStatus = currentConnectionStatus;
                currentConnectionStatus = event;
            }),
        );
    });

    onDestroy(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
    });
</script>

{#if !currentConnectionStatus}
    <div
        class="bg-backdrop bg-cover bg-center flex-grow flex text-center flex-col border-gray-300 border border-t-transparent overflow-x-hidden overflow-y-scroll"
    >
        <p class="text-red-500 font-bold">
            {#if !lastConnectionStatus}
                Connecting..
            {:else}
                Connection lost, reconnecting..
            {/if}
        </p>
    </div>
{:else if socketClient.connected}
    {#if frameMain}
        <GameFrame frame={frameMain} />
    {/if}
    <div
        class="bg-backdrop bg-cover bg-center flex-grow flex flex-col p-2 border-gray-300 border border-t-transparent overflow-x-hidden overflow-y-scroll"
        class:justify-start={$gameInitialised}
        class:text-center={!$gameInitialised}
        bind:this={frameEvents}
    >
        {#each frames as frame}
            {#if frame.type === "playerMove"}
                <GameFramePlayerMove {frame} />
            {:else if frame.type === "npcMove"}
                <GameFrameNpcMove {frame} />
            {:else}
                <EventFrame {frame} />
            {/if}
        {/each}
    </div>
{/if}

<style>
    .bg-backdrop {
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
            url("/images/backdrop.png");
    }
</style>
