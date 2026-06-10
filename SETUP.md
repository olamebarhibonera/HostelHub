# HostelHub Flutter App

## Project Setup Instructions

### Prerequisites
- Flutter SDK 3.0.0 or higher
- Dart 3.0.0 or higher
- Android SDK (for Android development)
- Xcode (for iOS development on macOS)

### Installation Steps

1. **Get Flutter**
   ```bash
   # Download from https://flutter.dev/docs/get-started/install
   # Add Flutter to PATH
   ```

2. **Get Dependencies**
   ```bash
   cd HostelHub
   flutter pub get
   ```

3. **Run the App**
   ```bash
   flutter run
   ```

4. **Build for Release**
   ```bash
   # Android
   flutter build apk --release
   
   # iOS
   flutter build ios --release
   ```

### Project Configuration

#### Android Setup
1. Update `android/app/build.gradle` with your package name
2. Update `android/app/src/main/AndroidManifest.xml`
3. Generate signed APK for Play Store

#### iOS Setup
1. Open `ios/Runner.xcworkspace` in Xcode
2. Update Bundle Identifier
3. Configure signing credentials
4. Update deployment target

### Environment Variables
Create `.env` file in project root:
```
API_URL=http://your-api-url
API_KEY=your-api-key
```

### Useful Commands

```bash
# Clean build
flutter clean

# Get dependencies
flutter pub get

# Run with specific device
flutter run -d <device-id>

# Run in release mode
flutter run --release

# Build APK
flutter build apk

# Build iOS
flutter build ios

# Run tests
flutter test

# Generate code (if using build_runner)
flutter pub run build_runner build
```

### Common Issues

1. **Pod issues (iOS)**
   ```bash
   cd ios
   pod install --repo-update
   cd ..
   ```

2. **Build cache issues**
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

3. **Device not found**
   ```bash
   flutter devices
   flutter emulators
   ```

### Next Steps

1. **Backend Integration**
   - Replace mock services with real API calls
   - Add error handling
   - Implement proper authentication

2. **Firebase Setup**
   - Configure Firebase project
   - Add google-services.json (Android)
   - Add GoogleService-Info.plist (iOS)
   - Implement Firebase Authentication
   - Set up Firestore database

3. **Payment Integration**
   - Add Stripe or Razorpay SDK
   - Implement payment flow
   - Add transaction history

4. **Testing**
   - Write unit tests for services
   - Add widget tests for UI
   - Implement integration tests

### Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Material Design 3 Guide](https://m3.material.io/)
- [Firebase for Flutter](https://firebase.flutter.dev/)
- [Pub.dev Packages](https://pub.dev/)

### Support

For issues or questions:
- Check Flutter documentation
- Search existing GitHub issues
- Create new issue with details

---

Enjoy building! 🚀
