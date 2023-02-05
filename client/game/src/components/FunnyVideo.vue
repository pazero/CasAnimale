<template>
  <div id="funny-video" class="my-auto">
    <div class="pt-2 flex">
      <button
        tabindex="0"
        class="place-self-center flex-none justify-left"
        @click="prev"
      >
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
      </button>

      <div id="video" class="place-self-center flex-auto">
        <button
          class="btn btn-primary mx-auto place-self-center flex justify-center"
          @click="updateVideo"
        >
          Watch a video!
        </button>
      </div>
      <button
        tabindex="0"
        class="place-self-center flex-none justify-end"
        @click="next"
      >
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
      </button>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      i: 0,
      videos: [
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/hJpfROXlaPc"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/z6EchXyieos"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/paj4iyJJtqw"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/Ia2565avfHY"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/lhCuxsKinGY"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/OEwpV3mQW5w"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/paj4iyJJtqw"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/J94R_y4FQ7g"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/kEz0FlJdqjw"></iframe>`,
        `<iframe class="w-full h-screen" src="https://www.youtube.com/embed/GsjY4YvkoZc"></iframe>`,
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
