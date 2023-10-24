// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "merchant.proto" (package "responses", syntax proto3)
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
import { ResponseStatus } from "./common";
import { Gender } from "./common";
import { Any } from "./google/protobuf/any";
import { ItemType } from "./common";
/**
 * @generated from protobuf message responses.MerchantItem
 */
export interface MerchantItem {
    /**
     * @generated from protobuf field: int32 index = 1;
     */
    index: number;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string description = 3;
     */
    description: string;
    /**
     * @generated from protobuf field: float condition = 4;
     */
    condition: number;
    /**
     * @generated from protobuf field: uint32 price = 5;
     */
    price: number;
    /**
     * @generated from protobuf field: string quality = 6;
     */
    quality: string;
    /**
     * @generated from protobuf field: bool canbuy = 7;
     */
    canbuy: boolean;
    /**
     * @generated from protobuf field: int64 rep = 8;
     */
    rep: string;
    /**
     * @generated from protobuf field: bool cansell = 9;
     */
    cansell: boolean;
    /**
     * @generated from protobuf field: int32 quantity = 10;
     */
    quantity: number;
    /**
     * @generated from protobuf field: float demand = 11;
     */
    demand: number;
}
/**
 * @generated from protobuf message responses.MerchantItemGroup
 */
export interface MerchantItemGroup {
    /**
     * @generated from protobuf field: responses.ItemType type = 1;
     */
    type: ItemType;
    /**
     * @generated from protobuf field: repeated responses.MerchantItem items = 2;
     */
    items: MerchantItem[];
}
/**
 * @generated from protobuf message responses.MerchantInventory
 */
export interface MerchantInventory {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: string merchant_id = 2;
     */
    merchantId: string;
    /**
     * @generated from protobuf field: string merchant_name = 3;
     */
    merchantName: string;
    /**
     * @generated from protobuf field: responses.Gender merchant_gender = 4;
     */
    merchantGender: Gender;
    /**
     * @generated from protobuf field: responses.MerchantType merchant_type = 5;
     */
    merchantType: MerchantType;
    /**
     * @generated from protobuf field: bool open = 6;
     */
    open: boolean;
    /**
     * @generated from protobuf field: repeated responses.MerchantItemGroup items = 7;
     */
    items: MerchantItemGroup[];
    /**
     * @generated from protobuf field: repeated responses.MerchantItem player_items = 8;
     */
    playerItems: MerchantItem[];
}
/**
 * @generated from protobuf message responses.MerchantMessage
 */
export interface MerchantMessage {
    /**
     * @generated from protobuf field: google.protobuf.Any any_field = 1;
     */
    anyField?: Any;
    /**
     * @generated from protobuf field: responses.ResponseStatus status = 2;
     */
    status: ResponseStatus;
    /**
     * @generated from protobuf field: string message = 3;
     */
    message: string;
}
/**
 * @generated from protobuf enum responses.MerchantType
 */
export enum MerchantType {
    /**
     * @generated from protobuf enum value: MERCHANT_PAWN_SHOP = 0;
     */
    MERCHANT_PAWN_SHOP = 0,
    /**
     * @generated from protobuf enum value: MERCHANT_DRUG_DEALER = 1;
     */
    MERCHANT_DRUG_DEALER = 1,
    /**
     * @generated from protobuf enum value: MERCHANT_DRUGGIE = 2;
     */
    MERCHANT_DRUGGIE = 2,
    /**
     * @generated from protobuf enum value: MERCHANT_ARMS_DEALER = 3;
     */
    MERCHANT_ARMS_DEALER = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class MerchantItem$Type extends MessageType<MerchantItem> {
    constructor() {
        super("responses.MerchantItem", [
            { no: 1, name: "index", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "condition", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 5, name: "price", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "quality", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "canbuy", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "rep", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 9, name: "cansell", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "quantity", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 11, name: "demand", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<MerchantItem>): MerchantItem {
        const message = { index: 0, name: "", description: "", condition: 0, price: 0, quality: "", canbuy: false, rep: "0", cansell: false, quantity: 0, demand: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MerchantItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MerchantItem): MerchantItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 index */ 1:
                    message.index = reader.int32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string description */ 3:
                    message.description = reader.string();
                    break;
                case /* float condition */ 4:
                    message.condition = reader.float();
                    break;
                case /* uint32 price */ 5:
                    message.price = reader.uint32();
                    break;
                case /* string quality */ 6:
                    message.quality = reader.string();
                    break;
                case /* bool canbuy */ 7:
                    message.canbuy = reader.bool();
                    break;
                case /* int64 rep */ 8:
                    message.rep = reader.int64().toString();
                    break;
                case /* bool cansell */ 9:
                    message.cansell = reader.bool();
                    break;
                case /* int32 quantity */ 10:
                    message.quantity = reader.int32();
                    break;
                case /* float demand */ 11:
                    message.demand = reader.float();
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
    internalBinaryWrite(message: MerchantItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 index = 1; */
        if (message.index !== 0)
            writer.tag(1, WireType.Varint).int32(message.index);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string description = 3; */
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        /* float condition = 4; */
        if (message.condition !== 0)
            writer.tag(4, WireType.Bit32).float(message.condition);
        /* uint32 price = 5; */
        if (message.price !== 0)
            writer.tag(5, WireType.Varint).uint32(message.price);
        /* string quality = 6; */
        if (message.quality !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.quality);
        /* bool canbuy = 7; */
        if (message.canbuy !== false)
            writer.tag(7, WireType.Varint).bool(message.canbuy);
        /* int64 rep = 8; */
        if (message.rep !== "0")
            writer.tag(8, WireType.Varint).int64(message.rep);
        /* bool cansell = 9; */
        if (message.cansell !== false)
            writer.tag(9, WireType.Varint).bool(message.cansell);
        /* int32 quantity = 10; */
        if (message.quantity !== 0)
            writer.tag(10, WireType.Varint).int32(message.quantity);
        /* float demand = 11; */
        if (message.demand !== 0)
            writer.tag(11, WireType.Bit32).float(message.demand);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.MerchantItem
 */
export const MerchantItem = new MerchantItem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MerchantItemGroup$Type extends MessageType<MerchantItemGroup> {
    constructor() {
        super("responses.MerchantItemGroup", [
            { no: 1, name: "type", kind: "enum", T: () => ["responses.ItemType", ItemType, "ITEM_TYPE_"] },
            { no: 2, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MerchantItem }
        ]);
    }
    create(value?: PartialMessage<MerchantItemGroup>): MerchantItemGroup {
        const message = { type: 0, items: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MerchantItemGroup>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MerchantItemGroup): MerchantItemGroup {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* responses.ItemType type */ 1:
                    message.type = reader.int32();
                    break;
                case /* repeated responses.MerchantItem items */ 2:
                    message.items.push(MerchantItem.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: MerchantItemGroup, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* responses.ItemType type = 1; */
        if (message.type !== 0)
            writer.tag(1, WireType.Varint).int32(message.type);
        /* repeated responses.MerchantItem items = 2; */
        for (let i = 0; i < message.items.length; i++)
            MerchantItem.internalBinaryWrite(message.items[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.MerchantItemGroup
 */
export const MerchantItemGroup = new MerchantItemGroup$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MerchantInventory$Type extends MessageType<MerchantInventory> {
    constructor() {
        super("responses.MerchantInventory", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "merchant_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "merchant_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "merchant_gender", kind: "enum", T: () => ["responses.Gender", Gender] },
            { no: 5, name: "merchant_type", kind: "enum", T: () => ["responses.MerchantType", MerchantType] },
            { no: 6, name: "open", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MerchantItemGroup },
            { no: 8, name: "player_items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MerchantItem }
        ]);
    }
    create(value?: PartialMessage<MerchantInventory>): MerchantInventory {
        const message = { merchantId: "", merchantName: "", merchantGender: 0, merchantType: 0, open: false, items: [], playerItems: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MerchantInventory>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MerchantInventory): MerchantInventory {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* string merchant_id */ 2:
                    message.merchantId = reader.string();
                    break;
                case /* string merchant_name */ 3:
                    message.merchantName = reader.string();
                    break;
                case /* responses.Gender merchant_gender */ 4:
                    message.merchantGender = reader.int32();
                    break;
                case /* responses.MerchantType merchant_type */ 5:
                    message.merchantType = reader.int32();
                    break;
                case /* bool open */ 6:
                    message.open = reader.bool();
                    break;
                case /* repeated responses.MerchantItemGroup items */ 7:
                    message.items.push(MerchantItemGroup.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated responses.MerchantItem player_items */ 8:
                    message.playerItems.push(MerchantItem.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: MerchantInventory, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string merchant_id = 2; */
        if (message.merchantId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.merchantId);
        /* string merchant_name = 3; */
        if (message.merchantName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.merchantName);
        /* responses.Gender merchant_gender = 4; */
        if (message.merchantGender !== 0)
            writer.tag(4, WireType.Varint).int32(message.merchantGender);
        /* responses.MerchantType merchant_type = 5; */
        if (message.merchantType !== 0)
            writer.tag(5, WireType.Varint).int32(message.merchantType);
        /* bool open = 6; */
        if (message.open !== false)
            writer.tag(6, WireType.Varint).bool(message.open);
        /* repeated responses.MerchantItemGroup items = 7; */
        for (let i = 0; i < message.items.length; i++)
            MerchantItemGroup.internalBinaryWrite(message.items[i], writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* repeated responses.MerchantItem player_items = 8; */
        for (let i = 0; i < message.playerItems.length; i++)
            MerchantItem.internalBinaryWrite(message.playerItems[i], writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.MerchantInventory
 */
export const MerchantInventory = new MerchantInventory$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MerchantMessage$Type extends MessageType<MerchantMessage> {
    constructor() {
        super("responses.MerchantMessage", [
            { no: 1, name: "any_field", kind: "message", T: () => Any },
            { no: 2, name: "status", kind: "enum", T: () => ["responses.ResponseStatus", ResponseStatus, "RESPONSE_STATUS_"] },
            { no: 3, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<MerchantMessage>): MerchantMessage {
        const message = { status: 0, message: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MerchantMessage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MerchantMessage): MerchantMessage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Any any_field */ 1:
                    message.anyField = Any.internalBinaryRead(reader, reader.uint32(), options, message.anyField);
                    break;
                case /* responses.ResponseStatus status */ 2:
                    message.status = reader.int32();
                    break;
                case /* string message */ 3:
                    message.message = reader.string();
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
    internalBinaryWrite(message: MerchantMessage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Any any_field = 1; */
        if (message.anyField)
            Any.internalBinaryWrite(message.anyField, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* responses.ResponseStatus status = 2; */
        if (message.status !== 0)
            writer.tag(2, WireType.Varint).int32(message.status);
        /* string message = 3; */
        if (message.message !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message responses.MerchantMessage
 */
export const MerchantMessage = new MerchantMessage$Type();