<script setup>
import { onActivated, onMounted, ref } from 'vue';
const actual = ref(0);
const pages = ref([
  {
    title: `Puppies 101: How to Care for a Puppy`,
    link: `https://www.thesprucepets.com/how-to-care-for-puppies-1117475`,
    text: `Bringing a new puppy into your home will change your life forever.
            Puppies are definitely a lot of work, but they also bring plenty of joy to your world.
            Whether you are ​getting your first puppy or just need a refresher course,
            here's what you'll need to know to get your puppy on the right track to adulthood.`,
  },
  {
    title: `29 Fun and Useful Puppy Facts`,
    link: `https://simplyfordogs.com/29-fun-useful-puppy-facts/`,
    text: `There aren’t many things more exciting than bringing a new puppy home.
            I’ve done it a few times over the course of my life, and it just never gets old!
            Every single puppy I’ve ever adopted has been a wonderful little miracle in his or her own right. 
            And the litters I’ve had out of my dogs?
            Well, I guess those are something along the lines of mega-miracles!`,
  },
  {
    title: `Puppy - Recommendations for New Owners`,
    link: `https://vcahospitals.com/know-your-pet/puppy---recommendations-for-new-owners-part-i---veterinary-care`,
    text: `Congratulations on the acquisition of your new puppy!
            Owning a dog can be an extremely rewarding experience,
            but it is also a large responsibility that lasts the entire lifetime of the dog.
            This handout will give you information needed to make some excellent decisions regarding the care of your puppy.`,
  },
  {
    title: `Caring for your puppy`,
    link: `https://www.rvc.ac.uk/small-animal-vet/general-practice/pet-care-advice/puppy-care`,
    text: `If you've just welcomed a new puppy into your household (or are planning to), it is an exciting time.
            We recognise you may want some care advice -
            not just about your puppy's health but also about behaviour and environment.`,

  },
  {
    title: `Routine Health Care of Dogs`,
    link: `https://www.msdvetmanual.com/dog-owners/routine-care-and-breeding-of-dogs/routine-health-care-of-dogs`,
    text: `In addition to feeding and exercising your dog,
            other aspects of general care are needed to keep your dog healthy throughout its life.
            These include routine veterinary care for vaccinations, parasite control, and dental care;
            grooming; and protection from household hazards.`,
  },
  {
    title: `Animal Legal and Historical Center Website`,
    link: `https://www.animallaw.info/`,
    text: `On this site you will find a comprehensive repository of information about animal law,
            including: over 1200 full text cases (US, historical, and UK), over 1400 US statutes,
            over 60 topics and comprehensive explanations,
            legal articles on a variety of animal topics and an international collection.`,
  },
  {
    title: `Living with pets in Italy: rules, rights and regulations`,
    link: `https://www.idealista.it/en/news/legal-advice-italy/2019/02/27/2376-living-pets-italy-rules-rights-and-regulations`,
    text: `Anyone who has a pet, especially a dog or cat, knows perfectly well how difficult it can be keeping them in an apartment,
            especially in a condo or apartment building where not everyone is willing to accept them.
            The official regulations of the condominium can help us resolve any dispute.
            Knowing the rules for pets where you live can help you avoid,
            or at least minimise the risk of, misunderstandings with your neighbours.`,
  },
  {
    title: `Rights and obligations of pet owners`,
    link: `https://www.rocketlawyer.com/gb/en/quick-guides/rights-and-obligations-of-pet-owners`,
    text: `Having a pet (mainly a dog or cat) brings a lot of responsibility.
            Read about some of the key laws you should be aware of when owning a pet.`,
  },
]);

function updateVideo() {
  document.getElementById("title").innerHTML = pages.value[actual.value]?.title;
  document.getElementById("link").setAttribute('href', pages.value[actual.value]?.link);
  document.getElementById("text").innerHTML = pages.value[actual.value]?.text;

}
function next() {
  (actual.value < pages.value.length-1 ) ? (actual.value++) : (actual.value = 0)
  updateVideo();
}
function prev() {

    (actual.value > 0 ) ? (actual.value--) : (actual.value = pages.value.length - 1)
    updateVideo();
}
onMounted(updateVideo);
</script>

<template>
  <div id="useful-info" class="my-auto">
    <!-- left arrow -->
    <div class="pt-2 flex">
      <div class="place-self-center flex-none justify-left" @click="prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
          />
        </svg>
      </div>
      <!-- main -->
      <div id="page" class="flex flex-col place-self-center" style="flex: 1 1 auto;">
        <div id="title" class="mb-2 sm:mb-10 text-center font-bold text-2xl sm:text-5xl" style="color: #570DF8;"></div>
        <div class="flex flex-row mb-4 sm:mb-10">
            <div class="flex flex-col" style="flex:1 1 auto"></div>
            <div id="text" class="text-center sm:w-3/6" style="flex:1 1 auto;"></div>
            <div class="flex flex-col" style="flex:1 1 auto"></div>
        </div>
        <a id="link"
          class="btn btn-primary mx-auto place-self-center flex justify-center"
          href="#"
          target="_blank"
        >
          Get more info!
        </a>
      </div>
      <!-- rigth arrow -->
      <div class="place-self-center flex-none justify-end" @click="next()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
