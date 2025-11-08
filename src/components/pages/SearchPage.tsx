'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Frown, Film } from 'lucide-react';
import type { AppDispatch, RootState } from '../../lib/redux/store';
import { fetchAnimeSearch, setQuery, setCurrentPage } from '../../lib/redux/slices/animeSlice';
import { useToast } from '../../hooks/use-toast';
import { Input } from '@/components/ui/input';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { AnimeCardSkeleton } from '@/components/anime/AnimeCardSkeleton';
import { PaginationControls } from '@/components/anime/PaginationControls';

export function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { animes, pagination, status, error, query, currentPage } = useSelector((state: RootState) => state.anime);
  
  const [localQuery, setLocalQuery] = useState(query);
  const { toast } = useToast();
  
  const initialLoadRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (status === 'failed' && error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
    }
  }, [status, error, toast]);

  const debouncedFetch = useCallback(() => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    
    if (localQuery.trim() === '') {
        if (query) dispatch(setQuery(''));
        return;
    }
    
    if (localQuery !== query) {
        dispatch(setQuery(localQuery));
    }
    
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
    
    dispatch(fetchAnimeSearch({ query: localQuery, page: 1 }, { signal: newAbortController.signal }));
  }, [localQuery, query, dispatch]);

  useEffect(() => {
    if(initialLoadRef.current){
        initialLoadRef.current = false;
        return;
    }
    const handler = setTimeout(() => {
      debouncedFetch();
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, debouncedFetch]);


  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
    dispatch(fetchAnimeSearch({ query, page: newPage }, { signal: newAbortController.signal }));
    window.scrollTo(0, 0);
  };
  
  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (status === 'succeeded' && animes.length > 0) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      );
    }
    
    if (status === 'succeeded' && localQuery.length > 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <Frown className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">No Results Found</h2>
            <p className="text-muted-foreground">Try searching for something else.</p>
        </div>
      );
    }

    if (status === 'idle' && localQuery.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Film className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-2xl font-semibold">Explore Anime</h2>
                <p className="text-muted-foreground">Start by typing in the search box above.</p>
            </div>
        );
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-background text-foreground container mx-auto px-4 py-8">
      
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl font-bold text-primary">Anime Explorer</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your next favorite show</p>
      </header>
      
      <div className="relative mx-auto mb-8 max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for an anime..."
          className="h-12 w-full rounded-full bg-card pl-10 text-base shadow-lg"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </div>

      <div className="min-h-[50vh]">
        {renderContent()}
      </div>

      {status === 'succeeded' && pagination && pagination.items.total > 0 && (
        <div className="mt-8 flex justify-center">
          <PaginationControls
            currentPage={currentPage}
            totalPages={pagination.last_visible_page}
            onPageChange={handlePageChange}
            hasNextPage={pagination.has_next_page}
          />
        </div>
      )}
    </main>
  );
}
