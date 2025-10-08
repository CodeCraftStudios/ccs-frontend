export const NAME = "CodeCraft Studios"
export const EMAIL = "johnmolina@codecraftstudios.net"
export const PHONE = "+1 (954) 398-0241"
export const CALENDLY = "";

export const KEYWORDS = [
    "IT services Miami",
    "web development services",
    "mobile app development",
    "digital marketing agency",
    "SEO services Miami",
    "API development",
    "game development",
    "system design",
    "software development Florida",
    "tech solutions Miami"
]



export const linkedinLink = "https://www.linkedin.com/company/107904922"
export const instagramLink = "https://www.instagram.com/codecraft.studios"
export const twittweLink = "https://x.com/CodeCraft_Us" 

export let FRONTEND = ""
export let SERVER_ENDPOINT = ""

const DEV:any = true;


if (DEV == true){
    FRONTEND = "http://localhost:3000"
    SERVER_ENDPOINT = "http://localhost:8000";
    
}
else{
    
    FRONTEND = "https://www.codecraftstudios.net"
    SERVER_ENDPOINT = "https://api.codecraftstudios.net";

}



export const EXPERIENCE = 7
export const PROJECTS = 40