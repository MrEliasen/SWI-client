// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "chat.proto" (package "responses", syntax proto3)
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
import { Player } from "./common";
import { Any } from "./google/protobuf/any";
/**
 * @generated from protobuf message responses.Chat
 */
export interface Chat {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: responses.ChatType type = 2;
     */
    type: ChatType;
    /**
     * @generated from protobuf field: string msg = 3;
     */
    msg: string;
    /**
     * @generated from protobuf field: responses.Player player = 4;
     */
    player?: Player;
}
/**
 * @generated from protobuf enum responses.ChatType
 */
export enum ChatType {
    /**
     * @generated from protobuf enum value: CHAT_TYPE_GLOBAL = 0;
     */
    GLOBAL = 0,
    /**
     * @generated from protobuf enum value: CHAT_TYPE_LOCAL = 1;
     */
    LOCAL = 1,
    /**
     * @generated from protobuf enum value: CHAT_TYPE_PRIVATE = 2;
     */
    PRIVATE = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class Chat$Type extends MessageType<Chat> {
    constructor() {
        super("responses.Chat", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "type", kind: "enum", T: () => ["responses.ChatType", ChatType, "CHAT_TYPE_"] },
            { no: 3, name: "msg", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "player", kind: "message", T: () => Player }
        ]);
    }
    create(value?: PartialMessage<Chat>): Chat {
        const message = { type: 0, msg: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Chat>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Chat): Chat {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* responses.ChatType type */ 2:
                    message.type = reader.int32();
                    break;
                case /* string msg */ 3:
                    message.msg = reader.string();
                    break;
                case /* responses.Player player */ 4:
                    message.player = Player.internalBinaryRead(reader, reader.uint32(), options, message.player);
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
    internalBinaryWrite(message: Chat, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* responses.ChatType type = 2; */
        if (message.type !== 0)
            writer.tag(2, WireType.Varint).int32(message.type);
        /* string msg = 3; */
        if (message.msg !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.msg);
        /* responses.Player player = 4; */
        if (message.player)
            Player.internalBinaryWrite(message.player, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.Chat
 */
export const Chat = new Chat$Type();
