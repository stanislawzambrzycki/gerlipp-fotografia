<template>
  <div class="menu top-right">
    <ul class="menu-nav">
      <li ref="greeting" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'greeting')"
          >Home
        </a>
      </li>

      <li ref="showcase" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'showcase')"
          >Galleries
        </a>
      </li>

      <li ref="about" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'about')"
          >About me
        </a>
      </li>

      <li ref="contact" class="nav-item">
        <a href="#" class="nav-link" @click="$emit('navigate', 'contact')"
          >Contact
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="./menu.js" />
