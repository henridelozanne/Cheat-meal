<template>
  <p class="content">

    Your username is {{ $root.user.username }} <br>
    Your name is {{ $root.user.name }} <br>
    Your hash is {{ $root.user.hash }} <br>
    Your salt is {{ $root.user.salt }}
  </p>
</template>

<script>
import api from "../api";

export default {};
</script>
