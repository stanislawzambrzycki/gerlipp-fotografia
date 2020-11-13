<template>
  <div class="menu">
    <ul class="menu-nav">
      <li :class="main ? 'nav-item current' : 'nav-item'">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'home'), toggleMenu()"
          >Home
        </a>
      </li>

      <li :class="products ? 'nav-item current' : 'nav-item'">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'gallery'), toggleMenu()"
          >Galerie
        </a>
      </li>

      <li :class="about ? 'nav-item current' : 'nav-item'">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'about'), toggleMenu()"
          >O mnie
        </a>
      </li>

      <li :class="contact ? 'nav-item current' : 'nav-item'">
        <a
          href="#"
          class="nav-link"
          @click="$emit('navigate', 'contact'), toggleMenu()"
          >Kontakt
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="./menu.js" />
