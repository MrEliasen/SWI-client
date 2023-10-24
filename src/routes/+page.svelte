<script>
    import { handleControls } from "$lib/controls-handler";
    import { showLogin, showRegister, showNewCharacter } from "$lib/store/ready";
    import BuildingShop from "./components/BuildingShop.svelte";
    import Chat from "./components/Chat.svelte";
    import DrugDealer from "./components/DrugDealer.svelte";
    import Druggie from "./components/Druggie.svelte";
    import Game from "./components/Game.svelte";
    import GameInput from "./components/GameInput.svelte";
    import NewCharacter from "./components/NewCharacter.svelte";
    import News from "./components/News.svelte";
    import SideMenu from "./components/SideMenu.svelte";
    import Login from "./components/login.svelte";
    import Register from "./components/register.svelte";

    document.addEventListener("keydown", handleControls);
</script>

<svelte:head>
    <title>Street Wars Inc.</title>
    <meta name="description" content="A tribute to the original Street Wars Online 2 from 2000" />
</svelte:head>

<div class="relateive h-screen max-w-screen flex">
    <div class="flex flex-col flex-grow max-h-screen">
        <News />
        <Chat />
        <Game />
        <GameInput />
    </div>
    <div class="max-h-screen">
        <SideMenu />
    </div>

    {#if $showLogin}
        <Login />
    {/if}
    {#if $showRegister}
        <Register />
    {/if}
    {#if $showNewCharacter}
        <NewCharacter />
    {/if}

    <DrugDealer />
    <Druggie />
    <BuildingShop />
</div>
