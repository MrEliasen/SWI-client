// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "location.proto" (package "responses", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Item } from "./common";
import { NPC } from "./common";
import { Player } from "./common";
import { Building } from "./common";
import { Coordinate } from "./common";
import { Any } from "./google/protobuf/any";
/**
 * @generated from protobuf message responses.Location
 */
export interface Location {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: string city_name = 2;
     */
    cityName: string;
    /**
     * @generated from protobuf field: bool clear = 3;
     */
    clear: boolean;
    /**
     * @generated from protobuf field: string description = 4;
     */
    description: string;
    /**
     * @generated from protobuf field: responses.Coordinate coordinates = 5;
     */
    coordinates?: Coordinate;
    /**
     * @generated from protobuf field: repeated responses.Building buildings = 6;
     */
    buildings: Building[];
    /**
     * @generated from protobuf field: repeated responses.Player players = 7;
     */
    players: Player[];
    /**
     * @generated from protobuf field: repeated responses.NPC npcs = 8;
     */
    npcs: NPC[];
    /**
     * @generated from protobuf field: repeated responses.Item items = 9;
     */
    items: Item[];
}
/**
 * @generated from protobuf message responses.PlayerMoveEvent
 */
export interface PlayerMoveEvent {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: responses.MoveEventType type = 2;
     */
    type: MoveEventType;
    /**
     * @generated from protobuf field: responses.Player player = 3;
     */
    player?: Player;
    /**
     * @generated from protobuf field: responses.Direction direction = 4;
     */
    direction: Direction;
    /**
     * @generated from protobuf field: bool samecity = 5;
     */
    samecity: boolean;
    /**
     * @generated from protobuf field: bool fled = 6;
     */
    fled: boolean;
}
/**
 * @generated from protobuf message responses.NPCMoveEvent
 */
export interface NPCMoveEvent {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: responses.MoveEventType type = 2;
     */
    type: MoveEventType;
    /**
     * @generated from protobuf field: responses.NPC npc = 3;
     */
    npc?: NPC;
    /**
     * @generated from protobuf field: responses.Direction direction = 4;
     */
    direction: Direction;
}
/**
 * @generated from protobuf enum responses.Direction
 */
export enum Direction {
    /**
     * @generated from protobuf enum value: DIRECTION_NORTH = 0;
     */
    NORTH = 0,
    /**
     * @generated from protobuf enum value: DIRECTION_SOUTH = 1;
     */
    SOUTH = 1,
    /**
     * @generated from protobuf enum value: DIRECTION_EAST = 2;
     */
    EAST = 2,
    /**
     * @generated from protobuf enum value: DIRECTION_WEST = 3;
     */
    WEST = 3,
    /**
     * @generated from protobuf enum value: DIRECTION_UNKNOWN = 4;
     */
    UNKNOWN = 4
}
/**
 * @generated from protobuf enum responses.MoveEventType
 */
export enum MoveEventType {
    /**
     * @generated from protobuf enum value: MOVE_EVENT_ARRIVE = 0;
     */
    MOVE_EVENT_ARRIVE = 0,
    /**
     * @generated from protobuf enum value: MOVE_EVENT_LEAVE = 1;
     */
    MOVE_EVENT_LEAVE = 1
}
// @generated message type with reflection information, may provide speed optimized methods
class Location$Type extends MessageType<Location> {
    constructor() {
        super("responses.Location", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "city_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "clear", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "coordinates", kind: "message", T: () => Coordinate },
            { no: 6, name: "buildings", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Building },
            { no: 7, name: "players", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Player },
            { no: 8, name: "npcs", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => NPC },
            { no: 9, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Item }
        ]);
    }
    create(value?: PartialMessage<Location>): Location {
        const message = { cityName: "", clear: false, description: "", buildings: [], players: [], npcs: [], items: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Location>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Location): Location {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* string city_name */ 2:
                    message.cityName = reader.string();
                    break;
                case /* bool clear */ 3:
                    message.clear = reader.bool();
                    break;
                case /* string description */ 4:
                    message.description = reader.string();
                    break;
                case /* responses.Coordinate coordinates */ 5:
                    message.coordinates = Coordinate.internalBinaryRead(reader, reader.uint32(), options, message.coordinates);
                    break;
                case /* repeated responses.Building buildings */ 6:
                    message.buildings.push(Building.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated responses.Player players */ 7:
                    message.players.push(Player.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated responses.NPC npcs */ 8:
                    message.npcs.push(NPC.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated responses.Item items */ 9:
                    message.items.push(Item.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Location, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string city_name = 2; */
        if (message.cityName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.cityName);
        /* bool clear = 3; */
        if (message.clear !== false)
            writer.tag(3, WireType.Varint).bool(message.clear);
        /* string description = 4; */
        if (message.description !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.description);
        /* responses.Coordinate coordinates = 5; */
        if (message.coordinates)
            Coordinate.internalBinaryWrite(message.coordinates, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.Building buildings = 6; */
        for (let i = 0; i < message.buildings.length; i++)
            Building.internalBinaryWrite(message.buildings[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.Player players = 7; */
        for (let i = 0; i < message.players.length; i++)
            Player.internalBinaryWrite(message.players[i], writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.NPC npcs = 8; */
        for (let i = 0; i < message.npcs.length; i++)
            NPC.internalBinaryWrite(message.npcs[i], writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.Item items = 9; */
        for (let i = 0; i < message.items.length; i++)
            Item.internalBinaryWrite(message.items[i], writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.Location
 */
export const Location = new Location$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PlayerMoveEvent$Type extends MessageType<PlayerMoveEvent> {
    constructor() {
        super("responses.PlayerMoveEvent", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "type", kind: "enum", T: () => ["responses.MoveEventType", MoveEventType] },
            { no: 3, name: "player", kind: "message", T: () => Player },
            { no: 4, name: "direction", kind: "enum", T: () => ["responses.Direction", Direction, "DIRECTION_"] },
            { no: 5, name: "samecity", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "fled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<PlayerMoveEvent>): PlayerMoveEvent {
        const message = { type: 0, direction: 0, samecity: false, fled: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PlayerMoveEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PlayerMoveEvent): PlayerMoveEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* responses.MoveEventType type */ 2:
                    message.type = reader.int32();
                    break;
                case /* responses.Player player */ 3:
                    message.player = Player.internalBinaryRead(reader, reader.uint32(), options, message.player);
                    break;
                case /* responses.Direction direction */ 4:
                    message.direction = reader.int32();
                    break;
                case /* bool samecity */ 5:
                    message.samecity = reader.bool();
                    break;
                case /* bool fled */ 6:
                    message.fled = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PlayerMoveEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* responses.MoveEventType type = 2; */
        if (message.type !== 0)
            writer.tag(2, WireType.Varint).int32(message.type);
        /* responses.Player player = 3; */
        if (message.player)
            Player.internalBinaryWrite(message.player, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* responses.Direction direction = 4; */
        if (message.direction !== 0)
            writer.tag(4, WireType.Varint).int32(message.direction);
        /* bool samecity = 5; */
        if (message.samecity !== false)
            writer.tag(5, WireType.Varint).bool(message.samecity);
        /* bool fled = 6; */
        if (message.fled !== false)
            writer.tag(6, WireType.Varint).bool(message.fled);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.PlayerMoveEvent
 */
export const PlayerMoveEvent = new PlayerMoveEvent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class NPCMoveEvent$Type extends MessageType<NPCMoveEvent> {
    constructor() {
        super("responses.NPCMoveEvent", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "type", kind: "enum", T: () => ["responses.MoveEventType", MoveEventType] },
            { no: 3, name: "npc", kind: "message", T: () => NPC },
            { no: 4, name: "direction", kind: "enum", T: () => ["responses.Direction", Direction, "DIRECTION_"] }
        ]);
    }
    create(value?: PartialMessage<NPCMoveEvent>): NPCMoveEvent {
        const message = { type: 0, direction: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<NPCMoveEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: NPCMoveEvent): NPCMoveEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* responses.MoveEventType type */ 2:
                    message.type = reader.int32();
                    break;
                case /* responses.NPC npc */ 3:
                    message.npc = NPC.internalBinaryRead(reader, reader.uint32(), options, message.npc);
                    break;
                case /* responses.Direction direction */ 4:
                    message.direction = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: NPCMoveEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* responses.MoveEventType type = 2; */
        if (message.type !== 0)
            writer.tag(2, WireType.Varint).int32(message.type);
        /* responses.NPC npc = 3; */
        if (message.npc)
            NPC.internalBinaryWrite(message.npc, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* responses.Direction direction = 4; */
        if (message.direction !== 0)
            writer.tag(4, WireType.Varint).int32(message.direction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.NPCMoveEvent
 */
export const NPCMoveEvent = new NPCMoveEvent$Type();
