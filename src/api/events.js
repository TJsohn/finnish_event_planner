const isProduction = import.meta.env.MODE === "production";

export async function fetchEventById(id) {
  if (isProduction) {
    // Static/mock data for production
    const events = [
      {
        id: "1",
        title: "Sample Event",
        startDate: "2025-06-12",
        endDate: "2025-06-12",
        startTime: "10:00",
        endTime: "12:00",
        location: "Helsinki",
        address: "Main Street 1",
        category: "music",
        description: "A fun music event.",
        imageUrl: "",
      },
      // ...add more events as needed
    ];
    return events.find((e) => e.id === id);
  } else {
    // Fetch from local API in development
    const res = await fetch(`http://localhost:3001/events/${id}`);
    if (!res.ok) throw new Error("Event not found");
    return res.json();
  }
}
