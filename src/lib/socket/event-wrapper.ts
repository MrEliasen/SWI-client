import type { Generic } from "$lib/proto/generic";
import type { NPCMoveEvent, PlayerMoveEvent } from "$lib/proto/location";

export class EventWrapper {
    constructor(
        public type: string,
        public generic: Generic | null = null,
        public playerMove: PlayerMoveEvent | null = null,
        public NPCMoveEvent: NPCMoveEvent | null = null,
    ) {}
}
