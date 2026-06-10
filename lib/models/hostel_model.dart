class Hostel {
  final String id;
  final String name;
  final String location;
  final String imageUrl;
  final double rating;
  final int reviews;
  final double pricePerNight;
  final String description;
  final List<String> amenities;
  final int availableBeds;
  final bool isVerified;

  Hostel({
    required this.id,
    required this.name,
    required this.location,
    required this.imageUrl,
    required this.rating,
    required this.reviews,
    required this.pricePerNight,
    required this.description,
    required this.amenities,
    required this.availableBeds,
    required this.isVerified,
  });

  factory Hostel.fromJson(Map<String, dynamic> json) {
    return Hostel(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      location: json['location'] as String? ?? '',
      imageUrl: json['imageUrl'] as String? ?? '',
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
      reviews: json['reviews'] as int? ?? 0,
      pricePerNight: (json['pricePerNight'] as num?)?.toDouble() ?? 0.0,
      description: json['description'] as String? ?? '',
      amenities: List<String>.from(json['amenities'] as List? ?? []),
      availableBeds: json['availableBeds'] as int? ?? 0,
      isVerified: json['isVerified'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'location': location,
      'imageUrl': imageUrl,
      'rating': rating,
      'reviews': reviews,
      'pricePerNight': pricePerNight,
      'description': description,
      'amenities': amenities,
      'availableBeds': availableBeds,
      'isVerified': isVerified,
    };
  }

  Hostel copyWith({
    String? id,
    String? name,
    String? location,
    String? imageUrl,
    double? rating,
    int? reviews,
    double? pricePerNight,
    String? description,
    List<String>? amenities,
    int? availableBeds,
    bool? isVerified,
  }) {
    return Hostel(
      id: id ?? this.id,
      name: name ?? this.name,
      location: location ?? this.location,
      imageUrl: imageUrl ?? this.imageUrl,
      rating: rating ?? this.rating,
      reviews: reviews ?? this.reviews,
      pricePerNight: pricePerNight ?? this.pricePerNight,
      description: description ?? this.description,
      amenities: amenities ?? this.amenities,
      availableBeds: availableBeds ?? this.availableBeds,
      isVerified: isVerified ?? this.isVerified,
    );
  }
}
