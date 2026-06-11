import { HostelLogo } from "@/components/HostelLogo";
import { useApp } from "@/contexts/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useApp();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const ok = await login(email.trim(), password);
    setLoading(false);
    if (ok) {
      router.replace("/(tabs)/home");
    } else {
      Alert.alert("Login failed", "Please enter a valid email and password (min 6 characters).");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" keyboardShouldPersistTaps="handled">
      <LinearGradient
        colors={["#1a56db", "#1e40af"]}
        className="px-6 rounded-b-[2.5rem]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 48 }}
      >
        <View className="flex-row items-center gap-3 mb-8">
          <View className="w-10 h-10 bg-white rounded-xl items-center justify-center">
            <HostelLogo size={22} />
          </View>
          <Text className="text-white text-xl font-jakarta">HostelHub</Text>
        </View>
        <Text className="text-white text-3xl font-jakarta">Welcome back!</Text>
        <Text className="text-blue-200 mt-1 text-sm font-dm-sans">
          Sign in to continue finding your perfect hostel
        </Text>
      </LinearGradient>

      <View className="px-6 pt-8 pb-6 gap-5">
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

        <View>
          <Text className="text-foreground text-sm font-dm-sans-medium mb-2">Password</Text>
          <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
            <Lock size={18} color="#1a56db" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              className="flex-1 py-4 text-foreground font-dm-sans text-[15px]"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => router.push("/(auth)/forgot-password")} className="self-end">
          <Text className="text-primary text-sm font-dm-sans-medium">Forgot Password?</Text>
        </Pressable>

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-primary rounded-2xl items-center mt-2 active:opacity-90"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-jakarta">Sign In</Text>
          )}
        </Pressable>

        <View className="flex-row items-center gap-3 my-1">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-gray-400 text-sm font-dm-sans">or continue with</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <Pressable className="w-full py-4 bg-white rounded-2xl border border-gray-200 flex-row items-center justify-center gap-3 active:opacity-90">
          <Text className="text-foreground font-dm-sans-medium">Continue with Google</Text>
        </Pressable>

        <View className="flex-row justify-center pt-4">
          <Text className="text-gray-500 text-sm font-dm-sans">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text className="text-primary text-sm font-dm-sans-medium">Register</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
