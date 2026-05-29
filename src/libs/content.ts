import { getCollection, type CollectionEntry } from 'astro:content'

export type DocsEntry = CollectionEntry<'docs'>

export type BlogEntry = DocsEntry & {
  data: DocsEntry['data'] & { date: Date }
}

function toBlogEntry(entry: DocsEntry): BlogEntry | undefined {
  const date = (entry.data as Record<string, unknown>)['date']
  if (!(date instanceof Date)) return undefined
  return entry as BlogEntry
}

export async function getArchiveEntriesByYear(): Promise<Map<number, BlogEntry[]>> {
  const docs = await getCollection('docs')

  const byYear = new Map<number, BlogEntry[]>()
  for (const entry of docs) {
    const blogEntry = toBlogEntry(entry)
    if (!blogEntry) continue

    const year = blogEntry.data.date.getFullYear()
    const list = byYear.get(year) ?? []
    list.push(blogEntry)
    byYear.set(year, list)
  }

  for (const [year, entries] of byYear) {
    byYear.set(
      year,
      entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    )
  }

  return byYear
}

export async function getArchiveStaticPaths() {
  const byYear = await getArchiveEntriesByYear()

  return Array.from(byYear.entries()).map(([year, entries]) => ({
    params: { year: String(year) },
    props: { year, entries },
  }))
}
