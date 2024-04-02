import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: 'libsql://shop-dev-dhawel.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTIwNzI0ODgsImlkIjoiMTU0YjBlMDUtM2E1Mi00ZTRmLTllNTktYmZiOTg0YjI0OTFmIn0.jki1QHRZ9A81RD_4F9h-J2kE_y2S4_F22mAJUjenu3Jo95CChOIZ2IahgpHvK2LYtx0FQLgouq6c5pT8dIzZAQ' });

export const db = drizzle(client);
