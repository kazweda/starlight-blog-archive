import type { ViteUserConfig } from 'astro'

export interface StarlightBlogArchiveConfig {
  prefix: string
  title: string
}

const virtualModuleId = 'virtual:starlight-blog-archive/config'

export function vitePluginStarlightBlogArchiveConfig(config: StarlightBlogArchiveConfig): VitePlugin {
  const resolved = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-starlight-blog-archive',
    resolveId(id) {
      return id === virtualModuleId ? resolved : undefined
    },
    load(id) {
      return id === resolved ? `export default ${JSON.stringify(config)}` : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
