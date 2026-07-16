import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Seeder Data
const originalClients = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Flipkart_Logo.svg' },
  { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Shopify_logo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg' },
  { name: 'Zomato', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg' },
  { name: 'Swiggy', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
  { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' }
];

const baseVideos = [
  { id: "_CZAM4GRc_I", title: "Z Perfume EDP | Television Commercial Ad" },
  { id: "JdVxbx70vf0", title: "Too Hot Outside? RAMRAJ White Shirts Ad" },
  { id: "xZcq_8JICY8", title: "Asian Paints Damp Proof - Superstar of Waterproofing" },
  { id: "vXNyCvkq7SY", title: "Asian Paints SmartCare Damp Proof 30s Ad" },
  { id: "GOxcDKppy4U", title: "The Chennai Silks - Summer Wardrobe Collection" },
  { id: "fJiBFc4IEUQ", title: "Ananya's Nana Nani Homes - Story 5 Commercial" },
  { id: "SxliuLpxr8I", title: "Ananya's Nana Nani Homes - Story 4 Commercial" },
  { id: "FvF4nETPKJk", title: "Ananya's Nana Nani Homes - Story 3 Commercial" },
  { id: "7_96PaxlUN4", title: "Ananya's Nana Nani Homes - Story 2 Commercial" },
  { id: "C3j9cx3oz44", title: "Ananya's Nana Nani Homes - Story 1 Commercial" },
  { id: "p_GBpnsb5CE", title: "Retirement-il Vaazha Ungal Vaazhvai Vaazha | Cheers Living" },
  { id: "POesws0Zu1E", title: "Exclusively For People Who Never Stop Dreaming | Cheers" },
  { id: "WrG4MwfmWkI", title: "Live Your Paused Dreams | Cheers Senior Living Ad" },
  { id: "K88Tzw0uh-8", title: "Cheers Retirement Living - The Best Version of Yourself" },
  { id: "4vyKS71Ap3I", title: "Don’t Waste Water | Hard Worker Eco Plaster | Ramco Cements" },
  { id: "GGDUzgl-h0A", title: "Solladha Sol | Malabar Gold & Diamonds Commercial" },
  { id: "ebuU3D-spgQ", title: "Ramraj Grand Wedding Collections presented by Rishab Shetty" },
  { id: "Q5kl2roCgJA", title: "Ramco Hard Worker | Television Commercial Ad" },
  { id: "hshjqlY1Hgc", title: "Priya Pickles - Unforgettable Taste Commercial Ad" },
  { id: "6EXjGIQjCEc", title: "Celebrate Diwali with Majestic Maharaja Styles" },
  { id: "_lDWIiqRgTs", title: "CLINIC PLUS INVINCIBLE - Strong Hair 25s Ad" },
  { id: "tyx-tv3z7zQ", title: "Shaadi.com | Aadi Sale Special Commercial" },
  { id: "Qz5lEgTYP_4", title: "Grand Opening | Thangamayil Jewellery Showroom" },
  { id: "YIH5HOukIos", title: "Thanjavur Silk Traditional Handloom Weaves Ad" },
  { id: "iythe8WGNis", title: "Discover the Acharya Collection Jewellers" },
  { id: "64J6YnWTB4c", title: "Introducing Srinivasa Kalyanam | Pothys Swarna Mahal" },
  { id: "YmYmZsJUksw", title: "Ultimate Table Tennis Season 6 Official Promo" },
  { id: "VX4VwIXv6VU", title: "Tour the Paradise with Actor Y. G. Mahendran | Nana Nani" },
  { id: "oyYmSxYe_Qs", title: "The Untold Secret of Silk | Minister White Dhotis" },
  { id: "Aj9n4js_w_M", title: "Way2News - Tamil No.1 Short News Application Ad" },
  { id: "__xvQUEdgF4", title: "Way2News Gaming Grandmothers - Digital App Campaign" },
  { id: "iIoHTDHy7WI", title: "GRT Brides – The Elegant Bridal Collection (Tamil)" },
  { id: "dOhXzePuf7Q", title: "GRT Brides – The Elegant Bridal Collection (Telugu)" },
  { id: "qI1tR694eJk", title: "Hero Pleasure+ XTEC Connect - My License to Ride Ad" },
  { id: "mbPZzqylPaY", title: "Tour the Paradise | Ananya’s Nana Nani Retirement Homes" },
  { id: "BQ_d2rMpLwk", title: "Ignite Actor Training Monologues Showcase" }
];

const testimonialsData = [
  {
    name: "Delhi Ganesh",
    profession: "Actor",
    review: "Thara Umesh is a pioneer in the casting industry, I have known her for more than 25 years. She understands the concept and casts the right talent for advertising and movies. I have witnessed her auditioning and seen how professionally she directs and makes any artist feel comfortable and makes them act. She is a very warm and loving human being. Now that she is starting Ignite Talents grooming school with her vast experience, I am sure she will bring out the talents in many upcoming and aspiring models. IGNITE TALENTS is the right place for aspiring talents. I wish all the best to Thaara Umesh and her grooming school.",
    photo: "/src/assets/testimonials/delhi-ganesh.jpg"
  },
  {
    name: "Mohan Raman",
    profession: "Actor",
    review: "I understand that my friend and Model coordinator Thaara Umesh is starting a School - Ignite Talents for aspiring Actors and Models. Her immense knowledge of the Industry and what Ad film makers expect from Talent puts her in the perfect place to give the right inputs and advice, not just in terms of technique but the attitude needed on sets. I wish her the very best in this endeavor and hope she is able to Ignite many talents and send them rocketing to success .",
    photo: "/src/assets/testimonials/mohan-raman.jpg"
  },
  {
    name: "Priya Mani",
    profession: "Actress",
    review: "Tara Umesh is one the first \"modelling coordinator \" I ever worked with in chennai and she was so gracious enough to guide me through my first modelling assignment and from there was no looking back. She even set me up with my very first professional portfolio with her own son Ajai Umesh who now is an even more famous photographer. Tara is a committed woman who knows her craft very well. An excellent judge of character and assignments. She is the one who practically launched my modelling career in the south, and now is all set to start her own grooming school which is called \"IGNITE TALENTS\". All my good wishes to Tara Umesh and her grooming school!!! May it become super successful and may it launch many more new and upcoming",
    photo: "/src/assets/testimonials/priya-mani.jpg"
  },
  {
    name: "Nikki Galrani",
    profession: "Actress",
    review: "Thara Umesh has been a dear friend for more than a decade now. Each year of knowing her has only gotten better than the previous ones. Thara Umesh apart from being a dear one with an aura that makes me feel immensely positive and warm, has also played a vital role in structuring not just my career but a lot of others. Her support has been there throughout and i'm sure for each one of you that is looking to have an amazing experience in the entertainment industry, i could not suggest a place thats more apt than \"Ignite Talents Grooming School\". For all the warmth, support and learning Thara Umesh is definitely the person and Ignite Talents is no doubt the place to be in ❤",
    photo: "/src/assets/testimonials/nikki-galrani.jpg"
  },
  {
    name: "Chinni Jayanth",
    profession: "Actor",
    review: "Hi my dear sister Thara, I know you for more than 20 years now, you are such a hard working woman and also a very talented person. If you start anything, it will be successful. Now I came to know that you're starting \"IGNITE TALENT Grooming school \" It will be a 100% successful project . Always my support and our entire Film Industry support will be with you.. Rock it !!!!! Good luck, Your loving brother",
    photo: "/src/assets/testimonials/chinni-jayanth.jpg"
  },
  {
    name: "Pavithra",
    profession: "Actress",
    review: "Ignite talents grooming school by Thara Umesh mam is the best place in chennai to kickstart your modelling/acting career. Thara mam is like a godmother to me, well actually she is a godmother to a lot of successful models and actors in the city Today. Thara mam has been a big part of my career growth, from grooming, acting and how to personally build myself. So without further delay enroll with the most professionally equipped and knowledgeable trainer in the city. If you are looking for the right path to start your career in media, IGNITE is the right place",
    photo: "/src/assets/testimonials/pavithra.jpg"
  },
  {
    name: "Vidya Pradeep",
    profession: "Actress",
    review: "My journey started with Thaara Mam. She is the one who identified me, prepared me to be a model, and guided me throughout. She is my mentor and family. I was a regular office goer, working at a hospital in Chennai. I had heard a lot about the top model coordinator in Chennai, with more than 30 years of experience. Like any other newcomer I was a bit shy and hesitant to approach Mam, because I was not sure whether she would even consider me as a model. With a lot of doubts and insecurities about myself, I was able to meet her. I was surprised to meet her and receive a warm welcome from her. She was extremely kind and professional, and we had an instant connection. I remember the words she told me, \"There is something in you child, Your eyes are very powerful. \" She explained the details to me with a lot of love and patience. She even taught me how to walk and stand like a model. I am forever grateful to you, Mam. You identified the talent in me, gave me confidence, and encouraged me to pursue my dreams. Today Mam is starting her new venture, \"IGNITE TALENTS\" grooming school. I am sure she will be able to bring out the talents in many aspiring models. Her grooming sessions will help to bring out their best versions of themselves. With her vast experience in this field, Ignite Talents is the best place for you to start your career. My best wishes to all the aspiring models and actors. You guys are lucky to be at the right place at the right time.",
    photo: "/src/assets/testimonials/vidya-pradeep.jpg"
  },
  {
    name: "Jennifer",
    profession: "Casting Director",
    review: "I'm so happy and proud for Mrs.Thaara Umesh who has been my best friend over 35 years as she takes the big step in entering IGNITE TALENTS GROOMING SCHOOL. The talented, hardworking and must to mention the stylish Thaara Umesh is the monopoly of Casting when it comes to South. Over 35 years of experience and exposure, who would beat her to be the best. I encourage all the upcoming models to get trained by this wonderful lady who has the beauty with brains. My best wishes to IGNITE TALENTS and the team. Keep rocking.",
    photo: "/src/assets/testimonials/jennifer.jpg"
  },
  {
    name: "Surya Ganapathy",
    profession: "Model / Actress",
    review: "Thaara aunty played a big role in moulding my modelling career. When I started out as an outsider who wanted to be a model, she gave me my biggest ad campaigns which helped me establish my name in the industry. She not only got me the auditions but also went the extra mile of helping me with the process of delivering a good performance everytime! I owe a lot of my success to her :) Today I am extremely pleased for the students who are now getting a chance to directly be groomed by her. Thaara aunty is a lovely human being, spiritually inclined, extremely professional and always there to guide, help you grow into your better version. Congratulations and my hearty wishes to IGNITE talents - grooming school! All my love.",
    photo: "/src/assets/testimonials/surya-ganapathy.jpg"
  },
  {
    name: "Kunal Daswani",
    profession: "Photographer",
    review: "Tara Umesh has been a stalwart in the industry for decades now. It's always been a pleasure working with her... she is a thorough professional and always brings her 'A' game to everything she does. I wish her all the best with her new venture, Ignite Talents grooming school. I look forward working with the next batch of talented youngsters she grooms.",
    photo: "/src/assets/testimonials/kunal-daswani.jpg"
  },
  {
    name: "Vijay Xavier",
    profession: "Former Vice President & Unit Head, Lintas",
    review: "With 35 years of experience and professional acumen, her contacts and exposure of Professional interaction with the country's top Drectors, Creative Directors, Art Directors and Producers, Thaara is the best person to start a Grooming School and provide the industry with top class professional models. I wish Thaara all the very best and outstanding success in this latest venture of hers.",
    photo: "/src/assets/testimonials/vijay-xavier.jpg"
  },
  {
    name: "Mugen Rao",
    profession: "Actor",
    review: "HI Thaara Umesh ma'am, congratulations on your new venture IGNITE TALENTS grooming school. Working with you for Uber Moto ad was an excellent and great experience for me. I was very glad to see you on set and blessed to have met you. Working with you was an amazing experience, I admire the clarity in your communication, casting and you coordination is impeccable ma'am. Hope to work with you for more big projects in the future. And I wish you, IGNITE TALENTS grooming school and all the aspiring talents who train under you.. Congrats once again ma'am...",
    photo: "/src/assets/testimonials/mugen-rao.jpg"
  },
  {
    name: "Anonymous Industry Professional",
    profession: "Casting Director / Model Coordinator",
    review: "Tara is a wonderful coordinator and casting director. I have known her for almost 18 years. When we go to Tara with a model requirement, we can be assured that we would get the best of talents available in the country. That is the trust I have on Tara. She is not just prompt in responding, which is a trait missing among the new age casting directors but also ensures that I get what I want without any compromise. Being transparent even at the cost of losing business is how upfront and professional she is. That makes her the most bankable Model Coordinator/ Casting Director.",
    photo: "/src/assets/testimonials/anonymous-professional.jpg"
  },
  {
    name: "Arun Kumar",
    profession: "Director / Producer",
    review: "Ignite Talents - a grooming school started by Tara is the place to be for budding models and actors. She has the experience and knowledge to hone talents professionally. Its not enough to simply train and groom without the contacts and expertise to place them where they shine. Tara - being a veteran in the industry, enables her to provide opportunities for the talents she grooms with ease.",
    photo: "/src/assets/testimonials/arun-kumar.jpg"
  },
  {
    name: "Ashok Kumar",
    profession: "Actor / Model / Choreographer",
    review: "I take immense pleasure in vouching for the \"Ignite Talents Grooming School\" coz' the 'Iron Lady' behind it is a \"Star Maker\" (Ms.Thara ★ Umesh) as her name suggests ! I've worked with her & known her as a dedicated model coordinator, a director who works relentlessly even to get the perfect audition recorded and most importantly - She is a wonderful Soul. She has always ignited the flames within quality talent in her career and I wish her all the very best as she now formally paves the way for future talent through her venture - Ignite Talents Grooming School",
    photo: "/src/assets/testimonials/ashok-kumar.jpg"
  },
  {
    name: "V. K. Prakash",
    profession: "Director",
    review: "Thara and my association with work goes on for years .. and she is most committed proffessional and more above a honest person. I wish all the best for her IGNITE TALENTS grooming school.. and my prayers for the success",
    photo: "/src/assets/testimonials/vk-prakash.jpg"
  }
];

const workshopVideos = [
  { videoUrl: "https://video.wixstatic.com/video/e67e91_7ff82a837b9c4f2c9226ec9cc49f9e40/480p/mp4/file.mp4", thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://video.wixstatic.com/video/e67e91_b836e153cc7f4e468635a7a7b7f39654/360p/mp4/file.mp4", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://www.youtube.com/embed/_CZAM4GRc_I", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://www.youtube.com/embed/JdVxbx70vf0", thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://www.youtube.com/embed/fJiBFc4IEUQ", thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://www.youtube.com/embed/xZcq_8JICY8", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://video.wixstatic.com/video/e67e91_adf523a122b441198b11992625da808f/720p/mp4/file.mp4", thumbnail: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=800&auto=format&fit=crop" },
  { videoUrl: "https://www.youtube.com/embed/GOxcDKppy4U", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492534513006-37715f336a39?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop"
];

const shootingHouseImages = [
  "https://static.wixstatic.com/media/e67e91_6810b8cc855742f2a161bf7af70b8c7b~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_321abb18e663495aa19394b58250068e~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_d47c869c116c48efb111b9c55a00b3ff~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_218a9b66e63546d6b608a21f7114d78d~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_8dab172717744e789248cd0f12454255~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_436ceeda4d044b73b042842081e9a137~mv2.jpeg",
  "https://static.wixstatic.com/media/e67e91_67d73becfac143fe9d4886ef4d7fe3cd~mv2.jpeg"
];

const shootingHouseVideos = [
  { thumbnail: "https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=600&auto=format&fit=crop&q=60", youtubeUrl: "https://www.youtube.com/watch?v=_CZAM4GRc_I" },
  { thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60", youtubeUrl: "https://www.youtube.com/watch?v=xZcq_8JICY8" }
];

export async function initializeDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'thaara_umesh';

  let connection;
  try {
    // 1. Connect without selecting database to create it
    connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.end();

    // 2. Connect with selected database to create tables
    connection = await mysql.createConnection({ host, user, password, database });

    console.log('--- Initializing Database Tables ---');

    // Create Clients Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`clients\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`logo\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Showcases Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`showcases\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`thumbnail\` VARCHAR(255) NOT NULL,
        \`youtube_url\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Testimonials Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`testimonials\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`person_name\` VARCHAR(255) NOT NULL,
        \`designation\` VARCHAR(255) NOT NULL,
        \`profile_image\` VARCHAR(255) NOT NULL,
        \`review\` TEXT NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Workshops Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`workshops\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`thumbnail\` VARCHAR(255) NOT NULL,
        \`youtube_url\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Ignite Images Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`ignite_images\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`image_url\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Shooting House Images Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`shooting_house_images\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`image_url\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Shooting House Videos Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`shooting_house_videos\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`thumbnail\` VARCHAR(255) NOT NULL,
        \`youtube_url\` VARCHAR(255) NOT NULL,
        \`display_order\` INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Contacts Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`contacts\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`subject\` VARCHAR(255) NOT NULL,
        \`message\` TEXT NOT NULL,
        \`is_read\` TINYINT(1) DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Artists Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`artists\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`fullName\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`dob\` VARCHAR(50),
        \`gender\` VARCHAR(20),
        \`address\` TEXT,
        \`city\` VARCHAR(100),
        \`state\` VARCHAR(100),
        \`country\` VARCHAR(100),
        \`height\` VARCHAR(20),
        \`weight\` VARCHAR(20),
        \`languages\` VARCHAR(255),
        \`experience\` TEXT,
        \`skills\` TEXT,
        \`categories\` VARCHAR(255),
        \`instagram\` VARCHAR(255),
        \`facebook\` VARCHAR(255),
        \`portfolioWebsite\` VARCHAR(255),
        \`profileDescription\` TEXT,
        \`profilePhoto\` VARCHAR(555),
        \`portfolioImages\` TEXT,
        \`resumeUrl\` VARCHAR(555),
        \`introVideoUrl\` VARCHAR(555),
        \`status\` VARCHAR(20) DEFAULT 'pending',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Artist Profile Requests Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`artist_profile_requests\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`requesterName\` VARCHAR(255) NOT NULL,
        \`requesterEmail\` VARCHAR(255) NOT NULL,
        \`companyName\` VARCHAR(255) NOT NULL,
        \`reason\` TEXT NOT NULL,
        \`artistId\` INT NOT NULL,
        \`status\` VARCHAR(20) DEFAULT 'pending',
        \`accessToken\` VARCHAR(255) DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('Tables created or verified.');

    // 3. Seeding Tables if empty
    // Clients Seeding
    const [clientsRows] = await connection.query('SELECT COUNT(*) as count FROM `clients`');
    if (clientsRows[0].count === 0) {
      console.log('Seeding clients...');
      for (let i = 0; i < originalClients.length; i++) {
        const c = originalClients[i];
        await connection.query(
          'INSERT INTO `clients` (`logo`, `display_order`) VALUES (?, ?)',
          [c.logo, i + 1]
        );
      }
    }

    // Showcases Seeding
    const [showcasesRows] = await connection.query('SELECT COUNT(*) as count FROM \`showcases\`');
    if (showcasesRows[0].count === 0) {
      console.log('Seeding showcases...');
      for (let i = 0; i < baseVideos.length; i++) {
        const v = baseVideos[i];
        const ytUrl = v.id.length > 11 ? v.id : `https://www.youtube.com/watch?v=${v.id}`;
        const thumbnail = v.id.length > 11 ? v.id : `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
        await connection.query(
          'INSERT INTO \`showcases\` (\`title\`, \`thumbnail\`, \`youtube_url\`, \`display_order\`) VALUES (?, ?, ?, ?)',
          [v.title, thumbnail, ytUrl, i + 1]
        );
      }
    }

    // Testimonials Seeding
    const [testimonialsRows] = await connection.query('SELECT COUNT(*) as count FROM \`testimonials\`');
    if (testimonialsRows[0].count === 0) {
      console.log('Seeding testimonials...');
      for (let i = 0; i < testimonialsData.length; i++) {
        const t = testimonialsData[i];
        await connection.query(
          'INSERT INTO \`testimonials\` (\`person_name\`, \`designation\`, \`profile_image\`, \`review\`, \`display_order\`) VALUES (?, ?, ?, ?, ?)',
          [t.name, t.profession, t.photo, t.review, i + 1]
        );
      }
    }

    // Workshops Seeding
    const [workshopsRows] = await connection.query('SELECT COUNT(*) as count FROM \`workshops\`');
    if (workshopsRows[0].count === 0) {
      console.log('Seeding workshops...');
      for (let i = 0; i < workshopVideos.length; i++) {
        const w = workshopVideos[i];
        await connection.query(
          'INSERT INTO \`workshops\` (\`thumbnail\`, \`youtube_url\`, \`display_order\`) VALUES (?, ?, ?)',
          [w.thumbnail, w.videoUrl, i + 1]
        );
      }
    }

    // Ignite Images Seeding
    const [igniteRows] = await connection.query('SELECT COUNT(*) as count FROM \`ignite_images\`');
    if (igniteRows[0].count === 0) {
      console.log('Seeding ignite images...');
      for (let i = 0; i < galleryImages.length; i++) {
        await connection.query(
          'INSERT INTO \`ignite_images\` (\`image_url\`, \`display_order\`) VALUES (?, ?)',
          [galleryImages[i], i + 1]
        );
      }
    }

    // Shooting House Images Seeding
    const [shImagesRows] = await connection.query('SELECT COUNT(*) as count FROM \`shooting_house_images\`');
    if (shImagesRows[0].count === 0) {
      console.log('Seeding shooting house images...');
      for (let i = 0; i < shootingHouseImages.length; i++) {
        await connection.query(
          'INSERT INTO \`shooting_house_images\` (\`image_url\`, \`display_order\`) VALUES (?, ?)',
          [shootingHouseImages[i], i + 1]
        );
      }
    }

    // Shooting House Videos Seeding
    const [shVideosRows] = await connection.query('SELECT COUNT(*) as count FROM \`shooting_house_videos\`');
    if (shVideosRows[0].count === 0) {
      console.log('Seeding shooting house videos...');
      for (let i = 0; i < shootingHouseVideos.length; i++) {
        const v = shootingHouseVideos[i];
        await connection.query(
          'INSERT INTO \`shooting_house_videos\` (\`thumbnail\`, \`youtube_url\`, \`display_order\`) VALUES (?, ?, ?)',
          [v.thumbnail, v.youtubeUrl, i + 1]
        );
      }
    }

    console.log('Database Initialization & Seeding Complete.');
  } catch (error) {
    console.error('Database Initialization Failed:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
