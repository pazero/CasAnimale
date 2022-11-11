<template>
  <div id="funny-video" class="my-auto">
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

      <div id="video" class="place-self-center flex-auto">
        <button class="btn btn-primary mx-auto place-self-center flex justify-center" @click="updateVideo">
          Watch a video!
        </button>
      </div>
      <div class="place-self-center flex-none justify-end" @click="next">
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

<script scoped>
export default {
  data() {
    return {
      i: 0,
      videos: [
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/hJpfROXlaPc" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/z6EchXyieos" title="Funniest Animals 🐧 - Best Of The 2020 Funny Animal Videos 😁 - Cutest Animals Ever" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/paj4iyJJtqw" title="Funny Animal Videos 2022 😂 - Funniest Cats And Dogs Video 😺😍" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/Ia2565avfHY" title="FUNNY CAT MEMES COMPILATION OF 2022 PART 68" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/lhCuxsKinGY" title="Prova a non ridere! Gatti divertenti / Animali divertenti 220" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/OEwpV3mQW5w" title="THE BEST FUNNY DOG VIDEOS OF 2022! 🐶" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/paj4iyJJtqw" title="Funny Animal Videos 2022 😂 - Funniest Cats And Dogs Video 😺😍" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/J94R_y4FQ7g" title="Cute/Funny Animal TikToks that Will Brighten Up Your Day 🥰" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/kEz0FlJdqjw" title="40 Min That Little Puff Tiktok Compilation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/GsjY4YvkoZc" title="Cat 🐱 Side of TikTok Compilation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      ],
    };
  },
  methods: {
    updateVideo() {
      document.getElementById("video").innerHTML = this.videos[this.i];
    },
    next() {
      if (this.i == this.videos.length - 1) this.i = 0;
      else this.i++;

      this.updateVideo();
    },
    prev() {
      if (this.i == 0) this.i = this.videos.length - 1;
      else this.i--;

      this.updateVideo();
    },
  },
};
</script>

<style scoped></style>
