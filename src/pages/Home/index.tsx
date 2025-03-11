import { RoomPage } from '@pages/Room';
import { SetupPage } from '@pages/Setup';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
	const [isRoomPage, setIsRoomPage] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (!isRoomPage && searchParams.get('room') != null) {
			setIsRoomPage(true);
		} else if (isRoomPage && searchParams.get('room') == null) {
			setIsRoomPage(false);
		}
	}, [searchParams, isRoomPage]);
	return isRoomPage ? <RoomPage /> : <SetupPage />;
}
