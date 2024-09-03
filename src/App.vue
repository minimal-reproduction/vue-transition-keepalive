<script setup lang="ts">
import useKeepAliveStore from './pinia/keepAlive'

const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <div>
    <button @click="$router.push('/')">One</button>
    <button @click="$router.push('/two')">Two</button>
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <KeepAlive :include="keepAliveStore.list">
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
    <hr>
    keepAlive: {{ keepAliveStore.list }}
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: 0.2s;
}

.fade-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>