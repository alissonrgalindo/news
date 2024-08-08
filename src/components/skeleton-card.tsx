import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard: React.FC = () => (
  <div className="flex flex-col space-y-3 p-4 border-b">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/4" />
  </div>
);
export default SkeletonCard;
