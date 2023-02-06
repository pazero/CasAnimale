<template>
  <div class="flex flex-col py-5 mx-2 bg-white">
    <h1
      class="flex justify-center font-semibold normal-case text-4xl md:text-5xl xl:text-6xl md:pb-4"
    >
      OFFERED SERVICES
    </h1>

    <div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/vet'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/vet.png"
              alt="vet icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">Vet&emsp;</h1>
              <p class="font-normal text-gray-700">
                Here you can find all the vets we work with. You can book a
                visit with a vet or just read info about it. Take a look!
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/forum'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/forum.png"
              alt="forum icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">Forum&emsp;</h1>
              <p class="font-normal text-gray-700">
                Read here some other users' posts. Maybe you can find some
                useful tips and tricks. Take a look!
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/petsitter'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/petsitter.png"
              alt="petsitter icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">Petsitter&emsp;</h1>
              <p class="font-normal text-gray-700">
                Here you can find all the petsitters we work with. You can
                reserve a prenotation with a pet-sitter or just read info about
                it. Have a look!
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/psychologist'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/psychologist.png"
              alt="psychologist icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">
                Psychologist&emsp;
              </h1>
              <p class="font-normal text-gray-700">
                Here you can find all the psychologists we work with. You can
                reserve a prenotation with one of them or just read info about
                it. Have a look!
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/compra'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/compra.png"
              alt="compra icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">Shop&emsp;</h1>
              <p class="font-normal text-gray-700">
                Do you need any supplies for your pets? Here you can find
                everything you may need! Take a look!
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="flex justify-center mt-4 font-semibold">
        <a
          :href="Const.FOURL + '/grooming'"
          class="flex-initial max-w-sm sm:max-w-xl md:max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
        >
          <div class="flex flex-row">
            <img
              src="../assets/grooming.png"
              alt="grooming icon"
              class="self-center w-20 h-20 mr-4 object-center group-hover:opacity-75"
            />
            <div class="flex flex-col md:flex-row ml-2">
              <h1 class="mb-2 tracking-tight text-gray-900">Grooming&emsp;</h1>
              <p class="font-normal text-gray-700">
                Here you can find all the groomers we work with. You can reserve
                a prenotation with one of them or just read info about it. Take
                a look!
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import Const from "../router/utils";
</script>
