import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers as nextHeaders } from 'next/headers';
import { PROXY_CONFIG, isRouteAllowed, getExternalApiUrl, sanitizePath } from '@/lib/config/proxyConfig';

// Função para obter token do header Authorization (client -> proxy)
async function getTokenFromRequestHeader(): Promise<string | null> {
    const hdrs = await nextHeaders();
    const auth = hdrs.get('authorization') || hdrs.get('Authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.slice(7);
    }
    return null;
}

// Função para obter token do cookie (fallback)
async function getTokenFromCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;
    return token || null;
}

// Função para obter refresh token do cookie
async function getRefreshTokenFromCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    return refreshToken || null;
}

// Função para renovar token
async function refreshAccessToken(refreshToken: string): Promise<{ token: string; refreshToken: string } | null> {
    try {
        const response = await fetch(getExternalApiUrl('/auth/refresh'), {
            method: 'POST',
            headers: PROXY_CONFIG.DEFAULT_HEADERS,
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return {
            token: data.token,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return null;
    }
}

// Função genérica para fazer requisição com retry
async function makeRequestWithRetry(
    url: string,
    method: string,
    headers: Record<string, string>,
    body?: any
): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= PROXY_CONFIG.RETRY_CONFIG.maxRetries; attempt++) {
        try {
            const requestOptions: RequestInit = {
                method,
                headers,
                signal: AbortSignal.timeout(PROXY_CONFIG.TIMEOUT),
            };

            if (body) {
                requestOptions.body = JSON.stringify(body);
            }

            const response = await fetch(url, requestOptions);

            // Se receber 401, tentar renovar token
            if (response.status === 401 && headers.Authorization) {
                const refreshToken = await getRefreshTokenFromCookie();
                if (refreshToken) {
                    const newTokens = await refreshAccessToken(refreshToken);
                    if (newTokens) {
                        // Reenviar requisição com novo token
                        headers.Authorization = `Bearer ${newTokens.token}`;
                        const retryResponse = await fetch(url, requestOptions);
                        
                        if (retryResponse.ok) {
                            return retryResponse;
                        }
                    }
                }
            }

            return response;
        } catch (error) {
            lastError = error as Error;
            console.error(`Tentativa ${attempt + 1} falhou:`, error);
            
            if (attempt < PROXY_CONFIG.RETRY_CONFIG.maxRetries) {
                await new Promise(resolve => 
                    setTimeout(resolve, PROXY_CONFIG.RETRY_CONFIG.retryDelay)
                );
            }
        }
    }

    throw lastError || new Error('Todas as tentativas falharam');
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const path = '/' + resolvedParams.path.join('/');
        const sanitizedPath = sanitizePath(path);
        
        // Verificar se a rota é permitida
        if (!isRouteAllowed(sanitizedPath)) {
            console.warn(`❌ Rota não permitida: ${sanitizedPath}`);
            return NextResponse.json(
                { error: 'Rota não permitida' },
                { status: 403 }
            );
        }

        // Obter token do header (se veio do client) ou cookie (fallback)
        const token = (await getTokenFromRequestHeader()) || (await getTokenFromCookie());
        
        // Preparar headers
        const headers: Record<string, string> = {
            ...PROXY_CONFIG.DEFAULT_HEADERS,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Fazer requisição para API externa
        const url = getExternalApiUrl(sanitizedPath);
        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        console.log(`🔄 Proxy GET: ${fullUrl}`);

        const response = await makeRequestWithRetry(fullUrl, 'GET', headers);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro no proxy GET:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const path = '/' + resolvedParams.path.join('/');
        const sanitizedPath = sanitizePath(path);
        
        // Verificar se a rota é permitida
        if (!isRouteAllowed(sanitizedPath)) {
            console.warn(`❌ Rota não permitida: ${sanitizedPath}`);
            return NextResponse.json(
                { error: 'Rota não permitida' },
                { status: 403 }
            );
        }

        const token = (await getTokenFromRequestHeader()) || (await getTokenFromCookie());
        
        // Preparar headers
        const headers: Record<string, string> = {
            ...PROXY_CONFIG.DEFAULT_HEADERS,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Obter body da requisição
        const body = await request.json();

        // Fazer requisição para API externa
        const url = getExternalApiUrl(sanitizedPath);
        
        console.log(`🔄 Proxy POST: ${url}`);

        const response = await makeRequestWithRetry(url, 'POST', headers, body);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro no proxy POST:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const path = '/' + resolvedParams.path.join('/');
        const sanitizedPath = sanitizePath(path);
        
        // Verificar se a rota é permitida
        if (!isRouteAllowed(sanitizedPath)) {
            console.warn(`❌ Rota não permitida: ${sanitizedPath}`);
            return NextResponse.json(
                { error: 'Rota não permitida' },
                { status: 403 }
            );
        }

        const token = (await getTokenFromRequestHeader()) || (await getTokenFromCookie());
        
        // Preparar headers
        const headers: Record<string, string> = {
            ...PROXY_CONFIG.DEFAULT_HEADERS,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Obter body da requisição
        const body = await request.json();

        // Fazer requisição para API externa
        const url = getExternalApiUrl(sanitizedPath);
        
        console.log(`🔄 Proxy PUT: ${url}`);

        const response = await makeRequestWithRetry(url, 'PUT', headers, body);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro no proxy PUT:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const path = '/' + resolvedParams.path.join('/');
        const sanitizedPath = sanitizePath(path);
        
        // Verificar se a rota é permitida
        if (!isRouteAllowed(sanitizedPath)) {
            console.warn(`❌ Rota não permitida: ${sanitizedPath}`);
            return NextResponse.json(
                { error: 'Rota não permitida' },
                { status: 403 }
            );
        }

        const token = (await getTokenFromRequestHeader()) || (await getTokenFromCookie());
        
        // Preparar headers
        const headers: Record<string, string> = {
            ...PROXY_CONFIG.DEFAULT_HEADERS,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Fazer requisição para API externa
        const url = getExternalApiUrl(sanitizedPath);
        
        console.log(`🔄 Proxy DELETE: ${url}`);

        const response = await makeRequestWithRetry(url, 'DELETE', headers);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro no proxy DELETE:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const path = '/' + resolvedParams.path.join('/');
        const sanitizedPath = sanitizePath(path);
        
        // Verificar se a rota é permitida
        if (!isRouteAllowed(sanitizedPath)) {
            console.warn(`❌ Rota não permitida: ${sanitizedPath}`);
            return NextResponse.json(
                { error: 'Rota não permitida' },
                { status: 403 }
            );
        }

        // Obter token do cookie
        const token = await getTokenFromCookie();
        
        // Preparar headers
        const headers: Record<string, string> = {
            ...PROXY_CONFIG.DEFAULT_HEADERS,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Obter body da requisição
        const body = await request.json();

        // Fazer requisição para API externa
        const url = getExternalApiUrl(sanitizedPath);
        
        console.log(`🔄 Proxy PATCH: ${url}`);

        const response = await makeRequestWithRetry(url, 'PATCH', headers, body);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro no proxy PATCH:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
} 