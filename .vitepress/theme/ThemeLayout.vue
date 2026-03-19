<template>
  <Layout>
    <template #doc-footer-before />
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watch, onMounted, onBeforeUnmount } from 'vue'
import PostInfoItem from '../../src/components/PostInfoItem.vue'
import type { IAd, IAdsense } from '../../src/types'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const updateBodyClass = (hide: boolean) => {
  if (hide) {
    document.body.classList.add('hide-locale-switcher')
  } else {
    document.body.classList.remove('hide-locale-switcher')
  }
}

onMounted(() => {
  updateBodyClass(frontmatter.value.hideLocaleSwitcher)
})

const stopWatch = watch(
  () => frontmatter.value.hideLocaleSwitcher,
  (hide) => {
    updateBodyClass(hide)
  }
)

onBeforeUnmount(() => {
  stopWatch()
})
</script>
