import type { PropsWithChildren } from "react";
import { ContentLayout } from "@/components/layout/ContentLayout";

export default function StudioLayout({children}: PropsWithChildren) {
  return <ContentLayout>
    {children}
  </ContentLayout>
};