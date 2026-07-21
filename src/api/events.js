const isProduction = import.meta.env.MODE === "production";

export async function fetchEvents() {
  if (isProduction) {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/events.json`);
    
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  } else {
    const res = await fetch("http://localhost:3001/events");
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  }
}

export async function fetchEventById(id) {
  if (isProduction) {
    const res = await fetch(`${import.meta.env.BASE_URL}events.json`);
    if (!res.ok) throw new Error("Event not found");
    const events = await res.json();
    return events.find((e) => String(e.id) === String(id));
  } else {
    const res = await fetch(`http://localhost:3001/events/${id}`);
    if (!res.ok) throw new Error("Event not found");
    return res.json();
  }
}