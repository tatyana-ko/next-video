import type { PropsWithChildren } from "react";
import { ContentLayout } from "@/components/layout/ContentLayout";

export default function PublicLayout({children}: PropsWithChildren) {
  return <ContentLayout>
    {children}
  </ContentLayout>
};