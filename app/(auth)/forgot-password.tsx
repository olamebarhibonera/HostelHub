import { authService } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft, Mail } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    setLoading(true);
    const ok = await authService.resetPassword(email.trim());
    setLoading(false);
    if (ok) {
      Alert.alert("Success", "Reset link sent to your email.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", "Please enter a valid email address.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" keyboardShouldPersistTaps="handled">
      <LinearGradient
        colors={["#1a56db", "#1e40af"]}
        className="px-6 rounded-b-[2.5rem]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
      >
        <Pressable onPress={() => router.back()} className="flex-row items-center gap-1 mb-6">
          <ChevronLeft size={20} color="#bfdbfe" />
          <Text className="text-blue-200 text-sm font-dm-sans">Back</Text>
        </Pressable>
        <Text className="text-white text-3xl font-jakarta">Reset Password</Text>
        <Text className="text-blue-200 mt-1 text-sm font-dm-sans">
          Enter your email and we'll send you a reset link
        </Text>
      </LinearGradient>

      <View className="px-6 pt-8 gap-6">
        <View>
          <Text className="text-foreground text-sm font-dm-sans-medium mb-2">Email Address</Text>
          <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
            <Mail size={18} color="#1a56db" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@university.edu"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 py-4 text-foreground font-dm-sans text-[15px]"
            />
          </View>
        </View>

        <Pressable
          onPress={handleReset}
          disabled={loading}
          className="w-full py-4 bg-primary rounded-2xl items-center active:opacity-90"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-jakarta">Send Reset Link</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
