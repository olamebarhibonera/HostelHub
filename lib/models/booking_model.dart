enum BookingStatus { pending, confirmed, cancelled, completed }

class Booking {
  final String id;
  final String userId;
  final String hostelId;
  final String hostelName;
  final DateTime checkInDate;
  final DateTime checkOutDate;
  final int numberOfNights;
  final int numberOfBeds;
  final double totalPrice;
  final BookingStatus status;
  final DateTime createdAt;
  final String? specialRequests;

  Booking({
    required this.id,
    required this.userId,
    required this.hostelId,
    required this.hostelName,
    required this.checkInDate,
    required this.checkOutDate,
    required this.numberOfNights,
    required this.numberOfBeds,
    required this.totalPrice,
    required this.status,
    required this.createdAt,
    this.specialRequests,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] as String? ?? '',
      userId: json['userId'] as String? ?? '',
      hostelId: json['hostelId'] as String? ?? '',
      hostelName: json['hostelName'] as String? ?? '',
      checkInDate: json['checkInDate'] != null
          ? DateTime.parse(json['checkInDate'] as String)
          : DateTime.now(),
      checkOutDate: json['checkOutDate'] != null
          ? DateTime.parse(json['checkOutDate'] as String)
          : DateTime.now(),
      numberOfNights: json['numberOfNights'] as int? ?? 1,
      numberOfBeds: json['numberOfBeds'] as int? ?? 1,
      totalPrice: (json['totalPrice'] as num?)?.toDouble() ?? 0.0,
      status: BookingStatus.values.firstWhere(
        (e) => e.toString() == 'BookingStatus.${json['status']}',
        orElse: () => BookingStatus.pending,
      ),
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : DateTime.now(),
      specialRequests: json['specialRequests'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'hostelId': hostelId,
      'hostelName': hostelName,
      'checkInDate': checkInDate.toIso8601String(),
      'checkOutDate': checkOutDate.toIso8601String(),
      'numberOfNights': numberOfNights,
      'numberOfBeds': numberOfBeds,
      'totalPrice': totalPrice,
      'status': status.toString().split('.').last,
      'createdAt': createdAt.toIso8601String(),
      'specialRequests': specialRequests,
    };
  }

  Booking copyWith({
    String? id,
    String? userId,
    String? hostelId,
    String? hostelName,
    DateTime? checkInDate,
    DateTime? checkOutDate,
    int? numberOfNights,
    int? numberOfBeds,
    double? totalPrice,
    BookingStatus? status,
    DateTime? createdAt,
    String? specialRequests,
  }) {
    return Booking(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      hostelId: hostelId ?? this.hostelId,
      hostelName: hostelName ?? this.hostelName,
      checkInDate: checkInDate ?? this.checkInDate,
      checkOutDate: checkOutDate ?? this.checkOutDate,
      numberOfNights: numberOfNights ?? this.numberOfNights,
      numberOfBeds: numberOfBeds ?? this.numberOfBeds,
      totalPrice: totalPrice ?? this.totalPrice,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      specialRequests: specialRequests ?? this.specialRequests,
    );
  }
}
