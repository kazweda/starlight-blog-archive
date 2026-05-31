# starlight-blog-archive

Automatic yearly archive pages for [Starlight](https://starlight.astro.build/) blogs using [starlight-blog](https://github.com/HiDeoo/starlight-blog).

## Installation

```bash
npm install starlight-blog-archive
```

## Usage

Add the plugin to your Starlight configuration in `astro.config.mjs`:

```ts
import starlight from '@astrojs/starlight'
import starlightBlog from 'starlight-blog'
import starlightBlogArchive from 'starlight-blog-archive'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightBlog(),
        starlightBlogArchive(),
      ],
    }),
  ],
})
```

This generates the following pages automatically:

| URL | Content |
|-----|---------|
| `/archive/` | List of all years with post counts |
| `/archive/[year]/` | Posts published in that year, sorted by date descending |

## Options

```ts
starlightBlogArchive({
  prefix: 'archive',  // URL prefix for archive pages. Default: 'archive'
  sidebar: true,      // Add a link to /archive/ in the Starlight sidebar. Default: false
})
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `'archive'` | URL prefix for archive pages |
| `sidebar` | `boolean` | `false` | Add a link to the archive index in the Starlight sidebar |

## Behavior

### All posts with a `date` field are included

The plugin targets **every document in the `docs` collection that has a `date` field**, regardless of whether a static archive page existed before. This means:

- If you are migrating from hand-written `archive/YYYY/index.md` files and some years were missing, the plugin will generate pages for those years automatically.
- A post with `date: 2015-03-01` will create `/archive/2015/` even if that year had no static page before.

To verify which years will be generated before removing static pages, run a production build and check the output.
