<script>
    export let ambitionNotes;
    export let updateAmbitionEnabled = false;
</script>

<div>
    <div
        class="min-w-96 flex flex-col border-2 border-[--custom-light-pale] bg-[--custom-light-pale] overflow-hidden rounded-xl"
    >
        <h1 class="font-extrabold text-sm p-2 text-center">
            NOTE{ambitionNotes.length > 1 ? 'S' : ''}
        </h1>
        <div class="flex flex-col space-y-4 max-h-96 bg-background rounded-lg overflow-y-auto p-3">
            {#if ambitionNotes.length === 0}
                <p class="text-muted-foreground text-center">No notes added yet!</p>
            {:else}
                {#each ambitionNotes as note}
                    <div
                        class="{updateAmbitionEnabled
                            ? 'animate-ambitionEditModeAnimation relative'
                            : ''}  flex flex-col gap-2 justify-between items-start bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20 border border-yellow-400 rounded-lg p-2"
                    >
                        <p class="text-md opacity-80">
                            {note.content}
                        </p>
                        <span class="text-muted-foreground opacity-50 text-xs self-end">
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }).format(new Date(note.created_at))}
                        </span>
                        <!-- {#if updateAmbitionEnabled}
                            <button
                                on:click={() => handleRemoveAmbitionNote(note.id)}
                                type="button"
                                class="absolute top-px right-px bg-red-500 hover:brightness-150 active:bg-red-800 rounded-full p-px"
                                ><X size="20" /></button
                            >
                        {/if} -->
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>