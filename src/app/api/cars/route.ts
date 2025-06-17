import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://testing-api.ru-rating.ru/cars';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('_page') || '1';
    const limit = searchParams.get('_limit') || '12';
    const sort = searchParams.get('_sort');
    const order = searchParams.get('_order');

    try {
        const url = new URL(API_BASE_URL);
        url.searchParams.set('_limit', limit);
        url.searchParams.set('_page', page);

        if (sort) {
            url.searchParams.set('_sort', sort);
        }
        if (order) {
            url.searchParams.set('_order', order);
        }

        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
            data: data.data,
            meta: {
                current_page: data.meta.current_page,
                from: data.meta.from,
                last_page: data.meta.last_page,
                per_page: data.meta.per_page,
                to: data.meta.to,
                total: data.meta.total
            }
        });
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cars' },
            { status: 500 }
        );
    }
}