import { get } from "svelte/store";
import { socketClient } from "./socket/client";
import { gameInitialised } from "./store/ready";

function toggleInputFocus(focus: boolean) {
    const input = window.document.getElementById("commandline");
    focus ? input?.focus() : input?.blur();
}

export function handleControls(e: KeyboardEvent) {
    let command: string = "";

    const ignore = ["input", "textarea"];
    if (
        window.document.activeElement &&
        ignore.includes(window.document.activeElement?.nodeName.toLowerCase())
    ) {
        return;
    }

    switch (e.key.toLowerCase()) {
        case "r":
            command = "/refresh";
            break;
        case "i":
        case "enter":
            toggleInputFocus(true);
            e.preventDefault();
            break;
    }

    if (get(gameInitialised)) {
        switch (e.key.toLowerCase()) {
            case "1":
                command = "/punch";
                break;
            case "2":
                command = "/strike";
                break;
            case "3":
                command = "/shoot";
                break;
            case "k":
            case "w":
            case "ArrowUp":
                command = "/move up";
                break;
            case "j":
            case "s":
            case "ArrowDown":
                command = "/move down";
                break;
            case "h":
            case "a":
            case "ArrowLeft":
                command = "/move left";
                break;
            case "l":
            case "d":
            case "ArrowRight":
                command = "/move right";
                break;
        }
    }

    if (command === "") {
        return;
    }

    socketClient.send(command);
}
