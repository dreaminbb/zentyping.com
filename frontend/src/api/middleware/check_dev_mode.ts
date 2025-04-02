import config from "@/config";

async function fetch_with_middleware(url: string, init: RequestInit): Promise<any | null> {

                if (!config.is_prodction && !config.is_test_with_server) {
                                console.info('dev mode')
                                return null;
                }

                const response = await fetch(url, init);
                if (!response.ok) {
                                // throw new Error(`HTTP error! status: ${response.status}`);
                                return null;
                }
                const data = await response.json();
                return data;
}

export { fetch_with_middleware }