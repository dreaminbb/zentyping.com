import { code_obj } from "@/interface";
import { user_info } from "../store/store";
import { fetch_with_middleware } from "./middleware/check_dev_mode";
import config from "@/config";

export async function fetch_one_lang_code_from_api(mount: number, lang: string): Promise<Array<code_obj>> {

                try {


                                const url = import.meta.env["VITE_API_URL_RETURN_CODE_DATA"] as string
                                const init: RequestInit = {
                                                method: 'POST',
                                                headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': `Bearer ${user_info()?.token ?? ''}`,
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({ mount, lang }),
                                }

                                const data = await fetch_with_middleware(url, init);
                                console.log(config.is_prodction ?? data.code as Array<code_obj>)
                                return data.code;
                } catch (error) {
                                console.error('Error fetching code:', error);
                                throw error;
                }
}

export async function fetch_all_lang_code_from_api(mount: number): Promise<code_obj> {

                try {
                                const url = import.meta.env["VITE_API_URL_RETURN_CODE_DATA"] as string
                                const init: RequestInit = {
                                                method: 'POST',
                                                headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': `Bearer ${user_info()?.token as string}`,
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({ mount, lang: 'all' }),
                                }
                                const data = await fetch_with_middleware(url, init);

                                return data.data

                } catch (error) {
                                console.error('Error fetching code:', error);
                                throw error;
                }
}