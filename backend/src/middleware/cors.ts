import cors from 'cors';
import corsOptions from '../config/cors';

const setCors = cors(corsOptions);

export default setCors;