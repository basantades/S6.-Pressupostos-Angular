import { Budget } from "./budget";

export interface BudgetSaved {
    id_budgetSaved?: number;
    nombre: string;
    telefono?: string;
    email: string;
    servicios?: Budget[];
    pages?: number;
    languages?: number;
    total: number;
    created_at: Date;
    updated_at: Date;
}

export interface ApiResult {
    code: number;
    error: boolean;
    message: string;
    data?: any;
}