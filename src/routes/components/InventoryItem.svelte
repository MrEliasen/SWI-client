<script lang="ts">
    import type { Item } from "$lib/proto/common";
    import { socketClient } from "$lib/socket/client";
    import { createEventDispatcher } from "svelte";
    export let item: Item;
    export let slotIndex: number;
    export let isSelected: boolean;

    const dispatch = createEventDispatcher();

    function selected(isOpen: boolean) {
        dispatch("selected", isOpen ? slotIndex : null);
    }
</script>

{#if !item.id}
    <div class="inline-flex relative border-b border-slate-700 bg-slate-800">
        <button class="text-gray-600 py-2 px-4 text-sm" on:click={() => dispatch("selected", null)}>
            - Empty -
        </button>
    </div>
{:else}
    <div class="inline-flex relative border-b border-slate-700 bg-slate-800">
        <button
            type="button"
            class="flex-grow justify-between relative px-4 inline-flex items-center rounded-l-md py-2 text-sm focus:z-10"
            class:text-yellow-500={isSelected}
            class:text-blue-500={item.equipped}
            class:text-white={!item.equipped && !isSelected}
            on:click={() => selected(!isSelected)}
        >
            <span>
                {item.equipped ? "[" : ""}
                {item.name}
                {item.equipped ? "]" : ""}
                {#if item.amount > 1}
                    ({item.amount})
                {/if}
            </span>
            <svg
                class="h-5 w-5 text-gray-400"
                class:text-yellow-500={isSelected}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
        <div
            class="absolute left-0 right-0 rounded-md rounded-tl-none rounded-tr-none shadow-lg top-9 z-10 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            class:hidden={!isSelected}
        >
            <button
                on:click={() => {
                    socketClient.send(`/use ${item.id}`);
                    selected(false);
                }}
                class="text-gray-700 block px-4 py-2 text-sm h-full w-full text-left hover:bg-gray-200"
                class:hidden={!item.hasUseEffect}
                tabindex="-1"
            >
                Use
            </button>
            <button
                on:click={() => {
                    socketClient.send(`/equip ${item.id}`);
                    selected(false);
                }}
                class="text-gray-700 block px-4 py-2 text-sm h-full w-full text-left hover:bg-gray-200"
                class:hidden={!item.isGear || item.equipped}
                tabindex="-1"
            >
                Equip
            </button>
            <button
                on:click={() => {
                    socketClient.send(`/unequip ${slotIndex}`);
                    selected(false);
                }}
                class="text-gray-700 rounded-md rounded-tl-none rounded-tr-none block px-4 py-2 text-sm h-full w-full text-left hover:bg-gray-200"
                class:hidden={!item.equipped}
                tabindex="-1"
            >
                Unequip
            </button>
            <button
                on:click={() => {
                    socketClient.send(`/drop ${slotIndex}`);
                    selected(false);
                }}
                class="text-gray-700 block px-4 py-2 text-sm h-full w-full text-left hover:bg-gray-200"
                tabindex="-1"
            >
                Drop
            </button>
            <button
                on:click={() => {
                    socketClient.send(`/info ${item.id}`);
                    selected(false);
                }}
                class="text-gray-700 block px-4 py-2 text-sm h-full w-full text-left hover:bg-gray-200"
                tabindex="-1"
            >
                Info
            </button>
        </div>
    </div>
{/if}
