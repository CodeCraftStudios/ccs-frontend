export interface SEOResults {
  readability: {
    word_count: number
    sentence_count: number
    paragraph_count: number
    avg_sentence_length: number
    avg_word_length: number
    reading_time_minutes: number
  }
  keywords: {
    target_keyword: string
    keyword_count: number
    keyword_density: number
    keyword_in_intro: boolean
  }
  structure: {
    h1_count: number
    h2_count: number
    h3_count: number
    h1_texts: string[]
    h2_texts: string[]
  }
  score: {
    total: number
    errors: number
    warnings: number
    grade: string
  }
  errors: string[]
  warnings: string[]
  recommendations: string[]
}