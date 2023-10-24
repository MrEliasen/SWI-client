<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { socketClient } from "$lib/socket/client";
    import { showNewCharacter } from "$lib/store/ready";

    let name = "";
    let city = "";
    $: taken = false;
    $: validName = false;

    function login(e: Event) {
        e.preventDefault();

        fetch(`${env.PUBLIC_SERVER_URL}/check-name-taken`, {
            method: "POST",
            body: JSON.stringify({
                name,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (!json.valid) {
                    validName = false;
                    return;
                }

                if (json.taken) {
                    taken = true;
                    return;
                }

                socketClient.send(`/new ${name} ${city}`);
                showNewCharacter.set(false);
            });
    }

    $: {
        const pattern = /^[a-zA-Z0-9-_]{3,15}$/i;
        validName = pattern.test(name);
    }
</script>

<div class="absolute w-full h-full z-10">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
            <div
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
                <div class="bg-white px-4 py-5 sm:p-6">
                    <button
                        type="button"
                        on:click={() => {
                            showNewCharacter.set(false);
                        }}
                        class="absolute top-0 right-0 inline-flex rounded-md p-1.5 text-gray-500"
                    >
                        <span class="sr-only">Dismiss</span>
                        <svg
                            class="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                            />
                        </svg>
                    </button>
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form on:submit={login} class="space-y-6">
                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >Character Name</label
                                >
                                <div class="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        minlength="3"
                                        maxlength="15"
                                        required
                                        bind:value={name}
                                        class="{taken || !validName
                                            ? 'focus:ring-red-600 ring-red-300'
                                            : 'focus:ring-indigo-600'} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    />
                                    <p
                                        class="text-sm leading-6 text-gray-600"
                                        class:text-red-600={!validName}
                                    >
                                        3-15 characters, "a-zA-Z0-9_-" only.
                                    </p>
                                    <p
                                        class="text-sm leading-6 text-red-600 text-md"
                                        class:hidden={!taken}
                                    >
                                        Character name is taken
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between">
                                    <label
                                        for="password"
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        >Home City</label
                                    >
                                </div>
                                <div class="mt-2">
                                    <select
                                        id="city"
                                        name="city"
                                        bind:value={city}
                                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">- Select City -</option>
                                        <option value="RO">Rome</option>
                                        <option value="SH">Stockholm</option>
                                        <option value="NY">New York City</option>
                                        <option value="BJ">Beijing</option>
                                        <option value="MC">Moscow</option>
                                        <option value="BL">Berlin</option>
                                        <option value="MD">Madrid</option>
                                        <option value="LV">Las Vegas</option>
                                        <option value="MX">Mexico City</option>
                                        <option value="PT">Pretoria</option>
                                        <option value="PA">Paris</option>
                                        <option value="WS">Warsaw</option>
                                        <option value="TY">Tokyo</option>
                                        <option value="JK">Jakata</option>
                                        <option value="LD">London</option>
                                    </select>
                                    <p class="text-sm leading-6 text-gray-600">
                                        This determins where you start. You can only deposit money
                                        in your home city. The city will also show next to your name
                                        if you are not in a gang.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div
                                    class="rounded-md bg-yellow-50 border-2 border-yellow-400 p-4 mb-4"
                                >
                                    <div class="flex">
                                        <div class="flex-shrink-0">
                                            <svg
                                                class="h-5 w-5 text-yellow-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm text-yellow-700">
                                                <p>
                                                    You can only have one character per account, and
                                                    you cannot create a new one once you created
                                                    this one, so make it count.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >Create Character</button
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
