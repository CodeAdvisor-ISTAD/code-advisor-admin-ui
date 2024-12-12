import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building, FileType, User, NotebookPen } from 'lucide-react';
import React from 'react';
import { fakeForum, fakeArticle } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';

export default async function TotalBarComponent({
  searchParams ={} // make the searchParams optional ?
}: {
  searchParams?: { [key: string]: string | string[] | undefined } // make the searchParams optional ? 
}) {

  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('q');
  // const status = searchParamsCache.get('status');
  // const pageLimit = searchParamsCache.get('limit');

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const search = searchParams.q as string;
  const status = searchParams.status as string;
  const pageLimit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10;

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status: status })
  };

  // mock api user
  const forumData = await fakeForum.getForums(filters);
  const totalForums = forumData.total_forums;

  const articleData = await fakeArticle.getArticles(filters);
  const totalArticles = articleData.total_articles;

  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Forum Question
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalForums}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          <FileType className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArticles}</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reports</CardTitle>
          <NotebookPen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}
