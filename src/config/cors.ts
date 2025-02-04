import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2];

        if(process.argv[2]==="--api") {
            whitelist.push(undefined);
        }

        if(whitelist.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};