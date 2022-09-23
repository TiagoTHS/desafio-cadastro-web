<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ContentItem",
};
</script>

<style>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  padding: 20px;
}
</style>
