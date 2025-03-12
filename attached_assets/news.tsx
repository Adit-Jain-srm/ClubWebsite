import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import type { NewsItem } from "@shared/schema";

function NewsItemSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export default function News() {
  const { data: news, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["/api/news"],
  });

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">AI & ML News</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Stay updated with the latest developments in Artificial Intelligence and Machine Learning.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <NewsItemSkeleton key={i} />)
        ) : news?.length === 0 ? (
          <p className="text-muted-foreground text-center col-span-full">
            No news articles available at the moment.
          </p>
        ) : (
          news?.map((item) => (
            <Card key={item.id} className="group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{format(new Date(item.publishDate), "PP")}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
