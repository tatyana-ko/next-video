import { Skeleton } from "@/ui/skeleton/Skeleton";

export function SkeletonUploadForm() {
  return <>
    <div>
      <Skeleton quantity={1} className="h-[70]" />
      <Skeleton quantity={1} className="h-[300]" />
      <Skeleton quantity={1} className="h-[70]" />
    </div>

    <div>
      <Skeleton quantity={1} className="h-[140]" />
    </div>
  </>
}
