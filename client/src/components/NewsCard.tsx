import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatDate } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { NewsItem } from '@/types/api';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2">
        <div className="w-full h-32 mb-2 overflow-hidden rounded-lg bg-muted">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {news.content}
        </p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{formatDate(news.publishDate)}</span>
          <a 
            href={news.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary"
          >
            {news.source}
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
