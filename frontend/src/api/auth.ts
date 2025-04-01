import { user_info } from '../store/store'

class auth {

                async get_token(): Promise<string | null> {
                                try {
                                                // Simulate token retrieval logic
                                                // console.log(import.meta.env['VITE_FETCH_JWT_URL'])
                                                const response = await fetch(import.meta.env['VITE_FETCH_JWT_URL'] as string, {
                                                                method: 'POST',
                                                                headers: {
                                                                                'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                                username: user_info().user_name,
                                                                })
                                                });

                                                const data = await response.json();
                                                const token = data.token as string;

                                                return token;
                                } catch (e) {
                                                console.error("Error retrieving token:", e);
                                                return null;
                                }
                }

                async get_token_overwrite_store_token_fail_throw_error(): Promise<string | void> {


                                const token = await this.get_token();

                                if (!token) {
                                                throw new Error('Token retrieval failed');
                                }

                                user_info().update_token(token);
                                return token;
                }

}

export default new auth();