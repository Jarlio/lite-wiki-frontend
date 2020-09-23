<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <a class="uk-navbar-item uk-logo" href="#">Out</a>
    </div>

    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li class="uk-active">
          <a href="#">
            <router-link to="/">Home</router-link>
          </a>
        </li>
        <li class="uk-active">
          <a href="#">
            <router-link to="/about">About</router-link>
          </a>
        </li>
        <li class="uk-active">
          <a href="#">
            <router-link to="/nodeAdmin">NodeAdmin</router-link>
          </a>
        </li>
        <li class="uk-active">
          <a href="#offcanvas-usage" uk-toggle>Options</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="less">
.uk-navbar-container:not(.uk-navbar-transparent) {
  background: transparent;
}
</style>
