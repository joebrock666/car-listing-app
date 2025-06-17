'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useCars } from '@/hooks/useCars';
import { CarCard } from '@/components/CarCard/CarCard';
import { SortSelect } from '@/components/SortSelect/SortSelect';
import { Pagination } from '@/components/Pagination/Pagination';
import { CarCardSkeleton } from "@/components/CarCard/CarCardSkeleton";
import {SortField, SortOrder} from "@/types/car";

function CarsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const page = parseInt(searchParams.get('_page') || '1', 10);
    const sort = searchParams.get('_sort') || '';
    const order = searchParams.get('_order') || '';

    const {
        cars,
        loading,
        error,
        meta,
        setSort,
        setOrder,
        setPage
    } = useCars({
        initialPage: page,
        initialSort: sort as SortField,
        initialOrder: order as SortOrder,
    });

    useEffect(() => {
        const params = new URLSearchParams();
        if (page > 1) params.set('_page', page.toString());
        if (sort) params.set('_sort', sort);
        if (order) params.set('_order', order);

        router.push(`?${params.toString()}`, { scroll: false });
    }, [page, sort, order, router]);

    const handleSortChange = (newSort: SortField, newOrder: SortOrder) => {
        setSort(newSort);
        setOrder(newOrder);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`?_page=${newPage}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const validSort = (sort === 'price' || sort === 'year' || sort === '') ? sort : '';
    const validOrder = (order === 'asc' || order === 'desc') ? order : 'asc';

  if (loading && !cars.length) {
    return (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <CarCardSkeleton key={index} />
            ))}
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center py-12 text-red-600">
          Error loading cars: {error.message}
        </div>
    );
  }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Авто в наличии</h1>

        <SortSelect
            sort={validSort}
            order={validOrder}
            onChange={handleSortChange}
        />

        {cars.length === 0 ? (
            <div className="text-center py-12">Авто не найдено</div>
        ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                    <CarCard key={car.unique_id} car={car} />
                ))}
              </div>

              {meta && meta.totalPages > 1 && (
                  <Pagination
                      currentPage={page}
                      totalPages={meta.totalPages}
                      onPageChange={handlePageChange}
                  />
              )}
            </>
        )}
      </div>
  );
}

export default function Home() {
  return (
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <CarsContent />
      </Suspense>
  );
}