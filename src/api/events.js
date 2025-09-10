const isProduction = import.meta.env.MODE === "production";

const mockEvents = [
  {
    id: "1",
    title: "Neighborhood Summer BBQ",
    location: "Helsinki",
    address: "Töölönlahdenkatu 4",
    postalCode: "00100",
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    description:
      "Community BBQ with traditional Finnish grilling and local neighbors.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/53148/shish-kebab-meat-skewer-vegetable-skewer-meat-products-53148.jpeg",
    startTime: "15:00",
    endTime: "19:00",
  },
  {
    id: "3",
    title: "Coffee & Stories Morning",
    location: "Vantaa",
    address: "Kielotie 13",
    postalCode: "01300",
    startDate: "2025-06-28",
    endDate: "2025-06-28",
    description:
      "Share life stories and experiences over freshly brewed coffee and pastries.",
    category: "education",
    imageUrl:
      "https://images.pexels.com/photos/6248655/pexels-photo-6248655.jpeg",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: "4",
    title: "Green Tech Garden Party",
    location: "Helsinki",
    address: "Lutherinkatu 3",
    postalCode: "00100",
    startDate: "2025-08-02",
    endDate: "2025-08-02",
    description:
      "Outdoor gathering showcasing local eco-friendly innovations and sustainability tips.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/3228761/pexels-photo-3228761.jpeg",
    startTime: "14:00",
    endTime: "18:00",
  },
  {
    id: "5",
    title: "Midsummer Celebration",
    location: "Espoo",
    address: "Kulttuuriaukio 2",
    postalCode: "02100",
    startDate: "2025-06-21",
    endDate: "2025-06-21",
    description:
      "Traditional Finnish Midsummer celebration with bonfire, dancing, and local food.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/26733642/pexels-photo-26733642.jpeg",
    startTime: "18:00",
    endTime: "23:00",
  },
  {
    id: "6",
    title: "Community Garden Workshop",
    location: "Helsinki",
    address: "Unioninkatu 36",
    postalCode: "00170",
    startDate: "2025-06-21",
    endDate: "2025-06-22",
    description:
      "Learn organic gardening and share homegrown vegetables with neighbors.",
    category: "technology",
    imageUrl:
      "https://images.pexels.com/photos/5709305/pexels-photo-5709305.jpeg",
    startTime: "10:00",
    endTime: "15:00",
  },
  {
    id: "7",
    title: "Remote Work Sauna Evening",
    location: "Vantaa",
    address: "Kuusijärventie 11",
    postalCode: "01260",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    description:
      "Sauna session and casual discussion about remote work culture and tips.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/9143566/pexels-photo-9143566.jpeg",
    startTime: "17:00",
    endTime: "21:00",
  },
  {
    id: "8",
    title: "Farmers Market Breakfast",
    location: "Helsinki",
    address: "Yliopistonkatu 4",
    postalCode: "00100",
    startDate: "2025-07-05",
    endDate: "2025-07-05",
    description:
      "Community breakfast featuring local produce and homemade goods.",
    category: "technology",
    imageUrl:
      "https://images.pexels.com/photos/8541364/pexels-photo-8541364.jpeg",
    startTime: "08:30",
    endTime: "11:00",
  },
  {
    id: "9",
    title: "Outdoor Movie Night",
    location: "Espoo",
    address: "Ahertajankatu 5",
    postalCode: "02100",
    startDate: "2025-08-23",
    endDate: "2025-08-23",
    description:
      "Watch a classic film under the stars with popcorn and local snacks.",
    category: "entertainment",
    imageUrl:
      "https://images.pexels.com/photos/8789703/pexels-photo-8789703.jpeg",
    startTime: "21:00",
    endTime: "23:30",
  },
  {
    id: "10",
    title: "Traditional Crafts Circle",
    location: "Helsinki",
    address: "Töölönlahdenkatu 2",
    postalCode: "00100",
    startDate: "2025-08-09",
    endDate: "2025-08-09",
    description:
      "Learn traditional Finnish handicrafts like knitting and woodworking.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/11719332/pexels-photo-11719332.jpeg",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "11",
    title: "Summer Jazz Jam Session",
    location: "Helsinki",
    address: "Puistokatu",
    postalCode: "00140",
    startDate: "2025-07-19",
    endDate: "2025-07-19",
    description:
      "Outdoor jazz jam session with local musicians and music lovers.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/9418567/pexels-photo-9418567.jpeg",
    startTime: "16:00",
    endTime: "20:00",
  },
  {
    id: "12",
    title: "Morning Run Club",
    location: "Espoo",
    address: "Keskuspuisto",
    postalCode: "02100",
    startDate: "2025-06-07",
    endDate: "2025-08-30",
    description: "Weekly morning runs through the park for all fitness levels.",
    category: "sport",
    imageUrl:
      "https://images.pexels.com/photos/8691698/pexels-photo-8691698.jpeg",
    startTime: "07:00",
    endTime: "08:30",
  },
  {
    id: "13",
    title: "Finnish Language Café",
    location: "Vantaa",
    address: "Jokiniemenkatu 7",
    postalCode: "01300",
    startDate: "2025-07-08",
    endDate: "2025-07-08",
    description:
      "Casual Finnish conversation practice over coffee and traditional pastries.",
    category: "education",
    imageUrl:
      "https://images.pexels.com/photos/1475001/pexels-photo-1475001.jpeg",
    startTime: "18:00",
    endTime: "20:00",
  },
  {
    id: "14",
    title: "Urban Nature Walk",
    location: "Helsinki",
    address: "Suomenlinna",
    postalCode: "00190",
    startDate: "2025-06-14",
    endDate: "2025-06-14",
    description:
      "Guided walk exploring Helsinki's hidden natural spots and local history.",
    category: "travel",
    imageUrl:
      "https://images.pexels.com/photos/5553060/pexels-photo-5553060.jpeg",
    startTime: "10:00",
    endTime: "13:00",
  },
  {
    id: "15",
    title: "Comedy Open Mic Night",
    location: "Espoo",
    address: "Tapiolankatu",
    postalCode: "02100",
    startDate: "2025-08-16",
    endDate: "2025-08-16",
    description:
      "Friendly open mic night for aspiring comedians and comedy lovers.",
    category: "entertainment",
    imageUrl:
      "https://images.pexels.com/photos/10078868/pexels-photo-10078868.jpeg",
    startTime: "19:30",
    endTime: "21:30",
  },
  {
    id: "16",
    title: "Football Skills Practice",
    location: "Vantaa",
    address: "Iskoskuja 3",
    postalCode: "01600",
    startDate: "2025-07-13",
    endDate: "2025-07-13",
    description:
      "Casual football skills practice and friendly matches for all ages.",
    category: "sport",
    imageUrl:
      "https://images.pexels.com/photos/8941627/pexels-photo-8941627.jpeg",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: "17",
    title: "Sami Culture Storytelling Evening",
    location: "Helsinki",
    address: "Mannerheimintie 34",
    postalCode: "00100",
    startDate: "2025-08-01",
    endDate: "2025-08-01",
    description:
      "Evening of traditional Sami stories, crafts, and cultural sharing.",
    category: "culture",
    imageUrl:
      "https://images.pexels.com/photos/8913277/pexels-photo-8913277.jpeg",
    startTime: "18:00",
    endTime: "20:30",
  },
  {
    id: "19",
    title: "Community Potluck Dinner",
    location: "Espoo",
    address: "Otakaari 1",
    postalCode: "02150",
    startDate: "2025-06-29",
    endDate: "2025-06-29",
    description:
      "Everyone brings a dish to share in this friendly neighborhood gathering.",
    category: "travel",
    imageUrl:
      "https://images.pexels.com/photos/7220804/pexels-photo-7220804.jpeg",
    startTime: "17:00",
    endTime: "20:00",
  },
  {
    id: "ddec",
    title: "BBQ",
    date: "2025-06-11",
    address: "Atlantinkatu 12A",
    postalCode: "00220",
    location: "Helsinki",
    description: "BBQ",
    category: "entertainment",
    startTime: "14:30",
    endTime: "15:33",
    imageUrl: "",
    startDate: "2025-06-13",
    endDate: "2025-06-20",
  },
];

export async function fetchEvents() {
  if (isProduction) {
    return mockEvents;
  } else {
    // Fetch from local API in development
    const res = await fetch(`http://localhost:3001/events`);
    if (!res.ok) throw new Error("Events not found");
    return res.json();
  }
}
