

//todo : sginup -> save user github id to server.

import { user_info } from "@/store/store"

async function siginup_send_github_id_to_server(id: string): Promise<void> {

                try {
                                if (!user_info().token) {
                                                // console.error('Token is not available in user_info store');
                                                return;
                                }
                                fetch(import.meta.env['VITE_SGINUP_URL'] as string, {
                                                method: 'POST',
                                                headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': `Bearer ${user_info().token as string}`
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({
                                                                github_user_id: id,
                                                })
                                })
                                // console.log('response', response);
                                // console.log('response cookies', response.headers.get('set-cookie'));
                }
                catch (e) {
                                console.error('Error sending GitHub ID to server:', e)
                }
}


export { siginup_send_github_id_to_server }