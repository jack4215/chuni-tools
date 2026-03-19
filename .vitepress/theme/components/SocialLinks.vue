<template>
  <div class="social-buttons">
    <a
        v-for="(social, index) in socials"
        :key="index"
        :href="social.link"
        class="social-button"
        :style="{ '--bg': social.bgColor }"
        target="_blank"
        rel="noopener"
    >
      <span class="icon" v-html="social.icon" />
      <span class="label">{{ social.label }}</span>
    </a>
  </div>

  <div class="privacy-policy-link">
    <a :href="privacyPolicyLink" rel="noopener">Privacy Policy</a>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()

const privacyPolicyLink = computed(() => {
  return lang.value === 'en-US' ? '/en/privacy-policy' : '/privacy-policy';
});

const socials = [
  {
    label: 'FT - TAKAO',
    link: 'https://www.facebook.com/fttakao',
    bgColor: '#1877F2',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17"><path fill="white" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  },
 /* {
    label: '競音殿堂',
    link: 'https://www.facebook.com/RhythmArenaTW',
    bgColor: '#1877F2',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17"><path fill="white" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  },
  {
    label: '競音殿堂',
    link: 'https://www.youtube.com/@RhythmArenaTW',
    bgColor: '#E83534',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17"><path fill="white" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    label: 'discord',
    link: 'https://discord.com',
    bgColor: '#5865F2',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17"><path fill="white" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>`,
  },*/
];
</script>

<style scoped>
.social-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 10rem;
}
.social-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
  background-color: var(--bg);
}
.social-button:hover {
  color: white;
  filter: brightness(0.95);
}
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.label {
  white-space: nowrap;
  font-size: 0.9rem;
}
@media (max-width: 480px) {
  .social-button {
    flex: 0 0 auto;
    width: 70%;
    justify-content: center;
  }
}
.privacy-policy-link {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
}
.privacy-policy-link a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
}
.privacy-policy-link a:hover {
  color: var(--vp-c-text-1);
}
</style>
