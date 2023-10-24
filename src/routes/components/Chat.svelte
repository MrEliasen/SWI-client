<script lang="ts">
    import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
    import ChatMessage from "./ChatMessage.svelte";
    import { ClientEventType, socketClient } from "$lib/socket/client";
    import { Chat, ChatType } from "$lib/proto/chat";

    let chat: HTMLElement;
    let autoscroll = false;
    let subscriptions: { unsubscribe: () => void }[] = [];
    let messages: Chat[] = [];

    beforeUpdate(() => {
        if (chat) {
            const scrollableDistance = chat.scrollHeight - chat.offsetHeight;
            autoscroll = chat.scrollTop > scrollableDistance - 35;
        }
    });

    afterUpdate(() => {
        if (chat && autoscroll) {
            chat.scrollTo(0, chat.scrollHeight);
        }
    });

    onMount(() => {
        subscriptions.push(
            socketClient.subscribe(ClientEventType.chat, (event) => {
                if (event.type === ChatType.GLOBAL) {
                    messages[messages.length] = event;
                }
            }),
        );
    });

    onDestroy(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
    });
</script>

<div class="p-2 border-gray-300 min-h-[160px] border border-t-transparent">
    <div bind:this={chat} class="flex-grow flex flex-col text-white max-h-[150px] overflow-y-auto">
        {#each messages as msg (msg)}
            <ChatMessage message={msg} />
        {/each}
    </div>
</div>
