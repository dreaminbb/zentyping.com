<script lang="ts">
import { defineComponent } from 'vue'
import { handle_sgin_in, handle_sign_out } from '@/firebase/github_auth'
import { user_status, user_info } from '@/store/store'

export default defineComponent({
  name: 'base_header',
  setup() {
    return {
      handle_sgin_in,
      handle_sign_out,
      user_status,
      user_info,
      SITE_SAME: import.meta.env.VITE_SITE_NAME
    }
  }
})
</script>

<template>
  <header>
    <h1>
      <header id="site_name">{{ SITE_SAME }}<i class="fa-solid fa-code"></i></header>
    </h1>
    <nav>
      <div>
        <div><font-awesome-icon class="nav_icon1" icon="book" /></div>
      </div>
      <a
        href="https://github.com/dreaminbb/zentyping.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon class="nav_icon_github" :icon="['fab', 'github']" />
      </a>
      <div>
        <div><font-awesome-icon class="nav_icon2" icon="gear" /></div>
      </div>
      <div>
        <div><font-awesome-icon class="nav_icon3" icon="bell" /></div>
      </div>

      <div id="user_name_display">
        {{ user_info().user_name === null ? 'Sign in with Github =>' : user_info().user_name }}
        <img
          v-if="user_info().user_name !== null"
          :src="user_info().user_icon_url"
          alt="User Photo"
        />
      </div>

      <div>
        <div @click="handle_sgin_in" v-if="!user_status().is_login">
          <font-awesome-icon class="nav_icon4" icon="user" />
        </div>
      </div>

      <div @click="handle_sign_out" v-if="user_status().is_login">
        <font-awesome-icon class="nav_icon5" icon="right-from-bracket" />
      </div>
    </nav>
  </header>
</template>
