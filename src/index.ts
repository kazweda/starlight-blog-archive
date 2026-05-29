import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

export type StarlightBlogArchiveOptions = {
  /** URL prefix for archive pages. Default: 'archive' */
  prefix?: string
  /** Add a sidebar link to the archive index. Default: false */
  sidebar?: boolean
}

export default function starlightBlogArchive(options?: StarlightBlogArchiveOptions): StarlightPlugin {
  const prefix = options?.prefix ?? 'archive'

  return {
    name: 'starlight-blog-archive',
    hooks: {
      'config:setup'({ addIntegration, config: starlightConfig, updateConfig }) {
        if (options?.sidebar) {
          const existing: StarlightUserConfig['sidebar'] = starlightConfig.sidebar ?? []
          updateConfig({
            sidebar: [...existing, { label: 'Archive', link: `/${prefix}/` }],
          })
        }

        addIntegration({
          name: 'starlight-blog-archive-integration',
          hooks: {
            'astro:config:setup': ({ injectRoute }) => {
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
            },
          },
        })
      },
    },
  }
}
