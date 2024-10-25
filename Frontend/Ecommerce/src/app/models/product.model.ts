import { Category } from '../enum/category.enum';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    category: Category;
    incart: number;
}