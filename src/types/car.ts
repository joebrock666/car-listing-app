export interface Car {
    mark_id: string;
    folder_id: string;
    modification_id?: string;
    complectation_name?: string;
    body_type?: string;
    price?: number;
    year?: number;
    images?: {
        image: string[];
    };
    unique_id: string | number;
    // Add other fields as needed
}

export interface ApiMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface ApiResponse {
    data: Car[];
    meta: ApiMeta;
}

export interface CarsResponse {
    items: Car[];
    meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    };
}

export type SortOrder = 'asc' | 'desc' | '';
export type SortField = 'price' | 'year' | '';

export interface CarsQueryParams {
    _page?: number;
    _limit?: number;
    _sort?: SortField;
    _order?: 'asc' | 'desc';
}