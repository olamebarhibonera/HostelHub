export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  userId: string;
  hostelId: string;
  hostelName: string;
  hostelImage: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfMonths: number;
  roomType: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  reference: string;
  specialRequests?: string;
}
