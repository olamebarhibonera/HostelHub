import 'package:flutter/material.dart';

class AppColors {
  // Primary colors
  static const Color primary = Color(0xFF6200EE);
  static const Color primaryLight = Color(0xFF7C3AED);
  static const Color primaryDark = Color(0xFF4C0BD9);

  // Secondary colors
  static const Color secondary = Color(0xFF03DAC6);
  static const Color secondaryLight = Color(0xFF4DD0E1);
  static const Color secondaryDark = Color(0xFF00BCD4);

  // Neutral colors
  static const Color background = Color(0xFFFFFBFE);
  static const Color surface = Color(0xFFFEF7FF);
  static const Color error = Color(0xFFB3261E);
  static const Color onBackground = Color(0xFF1C1B1F);
  static const Color onSurface = Color(0xFF1C1B1F);

  // Additional colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color grey = Color(0xFF9E9E9E);
  static const Color greyLight = Color(0xFFE0E0E0);
  static const Color greyDark = Color(0xFF616161);

  // Status colors
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFFC107);
  static const Color info = Color(0xFF2196F3);

  // Rating colors
  static const Color ratingGold = Color(0xFFFFB800);

  // Transparent
  static const Color transparent = Color(0x00000000);
}

class AppDimensions {
  // Padding/Margin
  static const double paddingXSmall = 4.0;
  static const double paddingSmall = 8.0;
  static const double paddingMedium = 16.0;
  static const double paddingLarge = 24.0;
  static const double paddingXLarge = 32.0;

  // Border radius
  static const double radiusSmall = 4.0;
  static const double radiusMedium = 8.0;
  static const double radiusLarge = 12.0;
  static const double radiusXLarge = 16.0;
  static const double radiusCircular = 999.0;

  // Icon sizes
  static const double iconSmall = 16.0;
  static const double iconMedium = 24.0;
  static const double iconLarge = 32.0;
  static const double iconXLarge = 48.0;

  // Button sizes
  static const double buttonHeightSmall = 36.0;
  static const double buttonHeightMedium = 44.0;
  static const double buttonHeightLarge = 52.0;

  // Card sizes
  static const double cardHeight = 200.0;
  static const double cardImageHeight = 120.0;

  // Elevation
  static const double elevationSmall = 2.0;
  static const double elevationMedium = 4.0;
  static const double elevationLarge = 8.0;
}

class AppStrings {
  // App
  static const String appName = 'HostelHub';
  static const String appTagline = 'Find Your Perfect Hostel';

  // Authentication
  static const String login = 'Login';
  static const String register = 'Register';
  static const String logout = 'Logout';
  static const String email = 'Email';
  static const String password = 'Password';
  static const String confirmPassword = 'Confirm Password';
  static const String firstName = 'First Name';
  static const String lastName = 'Last Name';
  static const String phoneNumber = 'Phone Number';
  static const String university = 'University';
  static const String forgotPassword = 'Forgot Password?';
  static const String dontHaveAccount = 'Don\'t have an account?';
  static const String haveAccount = 'Already have an account?';
  static const String signUp = 'Sign Up';
  static const String loginSuccess = 'Login Successful!';
  static const String registerSuccess = 'Registration Successful!';

  // Validation
  static const String enterEmail = 'Please enter your email';
  static const String enterValidEmail = 'Please enter a valid email';
  static const String enterPassword = 'Please enter your password';
  static const String passwordTooShort = 'Password must be at least 6 characters';
  static const String passwordMismatch = 'Passwords do not match';
  static const String enterFirstName = 'Please enter your first name';
  static const String enterLastName = 'Please enter your last name';
  static const String enterPhoneNumber = 'Please enter your phone number';
  static const String selectUniversity = 'Please select your university';

  // Navigation
  static const String home = 'Home';
  static const String favorites = 'Favorites';
  static const String bookings = 'Bookings';
  static const String profile = 'Profile';

  // Hostel
  static const String hostels = 'Hostels';
  static const String hostelDetails = 'Hostel Details';
  static const String search = 'Search';
  static const String filter = 'Filter';
  static const String rating = 'Rating';
  static const String price = 'Price';
  static const String pricePerNight = 'Per Night';
  static const String availableBeds = 'Available Beds';
  static const String amenities = 'Amenities';
  static const String description = 'Description';
  static const String verified = 'Verified';
  static const String notAvailable = 'Not Available';
  static const String topRated = 'Top Rated';
  static const String budget = 'Budget Friendly';

  // Booking
  static const String booking = 'Booking';
  static const String bookNow = 'Book Now';
  static const String checkIn = 'Check In';
  static const String checkOut = 'Check Out';
  static const String numberOfNights = 'Number of Nights';
  static const String numberOfBeds = 'Number of Beds';
  static const String totalPrice = 'Total Price';
  static const String specialRequests = 'Special Requests';
  static const String bookingConfirmed = 'Booking Confirmed!';
  static const String bookingPending = 'Booking Pending';
  static const String bookingCancelled = 'Booking Cancelled';
  static const String cancelBooking = 'Cancel Booking';

  // Profile
  static const String myProfile = 'My Profile';
  static const String editProfile = 'Edit Profile';
  static const String myBookings = 'My Bookings';
  static const String settings = 'Settings';
  static const String help = 'Help';
  static const String about = 'About';
  static const String privacyPolicy = 'Privacy Policy';
  static const String termsConditions = 'Terms & Conditions';

  // Common
  static const String save = 'Save';
  static const String cancel = 'Cancel';
  static const String delete = 'Delete';
  static const String edit = 'Edit';
  static const String done = 'Done';
  static const String back = 'Back';
  static const String next = 'Next';
  static const String loading = 'Loading...';
  static const String error = 'Error';
  static const String noData = 'No Data Available';
  static const String tryAgain = 'Try Again';
  static const String success = 'Success';
  static const String warning = 'Warning';
  static const String info = 'Information';
  static const String noInternet = 'No Internet Connection';
  static const String somethingWentWrong = 'Something went wrong!';
}
