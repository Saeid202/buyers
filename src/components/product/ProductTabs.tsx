"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProductTabsProps = {
  description: string;
  tags: string[];
};

export function ProductTabs({ description, tags }: ProductTabsProps) {
  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="description" className="w-full">
        <div className="border-b border-neutral-200 px-4">
          <TabsList className="h-auto w-full justify-start bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-purple-700 data-[state=active]:bg-transparent"
            >
              معرفی محصول
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-purple-700 data-[state=active]:bg-transparent"
            >
              نظرات
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-4">
          <TabsContent value="description" className="mt-0 space-y-3">
            <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 border-t border-neutral-100 pt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-neutral-500">
                هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
