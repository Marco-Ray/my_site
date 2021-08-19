<template>
  <transition class="animate__animated animate__fadeIn">
    <nav id="nav" class="bg-black relative lg:fixed w-full shadow-lg lg:bg-transparent">
    <div class="container pt-8 pb-2 mx-auto lg:flex lg:justify-between lg:items-center">
        <div class="lg:flex lg:items-center">
          <div class="flex items-center justify-between">
            <div id="logo"
              class="text-white text-2xl font-bold
              lg:text-3xl">
              Zehuan Wang
            </div>

            <!-- Mobile menu button -->
            <div class="flex lg:hidden">
              <button type="button" class="text-white focus:text-gray-600" aria-label="toggle menu" @click.prevent="isOpen = !isOpen">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path fill-rule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0
                        2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                  </path>
                </svg>
              </button>
            </div>
          </div>

          <div class="flex-col text-white capitalize pt-10 divide-solid divide-y divide-white divide-opacity-20
          lg:flex lg:px-24 lg:-mx-4 lg:gap-0 lg:pt-0 lg:flex-row lg:items-center lg:divide-none"
               :class="{ 'hidden': !isOpen, 'flex': isOpen}"
          >
            <router-link to="/resume" :class="navItemStyle">Resume</router-link>
            <router-link to="/about" :class="navItemStyle">About Me</router-link>
            <router-link to="/portfolio" :class="navItemStyle">Portfolio</router-link>
            <router-link to="/blogs" :class="navItemStyle">Blog</router-link>
            <router-link to="/contact" :class="navItemStyle">Contact</router-link>

          </div>
        </div>

        <div class="flex justify-center mt-3 pb-1 lg:pb-0 lg:flex lg:mt-0 transform hover:cursor-pointer">
          <a href="https://www.linkedin.com/in/zehuan-wang-58bb061a1" target="_blank" class="mx-2 text-gray-600 dark:text-gray-300
          hover:text-gray-500 dark:hover:text-gray-300" aria-label="LinkedIn">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 >
              <path d="M32 32z m480 19.2C257.51 51.2 51.2 257.51 51.2 512S257.51 972.8 512 972.8 972.8 766.49 972.8 512 766.49 51.2 512 51.2zM399.2 702.98h-93.3V402.74h93.3v300.24zM351.98 365.9c-29.46 0-48.54-20.94-48.54-46.71 0-26.4 19.62-46.65 49.74-46.65s48.54 20.25 49.11 46.65c0.06 25.83-19.02 46.71-50.31 46.71z m387.96 337.08h-93.27V536.57c0-38.7-13.53-65.04-47.28-65.04-25.77 0-41.1 17.82-47.91 34.98-2.46 6.09-3.06 14.73-3.06 23.28v173.13h-93.36V498.44c0-37.44-1.2-68.79-2.46-95.76h81.03l4.32 41.7h1.83c12.3-19.62 42.39-48.48 92.73-48.48 61.38 0 107.43 41.1 107.43 129.51v177.54z"></path>
            </svg>
          </a>



          <a href="#" class="mx-2 text-gray-600
          dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
             aria-label="Facebook">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
              </path>
            </svg>
          </a>

          <a href="https://github.com/Marco-Ray" target="_blank" class="mx-2 text-gray-600 dark:text-gray-300
          hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
              </path>
            </svg>
          </a>
        </div>
      </div>
  </nav>
  </transition>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isOpen: false,
      navItemStyle: "mt-2 lg:mt-0 lg:mx-3 flex-auto px-2 py-2 rounded-sm lg:py-4 " +
        "transition-colors duration-500 transform hover:bg-gray-300 hover:bg-opacity-30 hover:cursor-pointer",
    }
  },
};
</script>

<style lang="scss" scoped>
.linkedIn {
  width: 24px;
  height: 24px;
}
</style>
