import Image from 'next/image';
import { Car } from '@/types/car';
import { formatPrice } from '@/lib/utils/format';

interface CarCardProps {
    car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
    const imageUrl = car.images?.image?.[0] || '/default-car.jpeg';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={`${car.mark_id} ${car.folder_id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {car.mark_id} {car.folder_id}
                </h3>
                {car.year && <p className="text-gray-600 mt-1">{car.year} год</p>}
                {car.price && (
                    <div className="mt-3">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(car.price)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};