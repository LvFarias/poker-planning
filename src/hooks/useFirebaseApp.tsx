import { FirebaseApp, deleteApp, getApp, initializeApp } from 'firebase/app';
import { useEffect, useRef } from 'react';
import {
	useObject as _useObject,
	useObjectVal as _useObjectVal,
} from 'react-firebase-hooks/database';

export type UseFirebasOptions = {
	databaseURL: string;
};

export function useFirebaseApp(appName: string, options: UseFirebasOptions) {
	const firebaseRef = useRef<FirebaseApp>();

	useEffect(() => {
		try {
			firebaseRef.current = getApp(appName);
		} catch (e) {
			firebaseRef.current = initializeApp(options, appName);
		}

		return () => {
			if (firebaseRef.current?.name === 'rooms') {
				// deleteApp(firebaseRef.current!);
			}
		};
	}, [options, appName]);

	return firebaseRef.current;
}

function wrapFirebaseFnWithErrorLog<T>(fn: T): T {
	const fn2 = ((...args: any[]) => {
		const arr = (fn as any)(...args);
		const error = arr[2];

		if (error) {
			console.error(error);
		}

		return arr;
	}) as any;

	return fn2 as T;
}

/** Returns the exact same firebase function, but wrapped with an error logger and/or throw on debug mode */
export const useObjectVal = wrapFirebaseFnWithErrorLog(_useObjectVal);
export const useObject = wrapFirebaseFnWithErrorLog(_useObject);
