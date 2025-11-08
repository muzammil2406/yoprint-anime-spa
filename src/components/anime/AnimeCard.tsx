import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import type { Anime } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>

        <CardHeader className="p-4">
          <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary">
            {anime.title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-foreground">{anime.score ?? "N/A"}</span>
            <span>•</span>
            <span>{anime.type}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
