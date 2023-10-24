<script lang="ts">
    import { Direction, MoveEventType } from "$lib/proto/location";
    import type { EventWrapper } from "$lib/socket/event-wrapper";
    export let frame: EventWrapper;

    function getDirection(direction: Direction): string {
        switch (direction) {
            case Direction.EAST:
                return "east";
            case Direction.WEST:
                return "west";
            case Direction.NORTH:
                return "north";
            case Direction.SOUTH:
                return "south";
        }

        return "alley";
    }
</script>

{#if frame?.playerMove?.type === MoveEventType.MOVE_EVENT_ARRIVE}
    {#if frame?.playerMove?.fled}
        <p>
            You see {frame?.playerMove?.player?.name} stumble into the area avoiding the battle to the
            {frame?.playerMove?.direction}."
        </p>
    {:else if frame?.playerMove?.samecity}
        <p>
            You see {frame?.playerMove?.player?.name} the {frame?.playerMove?.player?.rank} stroll in
            from the {getDirection(frame?.playerMove?.direction)}.
        </p>
    {:else}
        <p>
            You see {frame?.playerMove?.player?.name} the {frame?.playerMove?.player?.rank} walk out
            of the airport.
        </p>
    {/if}
{/if}

{#if frame?.playerMove?.type === MoveEventType.MOVE_EVENT_LEAVE}
    {#if frame?.playerMove?.fled}
        <p>
            You see {frame?.playerMove?.player?.name} stumble into the area avoiding the battle to the
            {frame?.playerMove?.direction}."
        </p>
    {:else if frame?.playerMove?.samecity}
        <p>
            You see {frame?.playerMove?.player?.name} the {frame?.playerMove?.player?.rank} stroll off
            to the {frame?.playerMove?.direction}.
        </p>
    {:else}
        <p>
            You see {frame?.playerMove?.player?.name} the {frame?.playerMove?.player?.rank} take a plane
            to another city.
        </p>
    {/if}
{/if}

<style>
    p {
        color: white;
        font-family: "Roboto Mono", monospace;
    }
</style>
