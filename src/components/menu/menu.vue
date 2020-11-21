<template>
  <div class="menu">
    <ul class="menu-nav">
      <li ref="greeting" class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'greeting')"
          >Home
        </a>
      </li>

      <li ref="showcase" class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'showcase')"
          >Galerie
        </a>
      </li>

      <li ref="about" class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'about')"
          >O mnie
        </a>
      </li>

      <li ref="contact" class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'contact')"
          >Kontakt
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="./menu.js" />
