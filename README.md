# HostelHub

A complete Flutter mobile application that helps university students find and book hostels.

## Features

- **Material Design 3** - Modern and beautiful UI
- **Clean Architecture** - Well-organized code structure
- **Responsive UI** - Works on all screen sizes
- **Bottom Navigation** - Easy navigation between screens
- **Search Functionality** - Search hostels by name or location
- **Hostel Cards** - Beautiful hostel display with ratings and reviews
- **Form Validation** - Comprehensive input validation
- **Reusable Widgets** - DRY code with component-based approach
- **Loading States** - Beautiful loading indicators
- **Error Handling** - Proper error messages and recovery

## Screens

1. **Splash Screen** - App introduction with branding
2. **Login Screen** - User authentication
3. **Registration Screen** - New user account creation
4. **Home Screen** - Browse and search hostels
5. **Hostel Details Screen** - View detailed hostel information
6. **Booking Screen** - Book a hostel with date and room selection
7. **Favorites Screen** - View saved favorite hostels
8. **Profile Screen** - User profile and account management

## Project Structure

```
lib/
├── models/              # Data models (Hostel, User, Booking)
├── screens/             # All app screens
├── widgets/             # Reusable UI components
├── services/            # Business logic & API calls
├── routes/              # Navigation routes
├── utils/               # Constants, validators, extensions
└── main.dart            # App entry point
```

## Models

### Hostel Model
- id, name, location, imageUrl
- rating, reviews, pricePerNight
- description, amenities, availableBeds
- isVerified

### User Model
- id, email, firstName, lastName
- profileImageUrl, phoneNumber
- university, createdAt, isEmailVerified

### Booking Model
- id, userId, hostelId, hostelName
- checkInDate, checkOutDate, numberOfNights
- numberOfBeds, totalPrice, status
- createdAt, specialRequests

## Services

### HostelService
- getAllHostels()
- searchHostels()
- getHostelById()
- getTopRatedHostels()
- getBudgetHostels()
- Favorites management

### AuthService
- login()
- register()
- logout()
- updateProfile()
- verifyEmail()
- resetPassword()

### BookingService
- createBooking()
- getUserBookings()
- getBookingById()
- cancelBooking()
- getBookingSummary()

## Utils

### AppConstants
- Colors (Material Design 3 palette)
- Dimensions (padding, margins, sizes)
- Strings (all app text)

### ValidationUtils
- Email validation
- Password validation
- Phone number validation
- Name validation

### Extensions
- DateTime formatting
- String utilities
- Number formatting

## Getting Started

### Prerequisites
- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Android Studio / Xcode (for emulators)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd HostelHub
```

2. Install dependencies
```bash
flutter pub get
```

3. Run the app
```bash
flutter run
```

### For iOS
```bash
cd ios
pod install
cd ..
flutter run
```

## Architecture

The app follows Clean Architecture principles:

- **Presentation Layer** - Screens and UI components
- **Domain Layer** - Business logic (Services)
- **Data Layer** - Models and data management

## Design System

### Colors
- **Primary**: #6200EE (Purple)
- **Secondary**: #03DAC6 (Teal)
- **Background**: #FFFBFE
- **Error**: #B3261E (Red)

### Typography
- Headlines (24-32px, Bold)
- Body Text (12-16px, Regular)
- Labels (10-14px, Semi-bold)

### Spacing
- Small: 8px
- Medium: 16px
- Large: 24px
- X-Large: 32px

## Key Features Implementation

### Authentication Flow
1. Splash Screen → Login/Register
2. Form validation on input
3. User session management
4. Logout functionality

### Hostel Browsing
1. Display all hostels in grid/list view
2. Real-time search functionality
3. Add to favorites
4. View detailed information

### Booking Flow
1. Select check-in/check-out dates
2. Choose number of beds
3. Add special requests
4. Review pricing
5. Confirm booking

## State Management

Currently uses StatefulWidget for simplicity. For larger apps, consider:
- Provider package
- Riverpod
- BLoC pattern
- GetX

## Testing

The app includes simulated services for testing without backend integration.

Test credentials:
- Email: test@university.edu
- Password: password123

## Future Enhancements

- [ ] Firebase Integration
- [ ] Payment Gateway (Stripe/Razorpay)
- [ ] Real-time chat with hostel owners
- [ ] Rating and reviews
- [ ] Push notifications
- [ ] Offline support
- [ ] Multiple languages
- [ ] Dark mode

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email: support@hostelhub.com

## Author

HostelHub Development Team

---

**Happy Hostel Hunting! 🏠**
