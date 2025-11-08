import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export function AnimeCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-[2/3] w-full" />
      </CardContent>
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="mt-1 h-6 w-1/2 rounded-md" />
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-5 w-1/3 rounded-md" />
      </CardFooter>
    </Card>
  );
}