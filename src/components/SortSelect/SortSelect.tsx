import { SortField, SortOrder } from '@/types/car';

interface SortSelectProps {
    sort: SortField;
    order: SortOrder;
    onChange: (sort: SortField, order: SortOrder) => void;
}

export const SortSelect = ({ sort, order, onChange }: SortSelectProps) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
        onChange(field, order);
    };

    const value = sort && order ? `${sort}-${order}` : 'price-asc';

    return (
        <div className="mb-6">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Сортировать по
            </label>
            <select
                id="sort"
                value={value}
                onChange={handleSortChange}
                className="block px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm
                          focus:outline-none bg-white text-gray-700 transition duration-150 ease-in-out
                          hover:border-gray-400 cursor-pointer"
            >
                <option value="">Не выбрано</option>
                <option value="price-asc" className="text-gray-700">Цена: Низкая к Высокой</option>
                <option value="price-desc" className="text-gray-700">Цена: Высокая к Низкой</option>
            </select>
        </div>
    );
};