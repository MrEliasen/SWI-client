<script lang="ts">
    import { ItemType } from "$lib/proto/common";
    import { MerchantType, type MerchantItem, type MerchantItemGroup } from "$lib/proto/merchant";
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import { showShop } from "$lib/store/ready";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";

    let shopType: number = 0;
    let merchantId: string;
    let merchantItems: MerchantItemGroup[] = [];
    let playerItems: MerchantItem[] = [];
    let subscriptions: { unsubscribe: () => void }[] = [];
    $: message = null as { status: number; message: string } | null;
    $: selectedItem = null as MerchantItem | null;
    let selectedIndex: number | null = null;
    let selectedType: string | null = null;
    let bgImage: { [key: string]: number } = {};
    let bgversion: number;

    function buySellSelected() {
        if (!selectedType) {
            return;
        }

        socketClient.send(`/shop${selectedType} ${merchantId} ${selectedIndex}`);
    }

    function closeMenu() {
        showShop.set(false);
    }

    function getLabelText(itemType: ItemType): string {
        switch (itemType) {
            case ItemType.GUN:
                return "- Firearms -";
            case ItemType.MELEE:
                return "- Melee -";
            case ItemType.ARMOR:
                return "- Armor -";
            case ItemType.AMMO:
                return "- Ammo -";
            default:
                return "- Misc -";
        }
    }

    function randImage(id: string) {
        if (bgImage[id]) {
            bgversion = bgImage[id];
        }

        const min = 1;
        const max = 3;
        bgImage[id] = Math.floor(Math.random() * max) + min;
        bgversion = bgImage[id];
    }

    onMount(() => {
        subscriptions.push(
            socketClient.subscribe(ClientEventType.merchantMessage, (event) => {
                message = {
                    message: event.message,
                    status: event.status,
                };
            }),
        );
        subscriptions.push(
            socketClient.subscribe(ClientEventType.merchant, (event) => {
                if (event.merchantType ==  MerchantType.MERCHANT_DRUGGIE || event.merchantType == MerchantType.MERCHANT_DRUG_DEALER) {
                    return;
                }

                if (event.open && get(showShop) === false) {
                    selectedItem = null;
                    selectedIndex = null;
                    selectedType = null;
                    randImage(event.merchantId);
                    message = null;
                }

                for (let i = 0; i < event.items.length; i++) {
                    event.items[i].items.sort((a, b) => parseInt(a.rep, 10) - parseInt(b.rep, 10));
                }

                shopType = event.merchantType;
                playerItems = event.playerItems;
                merchantItems = event.items;
                merchantId = event.merchantId;
                showShop.set(event.open);
            }),
        );
    });

    onDestroy(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
    });
</script>

<div class="absolute w-full h-full z-10 flex justify-center items-center" class:hidden={!$showShop}>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div
        class="relative transform overflow-hidden rounded-lg bg-black shadow-xl transition-all sm:my-8 sm-mx-8 sm:w-full sm:max-w-4xl"
    >
        <button
            type="button"
            on:click={() => {
                closeMenu();
            }}
            class="absolute top-0 right-0 inline-flex rounded-md p-1.5 text-gray-500"
        >
            <span class="sr-only">Dismiss</span>
            <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
            </svg>
        </button>
        <div class="w-full flex flex-row">
            <div class="border-black border bg-slate-900 overflow-y-auto max-h-[500px] w-[200px]">
                {#each merchantItems as group}
                    {#if group.items.length > 0}
                        <div class="w-full text-left border-b border-slate-700">
                            <p class="text-gray-500 py-2 px-4 text-sm">
                                {getLabelText(group.type)}
                            </p>
                        </div>
                    {/if}

                    {#each group.items as item}
                        <button
                            class="w-full text-left border-b border-slate-700"
                            class:bg-slate-500={item?.name != ""&&
                                item.canbuy &&
                                item.index === selectedIndex &&
                                selectedType === "buy"}
                            class:bg-slate-700={item?.name != "" &&
                                item.canbuy &&
                                (item.index !== selectedIndex || selectedType === "sell")}
                            class:bg-slate-900={item?.name == ""|| item.canbuy === false}
                            on:click={() => {
                                if (item?.name == "") {
                                    selectedItem = null;
                                    selectedIndex = null;
                                    selectedType = null;
                                    return;
                                }

                                selectedItem = item;
                                selectedIndex = item.index;
                                selectedType = "buy";
                            }}
                        >
                            <p
                                class="text-gray-300 py-2 px-4 text-sm"
                                class:text-gray-300={item.name != ""}
                                class:text-gray-500={item.name == ""}
                            >
                                {item.name != "" ? item.name : "- Empty -"}
                            </p>
                        </button>
                    {/each}
                {/each}
            </div>
            <div
                class="flex-1 flex flex-col pl-6 pr-6 justify-center font-mono bg-cover bg-center"
                class:bg-img-arms1={shopType === MerchantType.MERCHANT_ARMS_DEALER &&
                    bgversion === 1}
                class:bg-img-arms2={shopType === MerchantType.MERCHANT_ARMS_DEALER &&
                    bgversion === 2}
                class:bg-img-arms3={shopType === MerchantType.MERCHANT_ARMS_DEALER &&
                    bgversion === 3}
                class:bg-img-pawn1={shopType === MerchantType.MERCHANT_PAWN_SHOP && bgversion === 1}
                class:bg-img-pawn2={shopType === MerchantType.MERCHANT_PAWN_SHOP && bgversion === 2}
                class:bg-img-pawn3={shopType === MerchantType.MERCHANT_PAWN_SHOP && bgversion === 3}
            >
                <div class="w-2/3">
                    <div class="w-1/2">
                        <div
                            class="w-full text-center inline-block px-2 py-1 text-white text-md bg-black/60"
                        >
                            Item
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div
                            class="w-full text-center inline-block bg-slate-300 px-2 py-1 text-black text-md"
                        >
                            {selectedItem?.name ?? "-"}
                        </div>
                    </div>
                    <div class="w-1/2 mt-3">
                        <div
                            class="w-full text-center inline-block px-2 py-1 text-white text-md bg-black/60"
                        >
                            Sell Price
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div
                            class="w-full text-center inline-block bg-slate-300 px-2 py-1 text-black text-md"
                        >
                            {selectedItem?.price ? `$${selectedItem.price}` : "-"}
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <div class="mt-3 flex flex-col w-full">
                        <div class="w-1/2 pr-3">
                            <div
                                class="w-full pl-6 text-left inline-block px-2 py-1 text-white text-md bg-black/60"
                            >
                                Description
                            </div>
                        </div>
                        <div class="w-full">
                            <div
                                class="w-full h-[80px] inline-block bg-slate-300 px-2 py-1 text-black text-sm overflow-y-auto whitespace-break-spaces"
                            >
                                {selectedItem?.description}<br />
                                {selectedType === "buy" &&
                                selectedItem &&
                                selectedItem?.quantity > 0
                                    ? ` This item is limited supply (${selectedItem?.quantity} left)`
                                    : ""}
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 w-full">
                        <div class="flex justify-between">
                            <span class="text-base font-medium text-white">Condition</span>
                            <span class="text-sm font-medium text-white"
                                >{selectedItem?.condition
                                    ? `${(selectedItem.condition * 100).toFixed(2)}%`
                                    : "-"}</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                class="bg-yellow-600 transition-all ease-in duration-75 h-2.5 rounded-full"
                                style="width: {selectedItem?.condition
                                    ? `${selectedItem.condition * 100}`
                                    : '0'}%"
                            />
                        </div>
                    </div>
                    <div class="mt-6 w-full flex justify-between">
                        <button
                            type="button"
                            on:click={() => closeMenu()}
                            class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-slate-400 to-slate-700 hover:text-white text-white focus:outline-none"
                        >
                            <span
                                class="min-w-[90px] relative px-5 py-2.5 bg-gray-900 rounded-md active:bg-gray-700"
                            >
                                Leave
                            </span>
                        </button>
                        {#if selectedItem === null || selectedType === "sell" || selectedItem?.canbuy}
                            <button
                                type="button"
                                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-slate-400 to-slate-700 hover:text-white text-white focus:outline-none"
                                on:click={() => buySellSelected()}
                                disabled={selectedType === "buy" && !selectedItem?.canbuy}
                            >
                                <span
                                    class="min-w-[90px] relative px-5 py-2.5 bg-gray-900 rounded-md active:bg-gray-700"
                                >
                                    {#if selectedType === "buy" && !selectedItem?.canbuy}
                                        Too Low Rep
                                    {:else}
                                        {selectedType !== null
                                            ? selectedType.toUpperCase()
                                            : "No Selection"}
                                    {/if}
                                </span>
                            </button>
                        {:else}
                            <div class="text-white bg-black/60 font-medium">
                                <div class="min-w-[90px] relative px-5 py-2.5 text-sm">
                                    Too low rep
                                </div>
                            </div>
                        {/if}
                    </div>
                    {#if message != null}
                        <div
                            class="my-4 w-full text-center bg-black/60 py-1 rounded-md text-sm"
                            class:text-red-600={message.status === 1}
                            class:text-green-600={message.status === 2}
                        >
                            "{message.message}"
                        </div>
                    {:else}
                        <div
                            class="my-4 w-full text-center text-white bg-black/60 py-1 rounded-md text-sm"
                        >
                            {shopType == MerchantType.MERCHANT_ARMS_DEALER
                                ? '"I need to move a lot of merchandise, so don\'t waste my time."'
                                : ""}
                            {shopType == MerchantType.MERCHANT_PAWN_SHOP
                                ? '"My stock varies, but maybe you can find something you want, hmm?"'
                                : ""}
                        </div>
                    {/if}
                </div>
            </div>
            <div class="border-black border bg-slate-900 overflow-y-auto max-h-[500px] w-[200px]">
                {#each playerItems as item, index}
                    <button
                        class="w-full text-left border-b border-slate-700"
                        class:bg-slate-500={item?.name != "" &&
                            index === selectedIndex &&
                            selectedType === "sell"}
                        class:bg-slate-700={item?.name != "" &&
                            (index !== selectedIndex || selectedType === "buy")}
                        class:bg-slate-900={item?.name == ""}
                        on:click={() => {
                            if (item?.name == "") {
                                selectedItem = null;
                                selectedIndex = null;
                                selectedType = null;
                                return;
                            }

                            selectedItem = item;
                            selectedIndex = index;
                            selectedType = "sell";
                        }}
                    >
                        <p
                            class="text-gray-300 py-2 px-4 text-sm"
                            class:text-gray-300={item.name != ""}
                            class:text-gray-500={item.name == ""}
                        >
                            {item.name != "" ? item.name : "- Empty -"}
                        </p>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .bg-img-arms1 {
        background-image: url("/images/arms_1.png");
    }
    .bg-img-arms2 {
        background-image: url("/images/arms_2.png");
    }
    .bg-img-arms3 {
        background-image: url("/images/arms_3.png");
    }
    .bg-img-pawn1 {
        background-image: url("/images/pawn_1.png");
    }
    .bg-img-pawn2 {
        background-image: url("/images/pawn_2.png");
    }
    .bg-img-pawn3 {
        background-image: url("/images/pawn_3.png");
    }
</style>
