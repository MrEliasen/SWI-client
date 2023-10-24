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

{#if frame?.NPCMoveEvent?.type === MoveEventType.MOVE_EVENT_ARRIVE}
    <p>
        You see {frame?.NPCMoveEvent?.npc?.name} the {frame?.NPCMoveEvent?.npc?.rank} stroll in from
        the {getDirection(frame?.NPCMoveEvent?.direction)}.
    </p>
{/if}

{#if frame?.NPCMoveEvent?.type === MoveEventType.MOVE_EVENT_LEAVE}
    <p>
        You see {frame?.NPCMoveEvent?.npc?.name} the {frame?.NPCMoveEvent?.npc?.rank} stroll off the
        {getDirection(frame?.NPCMoveEvent?.direction)}.
    </p>
{/if}

<style>
    p {
        color: white;
        font-family: "Roboto Mono", monospace;
    }
</style>
