<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "./api";
  import Chart from "./Chart.svelte";

  let owners = [];
  let ownersAnimals = {};

  let selectedOwner = null;
  let selectedPet = null;

  let petMeasureData = null;

  function selectOwner(owner) {
    selectedOwner = owner;
    selectedPet = null;
  }

  async function fetchPetMeasureData(pet) {
    const sensorData = await get(`pet/${pet.petId}/sensors`);
    const firstSensorId = sensorData[0].sensorId;
    const measures = await get(`sensor/${firstSensorId}/measurement`);
    const dates = measures.map((m) => m.timestamp);
    const beatsByHour = dates.reduce((acc, curr, i) => {
      const timestamp = new Date(curr);
      const date = timestamp.toLocaleDateString();
      const hour = timestamp.getHours();
      const beats = measures[i].value;
      acc[date] = acc[date] || {};
      acc[date][hour] = acc[date][hour] || [];
      acc[date][hour].push(beats);
      return acc;
    }, {});
    const averagesByHour = {};
    Object.keys(beatsByHour).forEach((date) => {
      averagesByHour[date] = {};
      Object.keys(beatsByHour[date]).forEach((hour) => {
        const beats = beatsByHour[date][hour];
        const avg = beats.reduce((acc, curr) => acc + curr, 0) / beats.length;
        averagesByHour[date][hour] = avg;
      });
    });

    const result = { finalDate: [], beats: [] };
    for (const date of Object.keys(averagesByHour)) {
      const hours = Object.keys(averagesByHour[date]);
      const finalDate = hours.map((hour) => `${date} ${hour}:00`);
      const beats = hours.map((hour) => averagesByHour[date][hour]);
      result.finalDate.push(...finalDate);
      result.beats.push(...beats);
    }
    petMeasureData = result;
  }

  async function selectPet(pet) {
    await fetchPetMeasureData(pet);
    selectedPet = pet;
  }

  onMount(async () => {
    const fetchedOwners = await get("owner");
    owners = fetchedOwners;

    for (const owner of owners) {
      const fetchedAnimals = await get(`owner/${owner.ownerId}/pets`);
      ownersAnimals[owner.ownerId] = fetchedAnimals;
    }
  });

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div class="w-full h-full flex flex-col justify-between ">
  <div class="flex flex-col gap-12">
    <div
      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      {#each owners as owner}
        <!-- svelte-ignore a11y-click-events-have-key-events -->

        <button
          aria-current="true"
          type="button"
          class="w-full px-4 py-2 font-medium text-left  border border-gray-200 rounde cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600 {selectedOwner &&
          selectedOwner.ownerId === owner.ownerId
            ? 'bg-blue-700 text-white'
            : ''}"
          on:click={() => selectOwner(owner)}
        >
          {owner.name}
        </button>
      {/each}
    </div>

    {#if selectedOwner}
      <div>
        {#each ownersAnimals[selectedOwner.ownerId] as pet}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <button
            type="button"
            class="w-48 px-4 py-2 font-medium text-left border border-gray-200 rounded-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600 {selectedPet &&
            selectedPet.petId === pet.petId
              ? 'bg-blue-700 text-white'
              : ''}"
            on:click={() => selectPet(pet)}
          >
            {pet.name}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  {#if selectedPet}
    <div>
      <h2>Informations sur l'animal :</h2>
      <ul>
        <li>Nom : {capitalize(selectedPet.name)}</li>
        <li>Propriétaire : {capitalize(selectedOwner.name)}</li>
        <li>Espèce : {capitalize(selectedPet.species)}</li>
        <li>Race : {capitalize(selectedPet.breed)}</li>
        <li>Couleur : {capitalize(selectedPet.color)}</li>
        <li>Age : {selectedPet.age}</li>
        <li>Sexe : {capitalize(selectedPet.gender)}</li>
        <li>Poids : {selectedPet.weight} lbs</li>
        <li>Addresse : {capitalize(selectedPet.address)}</li>
      </ul>

      <div class="w-[50%] h-full">
        <Chart labels={petMeasureData.finalDate} data={petMeasureData.beats} />
      </div>
    </div>
  {/if}
</div>
