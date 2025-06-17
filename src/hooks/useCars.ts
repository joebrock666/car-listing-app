import {useState, useEffect, useCallback} from 'react';
import { carRepository } from '@/repositories/carRepository';
import { CarsQueryParams, CarsResponse, SortField, SortOrder } from '@/types/car';

interface UseCarsProps {
    initialPage?: number;
    initialSort?: SortField;
    initialOrder?: SortOrder;
}

export const useCars = ({
                            initialPage = 1,
                            initialSort = '',
                            initialOrder = ''
                        }: UseCarsProps = {}) => {
    const [data, setData] = useState<CarsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(initialPage);
    const [sort, setSort] = useState<SortField>(initialSort);
    const [order, setOrder] = useState<SortOrder>(initialOrder);

    const fetchCars = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params: CarsQueryParams = {
                _page: page,
                _limit: 12,
            };

            if (sort) {
                params._sort = sort;
                if (order) {
                    params._order = order;
                } else {
                    params._order = 'asc';
                }
            }

            const response = await carRepository.getCars(params);
            setData(response);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [page, sort, order]);

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (page > 1) queryParams.set('_page', String(page));
        if (sort) queryParams.set('_sort', sort);
        if (order) queryParams.set('_order', order);

        const queryString = queryParams.toString();
        const newUrl = queryString ? `?${queryString}` : '/';
        window.history.pushState({}, '', newUrl);
    }, [page, sort, order]);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    return {
        cars: data?.items || [],
        meta: data?.meta,
        loading,
        error,
        page,
        setPage,
        sort,
        setSort,
        order,
        setOrder,
        refetch: fetchCars,
    };
};