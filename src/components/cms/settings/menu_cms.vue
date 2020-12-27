<template>
  <div class="menu top-right">
    <ul class="menu-nav menu-cms">
      <li ref="greeting" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'greeting')"
          >Main Settings
        </a>
      </li>

      <li ref="showcase" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'showcase')"
          >Galleries
        </a>
      </li>

      <li ref="about" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'about')"
          >Navigation
        </a>
      </li>

      <li ref="contact" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'contact')"
          >Navigation
        </a>
      </li>
      <li ref="contact" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'contact')"
          >Navigation
        </a>
      </li>
      <li ref="contact" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'contact')"
          >Navigation
        </a>
      </li>
      <li ref="contact" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'contact')"
          >Log Out
        </a>
      </li>
    </ul>
  </div>
</template>

<style src="../../../sass/main.css" />
<script src="./menu_cms.js" />
