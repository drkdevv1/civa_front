export interface Bus {
    id: number;
    numeroBus: string;
    placa: string;
    fechaCreacion: number[] | string;
    caracteristicas: string;
    marcaNombre: string;
    marcaId: number;
    activo: boolean;
}

export interface BusResponse {
    content: Bus[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}