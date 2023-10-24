import {
    gameInitialised,
    showDrugDealer,
    showLogin,
    showNewCharacter,
    showRegister,
} from "$lib/store/ready";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import { Chat } from "$lib/proto/chat";
import { Generic } from "$lib/proto/generic";
import { GPS } from "$lib/proto/gps";
import { Inventory } from "$lib/proto/inventory";
import { Location, NPCMoveEvent, PlayerMoveEvent } from "$lib/proto/location";
import { MerchantInventory, MerchantMessage } from "$lib/proto/merchant";
import { NewsFlash } from "$lib/proto/news";
import { Stats } from "$lib/proto/stats";
import { System, SystemType } from "$lib/proto/system";
import { PlayerList } from "$lib/proto/playerlist";
import { Any } from "$lib/proto/google/protobuf/any";

export enum ClientEventType {
    "chat" = "chat",
    "connection" = "connection",
    "game" = "game",
    "generic" = "generic",
    "gps" = "gps",
    "inventory" = "inventory",
    "merchant" = "merchant",
    "merchantMessage" = "merchantMessage",
    "news" = "news",
    "npcMove" = "npcMove",
    "playerMove" = "playerMove",
    "players" = "players",
    "stats" = "stats",
    "system" = "system",
}

export type SocketEvents = {
    chat: Chat;
    connection: boolean;
    game: Location;
    generic: Generic;
    gps: GPS;
    inventory: Inventory;
    merchant: MerchantInventory;
    merchantMessage: MerchantMessage;
    news: NewsFlash;
    npcMove: NPCMoveEvent;
    playerMove: PlayerMoveEvent;
    players: PlayerList;
    stats: Stats;
    system: System;
};

export class SocketClient {
    private conn: WebSocket | null = null;
    public connected = false;
    private addr: string;
    private subscribers: Map<string, Set<any>> = new Map();
    public reconnecting: NodeJS.Timeout | null = null;

    constructor(addr: string) {
        this.addr = addr;
        this.subscribers.set(ClientEventType.chat, new Set());
        this.subscribers.set(ClientEventType.connection, new Set());
        this.subscribers.set(ClientEventType.game, new Set());
        this.subscribers.set(ClientEventType.generic, new Set());
        this.subscribers.set(ClientEventType.gps, new Set());
        this.subscribers.set(ClientEventType.inventory, new Set());
        this.subscribers.set(ClientEventType.merchant, new Set());
        this.subscribers.set(ClientEventType.merchantMessage, new Set());
        this.subscribers.set(ClientEventType.news, new Set());
        this.subscribers.set(ClientEventType.npcMove, new Set());
        this.subscribers.set(ClientEventType.playerMove, new Set());
        this.subscribers.set(ClientEventType.players, new Set());
        this.subscribers.set(ClientEventType.stats, new Set());
        this.subscribers.set(ClientEventType.system, new Set());

        this.connect();
    }

    private connect() {
        if (this.connected) {
            return;
        }

        const conn = new WebSocket(this.addr.replace("https:", "wss:"));
        conn.binaryType = "arraybuffer";
        conn.onerror = () => this.handleError();
        conn.onopen = () => this.handleConnect();
        conn.onmessage = (msg: MessageEvent) => this.handleMessage(msg);
        conn.onclose = () => {
            gameInitialised.set(false);
            this.connected = false;

            const subs = this.subscribers.get(ClientEventType.connection);
            subs?.forEach((callback) => callback(false));

            console.log("Reconnecting...");

            this.reconnecting = setTimeout(() => {
                this.connect();
            }, 5000);
        };
        this.conn = conn;
    }

    disconnect(): void {
        this.conn?.close();
    }

    destroy(): void {
        this.conn?.close();
    }

    private handleConnect(): void {
        this.connected = true;

        showNewCharacter.set(false);
        showRegister.set(false);
        showDrugDealer.set(false);
        showLogin.set(false);

        const subs = this.subscribers.get(ClientEventType.connection);
        subs?.forEach((callback) => callback(true));
    }

    private handleError(): void {
        this.conn?.close();
    }

    private handleSystemEvents(e: System) {
        switch (e.type) {
            case SystemType.GAME_READY:
                gameInitialised.set(true);
                break;
        }
    }

    private notify(msg: any, clientEvent: ClientEventType) {
        const subs = this.subscribers.get(clientEvent);
        subs?.forEach((callback) => callback(msg));
    }

    private handleMessage(msg: MessageEvent): void {
        const data = new Uint8Array(msg.data);
        const message = Any.fromBinary(data)
        const type = message.typeUrl.replace("type.googleapis.com/", "")

        if (Chat.typeName === type) {
            this.notify(Chat.fromBinary(message.value), ClientEventType.chat);
            return;
        }
        if (Generic.typeName === type) {
            this.notify(Generic.fromBinary(message.value), ClientEventType.generic);
            return;
        }
        if (GPS.typeName === type) {
            this.notify(GPS.fromBinary(message.value), ClientEventType.gps);
            return;
        }
        if (Inventory.typeName === type) {
            this.notify(Inventory.fromBinary(message.value), ClientEventType.inventory);
            return;
        }
        if (PlayerMoveEvent.typeName === type) {
            this.notify(PlayerMoveEvent.fromBinary(message.value), ClientEventType.playerMove);
            return;
        }
        if (NPCMoveEvent.typeName === type) {
            this.notify(NPCMoveEvent.fromBinary(message.value), ClientEventType.npcMove);
            return;
        }
        if (Location.typeName === type) {
            this.notify(Location.fromBinary(message.value), ClientEventType.game);
            return;
        }
        if (MerchantInventory.typeName === type) {
            this.notify(MerchantInventory.fromBinary(message.value), ClientEventType.merchant);
            return;
        }
        if (MerchantMessage.typeName === type) {
            this.notify(MerchantMessage.fromBinary(message.value), ClientEventType.merchantMessage);
            return;
        }
        if (NewsFlash.typeName === type) {
            this.notify(NewsFlash.fromBinary(message.value), ClientEventType.news);
            return;
        }
        if (Stats.typeName === type) {
            this.notify(Stats.fromBinary(message.value), ClientEventType.stats);
            return;
        }
        if (System.typeName === type) {
            this.notify(System.fromBinary(message.value), ClientEventType.system);
            this.handleSystemEvents(System.fromBinary(message.value));
            return;
        }
        if (PlayerList.typeName === type) {
            this.notify(PlayerList.fromBinary(message.value), ClientEventType.players);
            return;
        }
    }

    public subscribe<K extends keyof SocketEvents>(
        eventType: K,
        callback: (event: SocketEvents[K]) => void,
    ): { unsubscribe: () => void } {
        const subs = this.subscribers.get(eventType);
        subs?.add(callback);

        if (eventType === ClientEventType.connection) {
            callback(this.connected as SocketEvents[K]);
        }

        return {
            unsubscribe: () => {
                subs?.delete(callback);
            },
        };
    }

    public send(msg: string) {
        if (msg.trim().length > 0 && msg.trim()[0] === "/") {
            if (msg === "/login") {
                showLogin.set(true);
                showRegister.set(false);
                showNewCharacter.set(false);
                return;
            }

            if (msg === "/register") {
                showRegister.set(true);
                showLogin.set(false);
                showNewCharacter.set(false);
                return;
            }

            if (msg === "/new") {
                showNewCharacter.set(true);
                showLogin.set(false);
                showRegister.set(false);
                return;
            }

            this.conn?.send(msg);
            return;
        }

        this.conn?.send(`/say ${msg}`);
    }
}

export const socketClient = new SocketClient(PUBLIC_SERVER_URL);
