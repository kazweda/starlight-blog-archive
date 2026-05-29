import { getCollection, type CollectionEntry } from 'astro:content'

export type DocsEntry = CollectionEntry<'docs'>

function getEntryDate(entry: DocsEntry): Date | undefined {
  const date = (entry.data as Record<string, unknown>)['date']
  return date instanceof Date ? date : undefined
}

export async function getArchiveEntriesByYear(): Promise<Map<number, DocsEntry[]>> {
  const docs = await getCollection('docs')

  const byYear = new Map<number, DocsEntry[]>()
  for (const entry of docs) {
    const date = getEntryDate(entry)
    if (!date) continue

    const year = date.getFullYear()
    const list = byYear.get(year) ?? []
    list.push(entry)
    byYear.set(year, list)
  }

  for (const [year, entries] of byYear) {
    byYear.set(
      year,
      entries.sort((a, b) => {
        const da = getEntryDate(a)!
        const db = getEntryDate(b)!
        return db.getTime() - da.getTime()
      }),
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
