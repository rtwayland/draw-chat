import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// eslint-disable-next-line no-undef
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL);
