<script lang="ts">
    import { socketClient } from "$lib/socket/client";
    import { showLogin, showRegister } from "$lib/store/ready";
    import { onMount } from "svelte";

    let email = "";
    let password = "";
    let emailInput: HTMLInputElement;

    function login(e: Event) {
        e.preventDefault();
        socketClient.send(`/authenticate ${email} ${password}`);
        showLogin.set(false);
    }

    onMount(() => {
        emailInput?.focus();
    });
</script>

<div class="absolute w-full h-full z-10">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed flex justify-center items-center inset-0 z-10 w-screen overflow-y-auto">
        <!-- form -->
        <div
            class="relative w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700"
        >
            <button
                type="button"
                on:click={() => {
                    showLogin.set(false);
                }}
                class="absolute top-0 right-0 inline-flex rounded-md p-1.5 text-gray-500"
            >
                <span class="sr-only">Dismiss</span>
                <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                </svg>
            </button>
            <form on:submit={login} class="space-y-6">
                <h5 class="text-xl font-medium text-white">Login to your account</h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-white"
                        >Your email</label
                    >
                    <input
                        type="email"
                        name="email"
                        id="email"
                        bind:value={email}
                        bind:this={emailInput}
                        class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        placeholder="name@provider.tld"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-white"
                        >Your password</label
                    >
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        bind:value={password}
                        class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >Login to your account</button
                >
                <div class="text-sm font-medium text-gray-300">
                    Not registered? <button
                        on:click={() => {
                            showLogin.set(false);
                            showRegister.set(true);
                        }}
                        class="hover:underline text-blue-500"
                    >
                        Create account
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
