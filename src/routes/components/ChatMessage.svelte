<script lang="ts">
    import type { Chat } from "$lib/proto/chat";

    export let latest = false;
    export let message: Chat;
</script>

<div class:text-white={!latest} class:text-blue-400={latest}>
    <div class="inline-block">(Global)</div>
    <div class="inline-block">{message?.player?.name ?? ""}:</div>
    <div class="inline-block">{message?.msg ?? ""}</div>
</div>
