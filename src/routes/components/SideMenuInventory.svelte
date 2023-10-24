<script lang="ts">
    import type { Item } from "$lib/proto/common";
    import InventoryItem from "./InventoryItem.svelte";

    export let items: Item[] = [];
    $: isSelected = null as number | null;

    function handleSelection(res: CustomEvent<number | null>) {
        isSelected = res.detail === null ? null : res.detail;
    }
</script>

<div class="flex-1 flex flex-col overflow-y-auto">
    {#each items as item, slotIndex}
        <InventoryItem
            on:selected={handleSelection}
            {item}
            {slotIndex}
            isSelected={isSelected === slotIndex}
        />
    {/each}
</div>
