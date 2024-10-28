import {Player} from "@/lib/models/player";
import {Position} from "@/lib/models/position";

interface FetchResponse<T> {
    data: T;
    status: number;
    error: Error | null;
}


const fetchWithHandling = async <T>(
    endpoint: string,
    method: string,
    headers: { [key: string]: string } = {},
    body?: T
): Promise<FetchResponse<T | undefined>> => {
    const requestOptions: RequestInit = {
        cache: "no-store",
        method,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            ...headers,
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(
            `http://localhost:3000/api/${endpoint}`,
            requestOptions
        );
        if (!response.ok) {
            return {data: undefined, status: response.status, error: Error('Failed') as Error};
        }

        const data = await response.json() as T;
        return {data, status: response.status, error: null};
    } catch (error) {
        return {data: undefined, status: 500, error: error as Error};
    }
};


const createHeaders = async (additionalHeaders: Record<string, string> = {}) => {
    return {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        ...additionalHeaders,
    };
};

export const getAllPositions = async (offset: number, limit: number) => {
    const endpoint = `positions?limit=${limit}&offset=${offset}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};


export const getAllPlayers = async (offset: number, limit: number) => {
    const endpoint = `players?limit=${limit}&offset=${offset}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};

export const getAllRoles = async (offset: number, limit: number) => {
    const endpoint = `roles?limit=${limit}&offset=${offset}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};

export const getPositionById = async (id: string) => {
    const endpoint = `positions/position/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};

export const getPlayerById = async (id: string) => {
    const endpoint = `players/player/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};

export const getRoleById = async (id: string) => {
    const endpoint = `roles/role/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "GET", headers);
};


export const addPlayer = async (data: Player) => {
    const endpoint = `players/player`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "POST", headers, data);
};

export const addPosition = async (data: Position) => {
    const endpoint = `positions/position`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "POST", headers, data);
};

export const addRole = async (data: Position) => {
    const endpoint = `roles/role`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "POST", headers, data);
};


export const editPlayer = async (id: string, data: Player) => {
    const endpoint = `players/player/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "PUT", headers, data);
};

export const editPosition = async (id: string, data: Position) => {
    const endpoint = `positions/position/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "PUT", headers, data);
};

export const editRole = async (id: string, data: Position) => {
    const endpoint = `roles/role/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "PUT", headers, data);
};

export const deletePlayer = async (id: string) => {
    const endpoint = `players/player/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "DELETE", headers);
};

export const deletePosition = async (id: string) => {
    const endpoint = `positions/position/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "DELETE", headers);
};

export const deleteRole = async (id: string) => {
    const endpoint = `roles/role/${id}`;
    const headers = await createHeaders();
    return fetchWithHandling(endpoint, "DELETE", headers);
};

export function buildSearchParamString(searchParams: { [key: string]: string | string[] | undefined }) {
    let paramString = '?';
    for (const entry in searchParams) {
        paramString += `${entry}=${encodeURIComponent(searchParams[`${entry}`] as string)}&`;
    }
    paramString = paramString.slice(0, paramString.length - 1).trim();
    return paramString;
}
