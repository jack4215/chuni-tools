<script lang="ts">
    import { onMount } from "svelte"
    import { language, theme } from "@/common/config"
    import { saveLanguage } from "@/common/lang"
    import { t, translationNames } from "../store"
    import Intro from "./Intro.svelte"
    import HowToUse from "./HowToUse.svelte"
    import Footer from "@/common/components/Footer.svelte"
    import Usages from "./Usages.svelte"

    onMount(() => {
        saveLanguage($language)
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="./common/styles/common.css" />
    <link rel="stylesheet" href="./common/styles/theme-{$theme}.css" />
    <title>{$t("main.title")}</title>
</svelte:head>

<main>
    <p><Intro /></p>
    <p><Usages /></p>
    <p><HowToUse /></p>
</main>
<Footer {t} {translationNames} />

<style lang="sass">
    :global(img)
        max-width: 100%
        max-height: 50vh
        display: block
        margin: 1em auto
        border-radius: 1em
    main
        padding: 2em
        max-width: 600px
        margin: auto
</style>
