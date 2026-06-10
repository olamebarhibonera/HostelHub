import '../models/hostel_model.dart';

class HostelService {
  // Simulated database
  static final List<Hostel> _hostels = [
    Hostel(
      id: '1',
      name: 'Urban Nest Hostel',
      location: 'Downtown District',
      imageUrl: 'https://via.placeholder.com/300x200?text=Urban+Nest',
      rating: 4.5,
      reviews: 128,
      pricePerNight: 25.0,
      description:
          'Modern hostel with comfortable beds and vibrant social atmosphere. Perfect for students.',
      amenities: ['WiFi', 'Kitchen', 'Laundry', 'Common Room', 'Security'],
      availableBeds: 12,
      isVerified: true,
    ),
    Hostel(
      id: '2',
      name: 'Campus Stays',
      location: 'University Area',
      imageUrl: 'https://via.placeholder.com/300x200?text=Campus+Stays',
      rating: 4.2,
      reviews: 95,
      pricePerNight: 20.0,
      description:
          'Budget-friendly hostel near campus. Quiet and clean environment.',
      amenities: ['WiFi', 'Study Area', 'Hot Showers', 'Storage'],
      availableBeds: 8,
      isVerified: true,
    ),
    Hostel(
      id: '3',
      name: 'Social Hub Hostel',
      location: 'Entertainment District',
      imageUrl: 'https://via.placeholder.com/300x200?text=Social+Hub',
      rating: 4.7,
      reviews: 156,
      pricePerNight: 30.0,
      description:
          'Vibrant hostel with rooftop bar and event spaces. Great for making friends.',
      amenities: [
        'WiFi',
        'Bar',
        'Rooftop',
        'Kitchen',
        'Lounge',
        'Activities'
      ],
      availableBeds: 15,
      isVerified: true,
    ),
    Hostel(
      id: '4',
      name: 'Cozy Corner',
      location: 'Residential Area',
      imageUrl: 'https://via.placeholder.com/300x200?text=Cozy+Corner',
      rating: 3.8,
      reviews: 62,
      pricePerNight: 18.0,
      description:
          'Comfortable and affordable. Homely atmosphere with friendly staff.',
      amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking'],
      availableBeds: 6,
      isVerified: false,
    ),
    Hostel(
      id: '5',
      name: 'Tech Hub Hostel',
      location: 'Business District',
      imageUrl: 'https://via.placeholder.com/300x200?text=Tech+Hub',
      rating: 4.4,
      reviews: 110,
      pricePerNight: 28.0,
      description:
          'Modern amenities with high-speed internet. Ideal for tech-savvy students.',
      amenities: [
        'High-Speed WiFi',
        'Workspace',
        'Charging Stations',
        'Lockers'
      ],
      availableBeds: 10,
      isVerified: true,
    ),
    Hostel(
      id: '6',
      name: 'Green Hostel',
      location: 'Near Park',
      imageUrl: 'https://via.placeholder.com/300x200?text=Green+Hostel',
      rating: 4.3,
      reviews: 87,
      pricePerNight: 22.0,
      description:
          'Eco-friendly hostel with sustainable practices. Peaceful environment.',
      amenities: ['WiFi', 'Recycling', 'Garden', 'Bicycle Rental'],
      availableBeds: 9,
      isVerified: true,
    ),
  ];

  static final List<String> _favorites = [];

  // Get all hostels
  Future<List<Hostel>> getAllHostels() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _hostels;
  }

  // Search hostels
  Future<List<Hostel>> searchHostels(String query) async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (query.isEmpty) return _hostels;
    return _hostels
        .where((hostel) =>
            hostel.name.toLowerCase().contains(query.toLowerCase()) ||
            hostel.location.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }

  // Get hostel by ID
  Future<Hostel?> getHostelById(String id) async {
    await Future.delayed(const Duration(milliseconds: 300));
    try {
      return _hostels.firstWhere((hostel) => hostel.id == id);
    } catch (e) {
      return null;
    }
  }

  // Get top rated hostels
  Future<List<Hostel>> getTopRatedHostels({int limit = 5}) async {
    await Future.delayed(const Duration(milliseconds: 500));
    final sorted = List<Hostel>.from(_hostels);
    sorted.sort((a, b) => b.rating.compareTo(a.rating));
    return sorted.take(limit).toList();
  }

  // Get budget hostels
  Future<List<Hostel>> getBudgetHostels(
      {double maxPrice = 25.0, int limit = 5}) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _hostels
        .where((hostel) => hostel.pricePerNight <= maxPrice)
        .take(limit)
        .toList();
  }

  // Add to favorites
  void addToFavorites(String hostelId) {
    if (!_favorites.contains(hostelId)) {
      _favorites.add(hostelId);
    }
  }

  // Remove from favorites
  void removeFromFavorites(String hostelId) {
    _favorites.remove(hostelId);
  }

  // Get favorites
  Future<List<Hostel>> getFavorites() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return _hostels
        .where((hostel) => _favorites.contains(hostel.id))
        .toList();
  }

  // Check if hostel is favorited
  bool isFavorited(String hostelId) {
    return _favorites.contains(hostelId);
  }
}
