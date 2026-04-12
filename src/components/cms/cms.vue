<template>
  <v-app>
    <v-card class="cms pa-0" v-if="validUser">
      <menuCMS @navigate="navigate($event)" ref="menu" />

      <v-btn
        ref="menubtn"
        fixed
        top
        right
        icon
        fab
        class="menu-btn"
        @click.stop="toggleMenu"
        ><v-icon large>menu</v-icon></v-btn
      >
      <transition name="fade" mode="out-in">
        <galleriesCMS v-if="showComponent.galleries" />
        <editsCMS v-if="showComponent.about" />
      </transition>
    </v-card>
    <v-container v-else fill-height class="cms-state">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="6" lg="5">
          <v-card outlined class="pa-6 text-center">
            <v-progress-circular
              v-if="isResolvingAccess"
              indeterminate
              color="primary"
              size="40"
              class="mb-4"
            />

            <h2 class="text-h5 mb-3">Admin Panel</h2>

            <p v-if="isResolvingAccess" class="mb-0">
              Checking authentication and admin permissions.
            </p>

            <template v-else-if="needsLogin">
              <p class="mb-4">
                Sign in with a Google account that has admin access to open the CMS.
              </p>
              <v-btn color="primary" @click="startAdminLogin()">Sign in with Google</v-btn>
            </template>

            <template v-else>
              <p class="mb-4">
                Your Google account is signed in, but it is not listed in the admin allowlist.
              </p>
              <p v-if="currentUser && currentUser.email" class="caption mb-4">
                Current account: {{ currentUser.email }}
              </p>
              <v-btn text color="primary" @click="navigateHome()">Go back home</v-btn>
              <v-btn color="primary" class="ml-2" @click="logoutAndRetry()">Use another account</v-btn>
            </template>

            <v-alert v-if="authError" type="error" outlined dense class="mt-4 mb-0 text-left">
              {{ authError }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./cms.js" />

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
