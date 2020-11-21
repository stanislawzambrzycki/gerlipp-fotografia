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
<<<<<<< HEAD
          @click="$emit('navigate', 'showcase')"
          >Galerie
=======
          @click="$emit('navigate', 'gallery'), toggleMenu()"
          >Gallery
>>>>>>> bd2b0c57f2f60e78c9cf819198843e54fecc65be
        </a>
      </li>

      <li ref="about" class="nav-item">
        <a
          href="#"
          class="nav-link"
<<<<<<< HEAD
          @click="$emit('navigate', 'about')"
          >O mnie
=======
          @click="$emit('navigate', 'about'), toggleMenu()"
          >About
>>>>>>> bd2b0c57f2f60e78c9cf819198843e54fecc65be
        </a>
      </li>

      <li ref="contact" class="nav-item">
        <a
          href="#"
          class="nav-link"
<<<<<<< HEAD
          @click="$emit('navigate', 'contact')"
          >Kontakt
=======
          @click="$emit('navigate', 'contact'), toggleMenu()"
          >Contact
>>>>>>> bd2b0c57f2f60e78c9cf819198843e54fecc65be
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="./menu.js" />
