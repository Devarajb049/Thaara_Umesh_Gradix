import { useState } from 'react';
import { PlayCircle, X, ChevronDown } from 'lucide-react';
import { useData } from '../admin/context/DataContext';

export const baseVideos = [
  {
    "id": "_CZAM4GRc_I",
    "title": "Z Perfume EDP | Television Commercial | Eskimo Advertising Factory",
    "brand": "Eskimo Advertising Factory",
    "description": "Happy to share my latest television commercial for the iconic brand Z Magnetism. For the first time, I found the perf...",
    "duration": "01:01",
    "thumbnail": "https://i.ytimg.com/vi/_CZAM4GRc_I/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "JdVxbx70vf0",
    "title": "Too hot outside? Just go with Ramraj white. | Ramraj White Shirts | Tamil",
    "brand": "Ramraj Cotton",
    "description": "Too hot outside? Just go with Ramraj white. Ramraj White Shirts — your perfect pick to beat the summer heat. Shop Now...",
    "duration": "00:30",
    "thumbnail": "https://i.ytimg.com/vi/JdVxbx70vf0/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "xZcq_8JICY8",
    "title": "Asian Paints Damp Proof - Superstar of Waterproofing | Tamil - 45 seconds",
    "brand": "Asian Paints",
    "description": "When regular waterproofing fails, it harms your ceiling and your impression. Switch to Asian Paints Damp Proof the Su...",
    "duration": "00:45",
    "thumbnail": "https://i.ytimg.com/vi/xZcq_8JICY8/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "vXNyCvkq7SY",
    "title": "Asian Paints Damp Proof - Superstar of Waterproofing | Tamil - 30 seconds",
    "brand": "Asian Paints",
    "description": "When regular waterproofing fails, it harms your ceiling and your impression. Switch to Asian Paints Damp Proof the Su...",
    "duration": "00:30",
    "thumbnail": "https://i.ytimg.com/vi/vXNyCvkq7SY/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "GOxcDKppy4U",
    "title": "☀️ Upgrade Your Summer Wardrobe at The Chennai Silks",
    "brand": "The Chennai Silks",
    "description": "Your summer wardrobe upgrade starts here! ☀️👗 Explore stunning collections and irresistible offers for every occasio...",
    "duration": "00:20",
    "thumbnail": "https://i.ytimg.com/vi/GOxcDKppy4U/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "e67e91_bd9a7e669aad47f5abca22d870ded2b8",
    "title": "Z-MAGNETISM FOR MEN",
    "brand": "Eskimo Advertising Factory",
    "description": "Z-MAGNETISM FOR MEN",
    "duration": "01:00",
    "thumbnail": "https://static.wixstatic.com/media/e67e91_bd9a7e669aad47f5abca22d870ded2b8f002.jpg/v1/fill/w_330,h_330,enc_auto/file.jpeg",
    "category": "Commercials"
  },
  {
    "id": "fJiBFc4IEUQ",
    "title": "Nana Nani- la ithu thaan nadakkuthu - Story - 5",
    "brand": "Ananyas Nana Nani Homes",
    "description": "For Creative and Sales effective ad film productions - Contact - 5N2 MEDIA - 80129-53330 Client – Ananya's Nana Nani ...",
    "duration": "00:55",
    "thumbnail": "https://i.ytimg.com/vi/fJiBFc4IEUQ/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "SxliuLpxr8I",
    "title": "Nana Nani- la ithu thaan nadakkuthu - Story - 4",
    "brand": "Ananyas Nana Nani Homes",
    "description": "For Creative and Sales effective ad film productions - Contact - 5N2 MEDIA - 80129-53330 Client – Ananya's Nana Nani ...",
    "duration": "00:48",
    "thumbnail": "https://i.ytimg.com/vi/SxliuLpxr8I/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "FvF4nETPKJk",
    "title": "Nana Nani- la ithu thaan nadakkuthu - Story - 3",
    "brand": "Ananyas Nana Nani Homes",
    "description": "For Creative and Sales effective ad film productions - Contact - 5N2 MEDIA - 80129-53330 Client – Ananya's Nana Nani ...",
    "duration": "00:53",
    "thumbnail": "https://i.ytimg.com/vi/FvF4nETPKJk/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "7_96PaxlUN4",
    "title": "Nana Nani- la ithu thaan nadakkuthu - Story - 2",
    "brand": "Ananyas Nana Nani Homes",
    "description": "For Creative and Sales effective ad film productions - Contact - 5N2 MEDIA - 80129-53330 Client – Ananya's Nana Nani ...",
    "duration": "00:48",
    "thumbnail": "https://i.ytimg.com/vi/7_96PaxlUN4/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "C3j9cx3oz44",
    "title": "Nana Nani- la ithu thaan nadakkuthu - Story - 1",
    "brand": "Ananyas Nana Nani Homes",
    "description": "For Creative and Sales effective ad film productions - Contact - 5N2 MEDIA - 80129-53330 Client – Ananya's Nana Nani ...",
    "duration": "00:55",
    "thumbnail": "https://i.ytimg.com/vi/C3j9cx3oz44/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "p_GBpnsb5CE",
    "title": "Retirement-il Vaazha Ungal Vaazhvai Vaazha | Cheers - Senior Living by Casagrand #cheersbycasagrand",
    "brand": "Casagrand Cheers",
    "description": "50+ la rest edunga nu solluvanga... Ana ungalukku.. Oru plan...Oru passion...Oru dream irukkum... Cheers offers you t...",
    "duration": "00:59",
    "thumbnail": "https://i.ytimg.com/vi/p_GBpnsb5CE/mqdefault.jpg",
    "category": "Corporate"
  },
  {
    "id": "POesws0Zu1E",
    "title": "Exclusively For People Who Never Stop Dreaming | Cheers - Senior Living by Casagrand #LifeBeginsAt50",
    "brand": "Casagrand Cheers",
    "description": "You have done your part well -- built a career, built a family. Now it's your turn to live your life at your own pace...",
    "duration": "01:01",
    "thumbnail": "https://i.ytimg.com/vi/POesws0Zu1E/mqdefault.jpg",
    "category": "Corporate"
  },
  {
    "id": "WrG4MwfmWkI",
    "title": "Live Your Paused Dreams | Cheers - Senior Living by Casagrand #cheersbycasagrand #LifeBeginsAt50",
    "brand": "Casagrand Cheers",
    "description": "Are you in your 50's? The world says to slow down. But you choose to speed up, but this time, doing only what you lov...",
    "duration": "01:00",
    "thumbnail": "https://i.ytimg.com/vi/WrG4MwfmWkI/mqdefault.jpg",
    "category": "Corporate"
  },
  {
    "id": "K88Tzw0uh-8",
    "title": "Why Should Retirement Stop You From Being Your Best Version | Cheers - Senior Living by Casagrand",
    "brand": "Casagrand Cheers",
    "description": "Your passion didn't disappear. They are just paused. Cheers helps you reignite them with 🎨Creative & hobby corners \ud83e...",
    "duration": "00:58",
    "thumbnail": "https://i.ytimg.com/vi/K88Tzw0uh-8/mqdefault.jpg",
    "category": "Corporate"
  },
  {
    "id": "4vyKS71Ap3I",
    "title": "Don’t Waste Water | Hard Worker Eco Plaster Ad | Ramco",
    "brand": "Ramco Cements",
    "description": "Every day, the construction industry wastes millions of litres of precious water on wall plaster curing. Ramco Hard W...",
    "duration": "00:50",
    "thumbnail": "https://i.ytimg.com/vi/4vyKS71Ap3I/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "GGDUzgl-h0A",
    "title": "Solladha Sol | Malabar Gold & Diamonds | Tamil",
    "brand": "Malabar Gold & Diamonds",
    "description": "Love in Tamil homes is often unspoken, felt through gestures, glances, and timeless gifts. Solladha Sol celebrates th...",
    "duration": "01:45",
    "thumbnail": "https://i.ytimg.com/vi/GGDUzgl-h0A/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "ebuU3D-spgQ",
    "title": "Ramraj Grand Wedding Collections presented by Rishab Shetty",
    "brand": "Ramraj Cotton",
    "description": "Ramraj Grand Wedding Collections presented by Rishab Shetty Every wedding deserves a crown of tradition and culture. ...",
    "duration": "01:00",
    "thumbnail": "https://i.ytimg.com/vi/ebuU3D-spgQ/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "Q5kl2roCgJA",
    "title": "Ramco Hard Worker |  Prakash Varma | Sneha Iype | Nirvana films",
    "brand": "Ramco Cements",
    "description": "A film for Ramco Hard Worker Directed by Prakash Varma Client - Ramco Hard worker Creative - Haridas Director - Praka...",
    "duration": "01:19",
    "thumbnail": "https://i.ytimg.com/vi/Q5kl2roCgJA/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "hshjqlY1Hgc",
    "title": "Priya Pickles - Unforgettable Taste, Unforgettable Memories since 1980",
    "brand": "Priya Foods",
    "description": "Pickle-making is more than just a recipe — it’s a tradition filled with love, care, and memories. 💛 From a grandmoth...",
    "duration": "01:00",
    "thumbnail": "https://i.ytimg.com/vi/hshjqlY1Hgc/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "6EXjGIQjCEc",
    "title": "Celebrate this Diwali with the Must Try Collections of Majestic Maharaja.",
    "brand": "Majestic Maharaja",
    "description": "🎆💜 Celebrate this Diwali with the Must Try Collections of Maharaja – where every outfit is crafted to make your fes...",
    "duration": "01:31",
    "thumbnail": "https://i.ytimg.com/vi/6EXjGIQjCEc/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "_lDWIiqRgTs",
    "title": "CLINIC PLUS INVINCIBLE - (TAM) - 25SECS",
    "brand": "Clinic Plus",
    "description": "CLINIC PLUS INVINCIBLE - (TAM) - 25SECS",
    "duration": "00:25",
    "thumbnail": "https://i.ytimg.com/vi/_lDWIiqRgTs/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "tyx-tv3z7zQ",
    "title": "Shaadi | Aadi Sale",
    "brand": "Aadi Sale",
    "description": "Shaadi | Aadi Sale",
    "duration": "00:16",
    "thumbnail": "https://i.ytimg.com/vi/tyx-tv3z7zQ/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "Qz5lEgTYP_4",
    "title": "Grand opening | New showrooms at Gowriwakkam & Urappakkam on July 6 Thangamayil Jewellery Limited",
    "brand": "Thangamayil Jewellery",
    "description": "Thangamayil Jewellery – Expanding its golden wings in Chennai We are delighted to announce the grand opening of our n...",
    "duration": "00:42",
    "thumbnail": "https://i.ytimg.com/vi/Qz5lEgTYP_4/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "YIH5HOukIos",
    "title": "#தஞ்சாவூர் பட்டின் தலைநகர் ஆகிறது | ஆதிகாலத்து அலங்கார மாளிகை தஞ்சாவூரில் ஷோரூம் திறப்பு விழா",
    "brand": "Featured Client",
    "description": "பட்டின் ப��ருமையை புதுமையாக அறிமுகப்படுத்தும் நாள்! 🎉 பண்பாட்டு பாரம்பரியத்தின் தலைநகராக திகழும் தஞ்சாவூரில், இப்போத...",
    "duration": "00:59",
    "thumbnail": "https://i.ytimg.com/vi/YIH5HOukIos/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "iythe8WGNis",
    "title": "Discover the Acharya Collection",
    "brand": "Featured Client",
    "description": "We are honoured to partner with the renowned vedic speaker, scholar, and author Dushyanth Sridhar in a landmark initi...",
    "duration": "00:30",
    "thumbnail": "https://i.ytimg.com/vi/iythe8WGNis/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "64J6YnWTB4c",
    "title": "Introducing Srinivasa Kalyanam Collections | Pothys Swarna Mahal",
    "brand": "Pothys",
    "description": "Handcrafted with devotion and inspired by the divine wedding of Lord Srinivasa and Goddess Padmavati, this collection...",
    "duration": "01:05",
    "thumbnail": "https://i.ytimg.com/vi/64J6YnWTB4c/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "YmYmZsJUksw",
    "title": "That's the point | UTT Season 6 Promo",
    "brand": "Ultimate Table Tennis",
    "description": "Every moment is a TT moment. 𝐓𝐡𝐚𝐭'𝐬 𝐭𝐡𝐞 𝐩𝐨𝐢𝐧𝐭 🏓 UTT Season 6 starts May 31! Live on JioHotstar and Star...",
    "duration": "01:21",
    "thumbnail": "https://i.ytimg.com/vi/YmYmZsJUksw/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "VX4VwIXv6VU",
    "title": "Tour the Paradise | Actor Y. G. Mahendran - Actor | Ananya’s Nana Nani Homes | Coimbatore #review",
    "brand": "Ananyas Nana Nani Homes",
    "description": "5n2 Media has been conceived and created with this in mind. With more than 13 years of experience in advertising, cor...",
    "duration": "12:49",
    "thumbnail": "https://i.ytimg.com/vi/VX4VwIXv6VU/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "oyYmSxYe_Qs",
    "title": "The Untold Secret of Silk | Wedding Outfit for Groom - Minister White",
    "brand": "Minister White",
    "description": "Every thread has a story. But some 𝐒𝐢𝐥𝐤𝐬 𝐰𝐡𝐢𝐬𝐩𝐞𝐫 𝐒𝐞𝐜𝐫𝐞𝐭𝐬 𝐨𝐧𝐥𝐲 𝐓𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧 can hear. In ...",
    "duration": "00:30",
    "thumbnail": "https://i.ytimg.com/vi/oyYmSxYe_Qs/mqdefault.jpg",
    "category": "Short Films"
  },
  {
    "id": "Aj9n4js_w_M",
    "title": "Tamil No1 Short News app",
    "brand": "Featured Client",
    "description": "வே2நியூஸ் இன்ஸ்டால் செய்தால் சூடான செய்திகள், பிரேக்கிங் செய்தி, வைரல் வீடியோ பெறலாம் Way2News Tamil App is India’s l...",
    "duration": "00:20",
    "thumbnail": "https://i.ytimg.com/vi/Aj9n4js_w_M/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "__xvQUEdgF4",
    "title": "Way2news Gamer Paatis |No.1 தமி��் ஷார்ட்  நியூஸ் ஆப்",
    "brand": "Way2News",
    "description": "வே2நியூஸ் இன்ஸ்டால் செய்தால் சூடான செய்திகள், பிரேக்கிங் செய்தி, வைரல் வீடியோ பெறலாம் Way2News Tamil App is India’s l...",
    "duration": "00:20",
    "thumbnail": "https://i.ytimg.com/vi/__xvQUEdgF4/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "iIoHTDHy7WI",
    "title": "GRT Brides – The Bridal Collection | Tamil",
    "brand": "GRT Jewellers",
    "description": "💛 Eternal love starts with ‘I Promise’ 💛 Every bride steps into a new chapter with a promise—a promise of love, tog...",
    "duration": "04:35",
    "thumbnail": "https://i.ytimg.com/vi/iIoHTDHy7WI/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "dOhXzePuf7Q",
    "title": "GRT Brides – The Bridal Collection | Telugu",
    "brand": "GRT Jewellers",
    "description": "Your Bridal Dream, Our Timeless Creations 💖 Every sparkle, every intricate detail, crafted to make your wedding day ...",
    "duration": "04:35",
    "thumbnail": "https://i.ytimg.com/vi/dOhXzePuf7Q/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "qI1tR694eJk",
    "title": "My License to ride, for joy-filled journeys- Hero Pleasure+ XTEC Connect",
    "brand": "Hero MotoCorp",
    "description": "Hero Pleasure’s new Pongal campaign celebrates women who put a spin on traditional roles while upholding the traditio...",
    "duration": "00:46",
    "thumbnail": "https://i.ytimg.com/vi/qI1tR694eJk/mqdefault.jpg",
    "category": "Commercials"
  },
  {
    "id": "mbPZzqylPaY",
    "title": "Tour the paradise | Mrs. Uma - Anchor & Artist | Ananya’s Nana Nani Homes",
    "brand": "Ananyas Nana Nani Homes",
    "description": "Ananya Shelters through its signature project Ananya’s Nana Nani Homes envisages an adorable residence for the retire...",
    "duration": "13:01",
    "thumbnail": "https://i.ytimg.com/vi/mbPZzqylPaY/mqdefault.jpg",
    "category": "Corporate"
  }
];

const ShowcasePage = () => {
  const { showcases } = useData();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [category, setCategory] = useState('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const videos = showcases.filter(s => s.status === 'active').map(s => ({
    id: s.id,
    title: s.title,
    brand: s.tags?.[0] || 'Thaara Umesh',
    description: s.description,
    duration: s.duration,
    thumbnail: s.thumbnail,
    category: s.category
  }));

  const categories = ['All Categories', 'Commercials', 'Short Films', 'Corporate', 'Music Videos'];

  const filteredVideos = category === 'All Categories'
    ? videos
    : videos.filter(video => video.category === category);

  const handleLoadMore = () => {
    // Add 12 more items (3 rows)
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Banner Section with Video Loop */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black flex-shrink-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://video.wixstatic.com/video/e67e91_adf523a122b441198b11992625da808f/720p/mp4/file.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 sm:px-6">
          <img src="/images/Thaara_Umesh_Logo.png" alt="Logo" className="h-12 sm:h-16 md:h-24 mb-4 sm:mb-6 opacity-90 drop-shadow-2xl" data-aos="fade-down" />
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white font-bold mb-3 sm:mb-4 drop-shadow-2xl tracking-wide" data-aos="zoom-in">
            Showcase
          </h1>
          <button 
            onClick={() => {
              document.getElementById('video-grid').scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-dark transition-all duration-300 font-semibold tracking-widest text-sm backdrop-blur-md"
          >
            Explore Our Work
          </button>
        </div>
      </section>

      {/* Video Grid Section */}
      <section id="video-grid" className="flex-grow py-16 px-6 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Bar: Title & Dropdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/10 pb-4 mb-6 sm:mb-8" data-aos="fade-up">
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-primary font-bold mb-3 sm:mb-0">
              All Videos
            </h2>

            {/* Custom Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-dark/70 hover:text-primary font-semibold text-sm transition-colors py-2"
              >
                {category} <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/5 shadow-xl rounded-lg py-2 z-30">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => {
                        setCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-secondary/50 hover:text-primary transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.slice(0, visibleCount).map((video, index) => (
              <div 
                key={video.id}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 80}
                className="group cursor-pointer p-2 sm:p-3 rounded-2xl bg-secondary/40 hover:bg-white border border-black/5 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col will-change-transform"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail Container inside the frame */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 sm:mb-4 bg-black shadow-sm transform translate-z-0">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                  />
                  
                  {/* Decorative REC indicator matching homepage Showcase */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-white text-[8px] font-bold tracking-widest drop-shadow-md">REC</span>
                  </div>

                  {/* Play Button - optimized without backdrop blur for performance */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 border border-white/20">
                      <PlayCircle className="text-white w-6 h-6 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration - optimized without backdrop blur */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-[9px] font-bold">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="px-1 flex flex-col flex-grow">
                  <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">{video.brand}</p>
                  <h3 className="text-dark font-serif font-bold text-sm md:text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredVideos.length && (
            <div className="mt-16 text-center">
              <button 
                onClick={handleLoadMore}
                className="relative px-8 py-3 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary"
              >
                <span className="relative z-10 text-white font-bold text-xs tracking-widest uppercase">
                  LOAD MORE
                </span>
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-10 bg-black/90 backdrop-blur-sm">
          {/* Close Area */}
          <div className="absolute inset-0" onClick={() => setSelectedVideo(null)}></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 animate-fade-in-up">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 sm:-top-12 sm:right-0 md:top-4 md:right-4 text-white/50 hover:text-white transition-colors bg-black/70 sm:bg-black/50 md:bg-black/80 p-2 rounded-full z-20"
            >
              <X size={24} />
            </button>

            {/* 16:9 Video Container */}
            <div className="relative w-full aspect-video">
              {selectedVideo.id.length > 11 ? (
                <video 
                  src={`https://video.wixstatic.com/video/${selectedVideo.id}/720p/mp4/file.mp4`}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  autoPlay
                ></video>
              ) : (
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Video Info (Optional, matching screenshot aesthetic to focus on video) */}
            <div className="p-6 bg-dark/90 hidden md:block">
              <h2 className="text-white text-xl font-serif font-bold mb-1">{selectedVideo.title}</h2>
              <p className="text-primary text-sm font-semibold">{selectedVideo.brand}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowcasePage;
