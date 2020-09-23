<template>
  <div class="home">
    <div class="presentation-container">
      <h2>Nature lifestyle</h2>
      <p>
        Aenean lacinia lorem nec sem porttitor, non facilisis neque maximus.
        Nunc lectus justo, vestibulum eu auctor id, iaculis placerat enim. Cras
        pellentesque arcu sit amet eros ultrices posuere. Nunc non nunc commodo,
        sollicitudin magna at, lobortis augue. Duis non feugiat diam.
      </p>
    </div>
    <img
      class="img-background-home"
      src="https://cdn.discordapp.com/attachments/312287239642284033/744599856932192347/om_si_urs_spercafinisat.png"
    />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home"
};
</script>

<style lang="less" scoped>
.home {
  display: block;
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}
.presentation-container {
  position: absolute;
  width: 500px;
  top: 200px;
  left: 100px;
}

.img-background-home {
  width: 1000px;
  position: absolute;
  bottom: 50px;
  right: 100px;
}
</style>
