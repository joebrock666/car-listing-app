import { apiClient } from '@/lib/api/client';
import { Car, CarsResponse, CarsQueryParams, ApiResponse } from '@/types/car';

const CARS_ENDPOINT = '/cars';
const ITEMS_PER_PAGE = 12;

export const carRepository = {
    async getCars(params: CarsQueryParams = {}): Promise<CarsResponse> {
        // Set default values
        const queryParams: CarsQueryParams = {
            _page: 1,
            _limit: ITEMS_PER_PAGE,
            ...params,
        };

        try {
            const response = await apiClient.get<ApiResponse>(CARS_ENDPOINT, {
                params: queryParams,
            });

            // Transform the response to match our expected structure
            const items = response.data || [];

            // Add default image if none is provided
            const itemsWithImages = items.map(car => ({
                ...car,
                images: car.images || { image: ['/default-car.jpeg'] }
            }));

            return {
                items: itemsWithImages,
                meta: {
                    currentPage: response.meta.from,
                    itemsPerPage: response.meta.to,
                    totalItems: response.meta.total,
                    totalPages: response.meta.last_page
                }
            };
        } catch (error) {
            console.error('Error in carRepository.getCars:', error);
            throw error;
        }
    },
};