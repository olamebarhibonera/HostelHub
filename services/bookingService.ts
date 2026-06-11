import { Booking, BookingStatus } from "@/models/booking";
import { hostels } from "@/data/hostels";

const bookings: Booking[] = [
  {
    id: "b1",
    userId: "demo",
    hostelId: "1",
    hostelName: hostels[0].name,
    hostelImage: hostels[0].image,
    checkInDate: new Date("2026-01-01"),
    checkOutDate: new Date("2026-06-30"),
    numberOfMonths: 6,
    roomType: "Single Room",
    totalPrice: hostels[0].price * 6,
    status: "confirmed",
    createdAt: new Date("2025-12-15"),
    reference: "BK-2026-00892",
  },
  {
    id: "b2",
    userId: "demo",
    hostelId: "2",
    hostelName: hostels[1].name,
    hostelImage: hostels[1].image,
    checkInDate: new Date("2025-07-01"),
    checkOutDate: new Date("2025-12-31"),
    numberOfMonths: 6,
    roomType: "Shared Room",
    totalPrice: hostels[1].price * 6,
    status: "completed",
    createdAt: new Date("2025-06-20"),
    reference: "BK-2025-00441",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const bookingService = {
  async createBooking(booking: Omit<Booking, "id" | "createdAt" | "reference">): Promise<Booking | null> {
    await delay(800);
    if (booking.numberOfMonths <= 0) return null;

    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      createdAt: new Date(),
      reference: `BK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`,
    };
    bookings.push(newBooking);
    return newBooking;
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    await delay(500);
    return bookings.filter((b) => b.userId === userId || b.userId === "demo");
  },

  async getBookingById(bookingId: string): Promise<Booking | null> {
    await delay(300);
    return bookings.find((b) => b.id === bookingId) ?? null;
  },

  async cancelBooking(bookingId: string): Promise<boolean> {
    await delay(600);
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index === -1) return false;
    bookings[index] = { ...bookings[index], status: "cancelled" as BookingStatus };
    return true;
  },

  getStatusLabel(status: BookingStatus): string {
    switch (status) {
      case "confirmed":
        return "Active";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  },
};
