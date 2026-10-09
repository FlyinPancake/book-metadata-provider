import { Temporal } from "temporal-polyfill";
import type { components } from "../api/schema";

export type MediaType = "audiobook" | "book" | "unknown";
export type PublicationDate = { year: number } | { year: number; month: number; day: number };

export interface SeriesMetadata {
  name: string;
  // this field is a string instead of a number to avoid issues with sequence numbers like 0.3
  sequence?: string;
}

export class MediaMetadata {
  title: string;
  subtitle?: string;
  mediaType: MediaType = "unknown";
  authors?: string[] = [];
  narrators?: string[] = [];
  publisher?: string;
  published?: PublicationDate;
  description?: string;
  coverUrl?: string;
  isbn13?: string;
  isbn10?: string;
  asin?: string;
  genres?: string[];
  tags?: string[];
  series: SeriesMetadata[];
  language?: string;
  /**
   * Duration in minutes (only applies to audiobooks)
   */
  duration?: number;

  constructor(raw: components["schemas"]["BookMetadata"]) {
    this.title = raw.title;
    this.subtitle = raw.subtitle;
    this.mediaType = raw.mediaType ?? "unknown";

    if (!raw.authors && raw.author) this.authors = [raw.author];
    else this.authors = raw.authors;

    if (!raw.narrators && raw.narrator) this.narrators = [raw.narrator];
    else this.narrators = raw.narrators;

    this.publisher = raw.publisher;

    if (raw.publishedDate) {
      const date = Temporal.PlainDate.from(raw.publishedDate);
      this.published = { year: date.year, month: date.month, day: date.day };
    } else if (raw.publishedYear) {
      this.published = { year: Number(raw.publishedYear) };
    }

    this.description = raw.description;
    this.coverUrl = raw.cover;
    this.isbn13 = raw.isbn13 ? raw.isbn13 : raw.isbn?.length == 13 ? raw.isbn : undefined;
    this.isbn10 = raw.isbn10 ? raw.isbn10 : raw.isbn?.length == 10 ? raw.isbn : undefined;
    this.asin = raw.asin;
    this.genres = raw.genres;
    this.tags = raw.tags;
    this.series =
      raw.series?.map((series) => {
        return { name: series.series, sequence: series.sequence };
      }) ?? [];
    this.language = raw.language;
    this.duration = raw.duration;
  }
}
