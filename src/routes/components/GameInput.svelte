<script lang="ts">
    import { socketClient } from "$lib/socket/client";

    let input: HTMLInputElement;

    function handleInput(e: KeyboardEvent) {
        if (!socketClient || !socketClient.connected) {
            return;
        }

        if (e.key === "Escape") {
            input.blur();
            return;
        }

        if (e.key !== "Enter") {
            return;
        }

        socketClient.send(input.value);
        input.value = "";
    }
</script>

<input
    id="commandline"
    bind:this={input}
    type="text"
    class="w-full bg-black text-white"
    placeholder="Type here and hit Enter"
    on:keydown={handleInput}
/>
