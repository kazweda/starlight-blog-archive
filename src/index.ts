import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'
import { vitePluginStarlightBlogArchiveConfig } from './libs/vite'

export type StarlightBlogArchiveOptions = {
  /** URL prefix for archive pages. Default: 'archive' */
  prefix?: string
  /** Title for the archive index page. Default: 'Archive' */
  title?: string
  /** Add a sidebar link to the archive index. Default: false */
  sidebar?: boolean
}

export default function starlightBlogArchive(options?: StarlightBlogArchiveOptions): StarlightPlugin {
  const prefix = options?.prefix ?? 'archive'
  const title = options?.title ?? 'Archive'

  return {
    name: 'starlight-blog-archive',
    hooks: {
      'config:setup'({ addIntegration, config: starlightConfig, updateConfig }) {
        if (options?.sidebar) {
          const existing: StarlightUserConfig['sidebar'] = starlightConfig.sidebar ?? []
          updateConfig({
            sidebar: [...existing, { label: title, link: `/${prefix}/` }],
          })
        }

        addIntegration({
          name: 'starlight-blog-archive-integration',
          hooks: {
            'astro:config:setup': ({ injectRoute, updateConfig: updateAstroConfig }) => {
              injectRoute({
                entrypoint: 'starlight-blog-archive/routes/ArchiveIndex.astro',
                pattern: `/${prefix}`,
                prerender: true,
              })
              injectRoute({
                entrypoint: 'starlight-blog-archive/routes/ArchiveYear.astro',
                pattern: `/${prefix}/[year]`,
                prerender: true,
              })
              updateAstroConfig({
                vite: {
                  plugins: [vitePluginStarlightBlogArchiveConfig({ prefix, title })],
                },
              })
            },
          },
        })
      },
    },
  }
}
