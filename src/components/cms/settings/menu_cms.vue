<template>
  <div class="menu top-right">
    <ul class="menu-nav menu-cms">
      <!-- <li ref="greeting" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'main')"
          >Main Settings
        </a>
      </li> -->

      <li ref="showcase" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'galleries')"
          >Galerie
        </a>
      </li>

      <li ref="showcase" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'about')"
          >Ustawienia
        </a>
      </li>

      <li ref="about" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'logout')"
          >Wyloguj
        </a>
      </li>
    </ul>
  </div>
</template>

<style src="../../../sass/main.css"></style>
<script src="./menu_cms.js" />
