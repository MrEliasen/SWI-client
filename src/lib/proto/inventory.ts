// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "inventory.proto" (package "responses", syntax proto3)
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
import { Any } from "./google/protobuf/any";
/**
 * @generated from protobuf message responses.Inventory
 */
export interface Inventory {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: repeated responses.Item items = 2;
     */
    items: Item[];
}
// @generated message type with reflection information, may provide speed optimized methods
class Inventory$Type extends MessageType<Inventory> {
    constructor() {
        super("responses.Inventory", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Item }
        ]);
    }
    create(value?: PartialMessage<Inventory>): Inventory {
        const message = { items: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Inventory>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Inventory): Inventory {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* repeated responses.Item items */ 2:
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
    internalBinaryWrite(message: Inventory, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.Item items = 2; */
        for (let i = 0; i < message.items.length; i++)
            Item.internalBinaryWrite(message.items[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.Inventory
 */
export const Inventory = new Inventory$Type();
