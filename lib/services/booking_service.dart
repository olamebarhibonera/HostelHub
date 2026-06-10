import '../models/booking_model.dart';

class BookingService {
  static final List<Booking> _bookings = [];

  // Create booking
  Future<bool> createBooking(Booking booking) async {
    await Future.delayed(const Duration(milliseconds: 800));

    if (booking.numberOfNights <= 0 || booking.numberOfBeds <= 0) {
      return false;
    }

    _bookings.add(booking);
    return true;
  }

  // Get user bookings
  Future<List<Booking>> getUserBookings(String userId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _bookings.where((booking) => booking.userId == userId).toList();
  }

  // Get booking by ID
  Future<Booking?> getBookingById(String bookingId) async {
    await Future.delayed(const Duration(milliseconds: 300));
    try {
      return _bookings.firstWhere((booking) => booking.id == bookingId);
    } catch (e) {
      return null;
    }
  }

  // Cancel booking
  Future<bool> cancelBooking(String bookingId) async {
    await Future.delayed(const Duration(milliseconds: 600));

    try {
      final index = _bookings.indexWhere((b) => b.id == bookingId);
      if (index != -1) {
        _bookings[index] = _bookings[index].copyWith(
          status: BookingStatus.cancelled,
        );
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // Get booking summary
  Future<Map<String, dynamic>> getBookingSummary(String userId) async {
    await Future.delayed(const Duration(milliseconds: 400));

    final userBookings =
        _bookings.where((booking) => booking.userId == userId).toList();

    return {
      'totalBookings': userBookings.length,
      'upcomingBookings': userBookings
          .where((b) => b.status == BookingStatus.confirmed)
          .length,
      'completedBookings': userBookings
          .where((b) => b.status == BookingStatus.completed)
          .length,
      'cancelledBookings': userBookings
          .where((b) => b.status == BookingStatus.cancelled)
          .length,
      'totalSpent': userBookings.fold(0.0, (sum, b) => sum + b.totalPrice),
    };
  }
}
