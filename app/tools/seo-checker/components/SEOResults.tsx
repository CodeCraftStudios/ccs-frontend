'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FileText,
  BookOpen,
  Hash,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react'
import { SEOResults as SEOResultsType } from '../types'
import { ScoreGauge } from './ScoreGauge'

interface SEOResultsProps {
  results: SEOResultsType
}

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A': return 'text-green-500'
    case 'B': return 'text-blue-500'
    case 'C': return 'text-yellow-500'
    case 'D': return 'text-orange-500'
    case 'F': return 'text-red-500'
    default: return 'text-muted-foreground'
  }
}

export function SEOResults({ results }: SEOResultsProps) {
  return (
    <>
      {/* Overall Score */}
      <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8">
            {/* Score Gauge */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
              <ScoreGauge score={results.score.total} />
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="text-center md:text-left">
                  <div className={`text-5xl font-bold ${getGradeColor(results.score.grade)} mb-2`}>
                    Grade: {results.score.grade}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {results.score.total >= 90 && "Excellent! Your content is well-optimized."}
                    {results.score.total >= 80 && results.score.total < 90 && "Great! Minor improvements needed."}
                    {results.score.total >= 70 && results.score.total < 80 && "Good! Some optimization needed."}
                    {results.score.total >= 60 && results.score.total < 70 && "Fair. Needs improvement."}
                    {results.score.total < 60 && "Needs work. Follow recommendations below."}
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-red-500 mb-1">
                      <XCircle className="w-5 h-5" />
                      <span className="text-2xl font-bold">{results.score.errors}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-yellow-500 mb-1">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-2xl font-bold">{results.score.warnings}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Errors, Warnings, Recommendations */}
      <div className="grid gap-4 md:grid-cols-3">
        {results.errors.length > 0 && (
          <Card className="border-red-500/50 bg-red-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-red-500">
                <XCircle className="w-4 h-4" />
                Errors ({results.errors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.errors.map((err, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {results.warnings.length > 0 && (
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-yellow-500">
                <AlertTriangle className="w-4 h-4" />
                Warnings ({results.warnings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.warnings.map((warn, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {results.recommendations.length > 0 && (
          <Card className="border-blue-500/50 bg-blue-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-blue-500">
                <Lightbulb className="w-4 h-4" />
                Tips ({results.recommendations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Analysis Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Readability */}
        <Card className="border-border/50">
          <CardHeader className="bg-accent/30">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Readability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Word Count:</span>
              <span className="font-semibold">{results.readability.word_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sentences:</span>
              <span className="font-semibold">{results.readability.sentence_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paragraphs:</span>
              <span className="font-semibold">{results.readability.paragraph_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Sentence Length:</span>
              <span className="font-semibold">{results.readability.avg_sentence_length} words</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reading Time:</span>
              <span className="font-semibold">{results.readability.reading_time_minutes} min</span>
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        {results.keywords && results.keywords.target_keyword && (
          <Card className="border-border/50">
            <CardHeader className="bg-accent/30">
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Keyword Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Target Keyword:</div>
                <div className="font-semibold bg-muted/30 p-2 rounded">
                  {results.keywords.target_keyword}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Occurrences:</span>
                <span className="font-semibold">{results.keywords.keyword_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Density:</span>
                <span className="font-semibold">{results.keywords.keyword_density}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">In Introduction:</span>
                {results.keywords.keyword_in_intro ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Structure */}
        <Card className={`border-border/50 ${results.keywords && results.keywords.target_keyword ? '' : 'md:col-span-2'}`}>
          <CardHeader className="bg-accent/30">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Content Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/30 p-3 rounded text-center">
                <div className="font-semibold text-xl">{results.structure.h1_count}</div>
                <div className="text-muted-foreground text-xs">H1 Headings</div>
              </div>
              <div className="bg-muted/30 p-3 rounded text-center">
                <div className="font-semibold text-xl">{results.structure.h2_count}</div>
                <div className="text-muted-foreground text-xs">H2 Headings</div>
              </div>
              <div className="bg-muted/30 p-3 rounded text-center">
                <div className="font-semibold text-xl">{results.structure.h3_count}</div>
                <div className="text-muted-foreground text-xs">H3 Headings</div>
              </div>
            </div>

            {results.structure.h1_texts.length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-2">H1 Headings:</div>
                {results.structure.h1_texts.map((text, idx) => (
                  <div key={idx} className="text-sm bg-muted/30 p-2 rounded mb-1">
                    {text}
                  </div>
                ))}
              </div>
            )}

            {results.structure.h2_texts.length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-2">H2 Headings:</div>
                {results.structure.h2_texts.map((text, idx) => (
                  <div key={idx} className="text-xs bg-muted/30 p-2 rounded mb-1">
                    {text}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}