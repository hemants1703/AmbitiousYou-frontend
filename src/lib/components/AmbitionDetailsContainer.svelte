<script>
	import { CalendarArrowUp, CircleCheckBig, CircleSlash, LoaderPinwheel } from "lucide-svelte";

    export let ambitionData = {
        ambitionStartDate: new Date().toISOString().split("T")[0],
        ambitionEndDate: new Date().toISOString().split("T")[0],
        ambitionCompletionDate: new Date().toISOString().split("T")[0],
        ambitionCategory: "Project",
        ambitionStatus: "Completed",
        ambitionPriority: "High",
    };

    let ambitionStartDate = new Date(ambitionData.ambitionStartDate).toLocaleDateString();
    let ambitionEndDate = new Date(ambitionData.ambitionEndDate).toLocaleDateString();
    let ambitionCompletionDate = ambitionData.ambitionCompletionDate
        ? new Date(ambitionData.ambitionCompletionDate).toLocaleDateString()
        : null;
    let ambitionCategory = ambitionData.ambitionCategory;
    let ambitionPriority = ambitionData.ambitionPriority;
    let updatedAmbitionStatus = ambitionData.ambitionStatus;
</script>

<div class="max-w-full min-w-96">
    <div
        class="flex flex-col border-2 border-[--custom-light-pale] bg-[--custom-light-pale] rounded-xl overflow-hidden"
    >
        <h2 class="font-extrabold text-sm p-2 text-center">
            AMBITION DETAILS
        </h2>
        <div class="bg-background rounded-lg space-y-10 p-4">
            <ul class="space-y-5">
                <li class="flex justify-between w-full border-b py-1">
                    <strong>Start Date:</strong>
                    {ambitionData.ambitionStartDate}
                </li>
                <li class="flex justify-between w-full border-b py-1">
                    <strong>End Date:</strong>
                    {ambitionData.ambitionEndDate}
                </li>
                <li class="flex justify-between w-full border-b py-1">
                    <strong>Completion Date:</strong>
                    {ambitionData.ambitionCompletionDate ?? 'Not Completed Yet'}
                </li>
                <li class="flex justify-between w-full border-b py-1">
                    <strong>Status:</strong>
                    <p class="flex place-items-center gap-2">
                        {#if ambitionData.ambitionStatus.toUpperCase() === 'COMPLETED'}
                            <CircleCheckBig color="#10b981" />
                        {:else if ambitionData.ambitionStatus.toUpperCase() === 'ONGOING'}
                            <div class="animate-spin">
                                <LoaderPinwheel color="#3b82f6" />
                            </div>
                        {:else if ambitionData.ambitionStatus.toUpperCase() === 'FUTURE'}
                            <CalendarArrowUp color="#a855f7" />
                        {/if}
                        {ambitionData.ambitionStatus}
                    </p>
                </li>
                <li class="flex justify-between w-full border-b py-1">
                    <strong>Priority:</strong>
                    <p class="flex place-items-center gap-2">
                        {#if ambitionData.ambitionPriority.toUpperCase() === 'HIGH'}
                            <span class="border border-red-500 px-1 rounded-md text-red-500 text-sm"
                                >!!!</span
                            >
                        {:else if ambitionData.ambitionPriority.toUpperCase() === 'MEDIUM'}
                            <span class="border border-yellow-500 px-1 rounded-md text-yellow-500 text-sm"
                                >!!</span
                            >
                        {:else if ambitionData.ambitionPriority.toUpperCase() === 'LOW'}
                            <span class="border border-green-500 px-1 rounded-md text-green-500 text-sm"
                                >!</span
                            >
                        {/if}
                        <span>
                            {ambitionData.ambitionPriority}
                        </span>
                    </p>
                </li>
                <li class="flex justify-between w-full border-b py-1">
                    <strong>Category:</strong>
                    {ambitionData.ambitionCategory}
                </li>
            </ul>
        </div>
    </div>
</div>