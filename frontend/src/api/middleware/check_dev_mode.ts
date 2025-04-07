import config from "@/config";

async function fetch_with_middleware(url: string, method: string, body?: object): Promise<any | null> {

                if (!config.is_production && !config.is_test_with_server) {
                                console.info('dev mode')
                                console.log('key', import.meta.env['VITE_API_REQ_KEY'])
                                return null;
                }

                let req_init_add_key: RequestInit = {};

                if (method === 'GET') {
                                req_init_add_key = {
                                                method: method,
                                                headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': import.meta.env['VITE_API_REQ_KEY'] as string
                                                },
                                                credentials: 'include'
                                }
                }

                if (method === 'POST') {
                                req_init_add_key = {
                                                method: method,
                                                headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': import.meta.env['VITE_API_REQ_KEY'] as string
                                                },
                                                credentials: 'include',
                                                body: body ? JSON.stringify(body) : undefined,
                                }
                }

                const response = await fetch(url, req_init_add_key);

                if (!response.ok) {
                                console.error(config.is_production ?? `HTTP error! status: ${response.status}`);
                                return null;
                }
                const data = await response.json();
                return data;
}

export { fetch_with_middleware }