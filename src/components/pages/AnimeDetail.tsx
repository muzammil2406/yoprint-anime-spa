import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Tv, Clapperboard, Calendar, Users, Heart } from "lucide-react";
import type { JikanAnimeResponse } from "../../lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data: JikanAnimeResponse = await res.json();
        setAnime(data.data);
      } catch {
        setAnime(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading anime details...</div>;
  }

  if (!anime) {
    return <div className="p-8 text-center text-lg">Anime not found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                className="h-auto w-full object-cover"
              />
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="font-headline text-4xl font-bold">{anime.title}</h1>
          <h2 className="mb-4 text-lg text-muted-foreground">{anime.title_japanese}</h2>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{anime.score ?? "N/A"}</span>
              <span className="text-sm text-muted-foreground">
                ({anime.scored_by?.toLocaleString() ?? 0} users)
              </span>
            </div>
            {anime.rank && <Badge variant="secondary">Rank #{anime.rank}</Badge>}
            {anime.popularity && <Badge variant="secondary">Popularity #{anime.popularity}</Badge>}
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">Synopsis</h3>
            <p className="text-foreground/80">{anime.synopsis ?? "No synopsis available."}</p>
          </div>

          <Separator className="my-6" />

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clapperboard className="h-4 w-4 text-muted-foreground" />
                  <strong>Type:</strong> {anime.type}
                </div>
                <div className="flex items-center gap-2">
                  <Tv className="h-4 w-4 text-muted-foreground" />
                  <strong>Episodes:</strong> {anime.episodes ?? "N/A"}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <strong>Aired:</strong> {anime.aired?.string}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <strong>Members:</strong> {anime.members?.toLocaleString() ?? "N/A"}
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <strong>Favorites:</strong> {anime.favorites?.toLocaleString() ?? "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="mb-2 text-xl font-semibold">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre: any) => (
                <Badge key={genre.mal_id} variant="outline">{genre.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
