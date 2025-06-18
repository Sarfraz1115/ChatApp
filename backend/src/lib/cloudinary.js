import {v2 as cloudinary} from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;


/* 
- Hum cloudinary ko apne profile pic ko upload karne store karne ke liye use kar rahe hai
Cloudinary ek cloud-based service hai jo aapke images, videos, aur other media files ko:

Upload karne

Store karne

Optimize karne

Edit/Transform karne (jaise resize, crop, compress)

Aur deliver karne ke liye use hoti hai.

Yani agar aap ek website ya app bana rahe ho jisme images ya videos upload karni hain, to aap Cloudinary ka use karke easily:

User ke files ko ek secure server pe save kar sakte ho.

Images ko chhota bada, crop, compress wagairah kar sakte ho bina manually coding ke.

Files ko ek fast URL se duniya bhar mein serve kar sakte ho.

Example:
Jab aap Instagram pe photo upload karte ho, to wo internally kisi cloud service pe jaake store hoti hai. Waise hi apne khud ke project mein, aap apne server pe media store karne ke bajaye Cloudinary ka use kar sakte ho — safe aur optimized tarike se.


*/