// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "stats.proto" (package "responses", syntax proto3)
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
import { Any } from "./google/protobuf/any";
/**
 * @generated from protobuf message responses.Skill
 */
export interface Skill {
    /**
     * @generated from protobuf field: string key = 1;
     */
    key: string;
    /**
     * @generated from protobuf field: float value = 2;
     */
    value: number;
}
/**
 * @generated from protobuf message responses.Stats
 */
export interface Stats {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string rank = 3;
     */
    rank: string;
    /**
     * @generated from protobuf field: int64 reputation = 4;
     */
    reputation: string;
    /**
     * @generated from protobuf field: int64 next_rank = 5;
     */
    nextRank: string;
    /**
     * @generated from protobuf field: uint32 cash = 6;
     */
    cash: number;
    /**
     * @generated from protobuf field: uint32 bank = 7;
     */
    bank: number;
    /**
     * @generated from protobuf field: string hometown = 8;
     */
    hometown: string;
    /**
     * @generated from protobuf field: int32 health = 9;
     */
    health: number;
    /**
     * @generated from protobuf field: uint32 max_health = 10;
     */
    maxHealth: number;
    /**
     * @generated from protobuf field: repeated responses.Skill skills = 11;
     */
    skills: Skill[];
}
// @generated message type with reflection information, may provide speed optimized methods
class Skill$Type extends MessageType<Skill> {
    constructor() {
        super("responses.Skill", [
            { no: 1, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "value", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<Skill>): Skill {
        const message = { key: "", value: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Skill>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Skill): Skill {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string key */ 1:
                    message.key = reader.string();
                    break;
                case /* float value */ 2:
                    message.value = reader.float();
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
    internalBinaryWrite(message: Skill, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string key = 1; */
        if (message.key !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.key);
        /* float value = 2; */
        if (message.value !== 0)
            writer.tag(2, WireType.Bit32).float(message.value);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.Skill
 */
export const Skill = new Skill$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Stats$Type extends MessageType<Stats> {
    constructor() {
        super("responses.Stats", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "rank", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "reputation", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 5, name: "next_rank", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 6, name: "cash", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 7, name: "bank", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 8, name: "hometown", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "health", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 10, name: "max_health", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 11, name: "skills", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Skill }
        ]);
    }
    create(value?: PartialMessage<Stats>): Stats {
        const message = { name: "", rank: "", reputation: "0", nextRank: "0", cash: 0, bank: 0, hometown: "", health: 0, maxHealth: 0, skills: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Stats>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Stats): Stats {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string rank */ 3:
                    message.rank = reader.string();
                    break;
                case /* int64 reputation */ 4:
                    message.reputation = reader.int64().toString();
                    break;
                case /* int64 next_rank */ 5:
                    message.nextRank = reader.int64().toString();
                    break;
                case /* uint32 cash */ 6:
                    message.cash = reader.uint32();
                    break;
                case /* uint32 bank */ 7:
                    message.bank = reader.uint32();
                    break;
                case /* string hometown */ 8:
                    message.hometown = reader.string();
                    break;
                case /* int32 health */ 9:
                    message.health = reader.int32();
                    break;
                case /* uint32 max_health */ 10:
                    message.maxHealth = reader.uint32();
                    break;
                case /* repeated responses.Skill skills */ 11:
                    message.skills.push(Skill.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: Stats, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string rank = 3; */
        if (message.rank !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.rank);
        /* int64 reputation = 4; */
        if (message.reputation !== "0")
            writer.tag(4, WireType.Varint).int64(message.reputation);
        /* int64 next_rank = 5; */
        if (message.nextRank !== "0")
            writer.tag(5, WireType.Varint).int64(message.nextRank);
        /* uint32 cash = 6; */
        if (message.cash !== 0)
            writer.tag(6, WireType.Varint).uint32(message.cash);
        /* uint32 bank = 7; */
        if (message.bank !== 0)
            writer.tag(7, WireType.Varint).uint32(message.bank);
        /* string hometown = 8; */
        if (message.hometown !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.hometown);
        /* int32 health = 9; */
        if (message.health !== 0)
            writer.tag(9, WireType.Varint).int32(message.health);
        /* uint32 max_health = 10; */
        if (message.maxHealth !== 0)
            writer.tag(10, WireType.Varint).uint32(message.maxHealth);
        /* repeated responses.Skill skills = 11; */
        for (let i = 0; i < message.skills.length; i++)
            Skill.internalBinaryWrite(message.skills[i], writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.Stats
 */
export const Stats = new Stats$Type();