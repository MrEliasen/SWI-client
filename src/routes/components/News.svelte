<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import type { NewsFlash } from "$lib/proto/news";

    let subscriptions: { unsubscribe: () => void }[] = [];
    let newsFlash: NewsFlash;
    let timestamp = new Date();
    let bgcolor = 0;

    onMount(() => {
        subscriptions.push(
            socketClient.subscribe(ClientEventType.news, (event) => {
                const min = 1;
                const max = 3;
                bgcolor = Math.floor(Math.random() * max) + min;

                timestamp = new Date();
                newsFlash = event;
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
    class="min-h-[50px] max-h-[50px] overflow-y-auto border-gray-300 border flex justify-center items-center"
>
    {#if newsFlash}
        <p
            class="text-md"
            class:text-red-400={bgcolor === 0}
            class:text-green-400={bgcolor === 1}
            class:text-indigo-400={bgcolor === 2}
            class:text-yellow-400={bgcolor === 3}
        >
            ({timestamp.getHours()}:{timestamp.getMinutes()}): {newsFlash.msg}
        </p>
    {/if}
</div>
