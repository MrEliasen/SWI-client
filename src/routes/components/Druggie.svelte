<script lang="ts">
    import { MerchantItem, MerchantMessage, MerchantType } from "$lib/proto/merchant";
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import { showDruggie } from "$lib/store/ready";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";

    let subscriptions: { unsubscribe: () => void }[] = [];
    let bgImage: { [key: string]: number } = {};
    let bgversion: number;
    let druggie = {
        id: "",
        name: "",
        gender: 0,
    };
    $: message = null as MerchantMessage | null;
    $: selectedItem = null as MerchantItem| null;
    let selectedIndex: number | null = null;

    let items: MerchantItem[] = [];

    function sellSelectedItem() {
        socketClient.send(`/selldrug ${druggie.id} ${selectedIndex}`);
    }

    function closeMenu() {
        socketClient.send("/closetrade");
        showDruggie.set(false);
    }

    function demandLabel(demand: number) {
        if (demand >= 1) {
            return ((demand - 1) * 100).toFixed(2);
        }

        return ((1 - demand) * 100).toFixed(2);
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
                if (event.merchantType !== MerchantType.MERCHANT_DRUGGIE) {
                    return;
                }

                if (event.open && get(showDruggie) === false) {
                    randImage(event.merchantId);
                    message = null;
                }

                items = event.playerItems;
                druggie.name = event.merchantName;
                druggie.gender = event.merchantGender;
                druggie.id = event.merchantId;
                showDruggie.set(event.open);
            }),
        );
    });

    onDestroy(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
    });
</script>

<div
    class="absolute w-full h-full z-10 flex justify-center items-center"
    class:hidden={!$showDruggie}
>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div
        class="relative transform overflow-hidden rounded-lg bg-black shadow-xl transition-all sm:my-8 sm-mx-8 sm:w-full sm:max-w-2xl"
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
            <div
                class="flex-1 flex flex-col pl-6 justify-center font-mono bg-cover bg-center"
                class:bg-img-21={druggie.gender == 2 && bgversion === 1}
                class:bg-img-22={druggie.gender == 2 && bgversion === 2}
                class:bg-img-23={druggie.gender == 2 && bgversion === 3}
                class:bg-img-11={druggie.gender == 1 && bgversion === 1}
                class:bg-img-12={druggie.gender == 1 && bgversion === 2}
                class:bg-img-13={druggie.gender == 1 && bgversion === 3}
            >
                <div class="w-2/3 my-4">
                    <div class="w-1/2">
                        <div class="w-full text-center inline-block px-2 py-1 text-white text-lg">
                            Drug
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
                        <div class="w-full text-center inline-block px-2 py-1 text-white text-lg">
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
                    <div class="mt-3 flex flex-col w-full">
                        <div class="w-1/2 pr-3">
                            <div
                                class="w-full text-center inline-block px-2 py-1 text-white text-lg"
                            >
                                Description
                            </div>
                        </div>
                        <div class="w-full">
                            <div
                                class="w-full h-[60px] inline-block bg-slate-300 px-2 py-1 text-black text-md"
                            >
                                {selectedItem?.description ?? "-"}
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 w-full">
                        <div class="flex justify-between">
                            <span class="text-base font-medium text-white">Quality</span>
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
                    <div class="mt-5 w-full">
                        <div class="flex justify-between">
                            <span class="text-base font-medium text-white">Demand</span>
                            <span class="text-sm font-medium text-white"
                                >{selectedItem?.demand
                                    ? `${selectedItem.demand < 1 ? "-" : "+"}${demandLabel(
                                          selectedItem.demand,
                                      )}% Sell Price`
                                    : "-"}</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                class="bg-yellow-600 transition-all ease-in duration-75 h-2.5 rounded-full"
                                class:bg-red-600={selectedItem && selectedItem?.demand <= 0.35}
                                class:bg-orange-600={selectedItem &&
                                    selectedItem?.demand > 0.35 &&
                                    selectedItem?.demand <= 0.65}
                                class:bg-yellow-600={selectedItem &&
                                    selectedItem?.demand > 0.65 &&
                                    selectedItem?.demand <= 0.9}
                                class:bg-blue-600={selectedItem &&
                                    selectedItem?.demand > 0.9 &&
                                    selectedItem?.demand <= 1.1}
                                class:bg-green-600={selectedItem && selectedItem?.demand > 1.1}
                                style="width: {selectedItem?.demand
                                    ? `${(selectedItem.demand / 2) * 100}`
                                    : '0'}%"
                            />
                        </div>
                    </div>
                    <div class="mt-6 w-full flex justify-between">
                        <button
                            type="button"
                            on:click={() => closeMenu()}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-slate-400 to-slate-700 hover:text-white text-white focus:outline-none"
                        >
                            <span
                                class="min-w-[90px] relative px-5 py-2.5 bg-gray-900 rounded-md active:bg-gray-700"
                            >
                                Leave
                            </span>
                        </button>
                        <button
                            type="button"
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-slate-400 to-slate-700 hover:text-white text-white focus:outline-none"
                            on:click={() => sellSelectedItem()}
                        >
                            <span
                                class="min-w-[90px] relative px-5 py-2.5 bg-gray-900 rounded-md active:bg-gray-700"
                            >
                                Sell
                            </span>
                        </button>
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
                            "What you got? Hurry up now will you.."
                        </div>
                    {/if}
                </div>
            </div>
            <div class="border-black border overflow-y-auto max-h-[500px] w-[200px]">
                {#if !items.length}
                    <div class="flex justify-center items-center h-full">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    </div>
                {/if}
                {#each items as item, index}
                    <button
                        class="w-full text-left border-b border-slate-700"
                        class:bg-slate-500={item?.name != "" && index === selectedIndex && item?.cansell}
                        class:bg-slate-700={item?.name != "" && index !== selectedIndex && item?.cansell}
                        class:bg-slate-900={item?.name == "" || !item?.cansell}
                        on:click={() => {
                            if (item?.name == "" || !item?.cansell) {
                                selectedItem = null;
                                selectedIndex = null;
                                return;
                            }

                            selectedItem = item;
                            selectedIndex = index;
                        }}
                    >
                        <p
                            class="text-gray-300 py-2 px-4 text-sm"
                            class:text-gray-300={item.name != ""}
                            class:text-gray-500={item.name == ""}
                        >
                            {item.name !== "" ? item.name :"- Empty -"}
                        </p>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .bg-img-21 {
        background-image: url("/images/druggie_f_1.png");
    }
    .bg-img-22 {
        background-image: url("/images/druggie_f_2.png");
    }
    .bg-img-23 {
        background-image: url("/images/druggie_f_3.png");
    }
    .bg-img-11 {
        background-image: url("/images/druggie_m_1.png");
    }
    .bg-img-12 {
        background-image: url("/images/druggie_m_2.png");
    }
    .bg-img-13 {
        background-image: url("/images/druggie_m_3.png");
    }
</style>
