import { useState } from 'react';

const useConnect = (snapId: string) => {
	const [error, setError] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);

	const connect = async () => {
		if ((window as any).ethereum) {
			try {
				const callback = await (window as any).ethereum.request({
					method: 'wallet_enable',
					params: [
						{
							wallet_snap: { [snapId]: {} },
						},
					],
				});

				if (!!callback.snaps) {
					setIsConnected(true);
				}
			} catch (error: any) {
				setError(error?.message);
			}
		} else {
			setError('Metamask is not installed');
		}
	};

	return { connect, error, isConnected };
};

export default useConnect;
