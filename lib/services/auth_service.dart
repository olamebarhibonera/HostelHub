import '../models/user_model.dart';

class AuthService {
  static User? _currentUser;
  static bool _isAuthenticated = false;

  // Get current user
  User? getCurrentUser() => _currentUser;

  // Check if user is authenticated
  bool isAuthenticated() => _isAuthenticated;

  // Login
  Future<bool> login(String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 800));

    // Validation
    if (email.isEmpty || password.isEmpty) {
      return false;
    }

    if (!email.contains('@')) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    // Simulate successful login
    _currentUser = User(
      id: '${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      firstName: email.split('@')[0],
      lastName: 'Student',
      phoneNumber: '+1234567890',
      university: 'Tech University',
      createdAt: DateTime.now(),
      isEmailVerified: true,
    );
    _isAuthenticated = true;
    return true;
  }

  // Register
  Future<bool> register({
    required String email,
    required String password,
    required String confirmPassword,
    required String firstName,
    required String lastName,
    required String phoneNumber,
    required String university,
  }) async {
    await Future.delayed(const Duration(milliseconds: 800));

    // Validation
    if (email.isEmpty ||
        password.isEmpty ||
        firstName.isEmpty ||
        lastName.isEmpty) {
      return false;
    }

    if (!email.contains('@')) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    if (password != confirmPassword) {
      return false;
    }

    if (phoneNumber.length < 10) {
      return false;
    }

    // Simulate successful registration
    _currentUser = User(
      id: '${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      university: university,
      createdAt: DateTime.now(),
      isEmailVerified: false,
    );
    _isAuthenticated = true;
    return true;
  }

  // Logout
  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 500));
    _currentUser = null;
    _isAuthenticated = false;
  }

  // Update profile
  Future<bool> updateProfile({
    String? firstName,
    String? lastName,
    String? phoneNumber,
    String? university,
  }) async {
    await Future.delayed(const Duration(milliseconds: 500));

    if (_currentUser == null) return false;

    _currentUser = _currentUser!.copyWith(
      firstName: firstName ?? _currentUser!.firstName,
      lastName: lastName ?? _currentUser!.lastName,
      phoneNumber: phoneNumber ?? _currentUser!.phoneNumber,
      university: university ?? _currentUser!.university,
    );
    return true;
  }

  // Verify email
  Future<bool> verifyEmail(String code) async {
    await Future.delayed(const Duration(milliseconds: 600));

    if (code == '123456') {
      if (_currentUser != null) {
        _currentUser = _currentUser!.copyWith(isEmailVerified: true);
      }
      return true;
    }
    return false;
  }

  // Reset password
  Future<bool> resetPassword(String email) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return email.contains('@');
  }
}
