import DefaultTheme from 'vitepress/theme'
import SocialLinks from './components/SocialLinks.vue'
import PrelimTable from './components/PrelimTable.vue'
import EndEventTable from './components/EndEventTable.vue'
import SongTable from './components/SongTable.vue'
import EventTable from './components/EventTable.vue'
import ApiStatus from './components/ApiStatus.vue'
import ChuniStats from './components/ChuniStats.vue'
import './custom.css'
import MinimalismTheme from '../../src'
import ThemeLayout from './ThemeLayout.vue'

export default {
  ...DefaultTheme,
  extends: MinimalismTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('SocialLinks', SocialLinks)
    app.component('PrelimTable', PrelimTable)
    app.component('EndEventTable', EndEventTable)
    app.component('EventTable', EventTable)
    app.component('ApiStatus', ApiStatus)
    app.component('SongTable', SongTable)
    app.component('ChuniStats', ChuniStats)
  }
}

