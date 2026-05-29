/// <reference types="astro/client" />

// Stubs for Starlight virtual modules used in transitive type-checking
declare module 'virtual:starlight/user-config' {
  import type { StarlightConfig } from '@astrojs/starlight/types'
  const config: StarlightConfig
  export default config
}

declare module 'virtual:starlight/project-context' {
  const context: { root: string | URL; srcDir: string | URL; [key: string]: unknown }
  export default context
}

declare module 'virtual:starlight/plugin-translations' {
  const translations: Record<string, Record<string, string>>
  export default translations
}

// Vite raw import for .jsonc files (used in starlight/expressive-code)
declare module '*.jsonc?raw' {
  const content: string
  export default content
}

// Global namespace expected by Starlight's translation system
declare namespace StarlightApp {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface I18n {}
}
