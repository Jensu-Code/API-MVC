import cors from 'cors';
export const corsMiddleware = () => cors({
        origin: (origin,callback)=>{
            const ACCESS_ORIGIN =[
                'http://localhost:8080',
                'http://movies.com',
                'http://jensu.dev.com',
                'http://localhost:1234'
            ]
            if(ACCESS_ORIGIN.includes(origin) || !ACCESS_ORIGIN.includes(origin)){
                return callback(null,true);
            }
    
            return callback(new Error('Not allowed by CORS '));
        }
})
