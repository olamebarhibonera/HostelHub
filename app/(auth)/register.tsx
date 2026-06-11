import { useApp } from "@/contexts/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react-native";
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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useApp();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("University of Nairobi");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const parts = fullName.trim().split(" ");
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || "Student";

    setLoading(true);
    const ok = await register({
      email: email.trim(),
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber: phone.trim(),
      university: university.trim(),
    });
    setLoading(false);

    if (ok) {
      router.replace("/(tabs)/home");
    } else {
      Alert.alert(
        "Registration failed",
        "Please fill all fields correctly. Password must be at least 6 characters and match confirmation."
      );
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
        <Text className="text-white text-3xl font-jakarta">Create account</Text>
        <Text className="text-blue-200 mt-1 text-sm font-dm-sans">
          Join thousands of students finding their perfect hostel
        </Text>
      </LinearGradient>

      <View className="px-6 pt-8 pb-6 gap-4">
        {[
          { label: "Full Name", icon: User, value: fullName, onChange: setFullName, placeholder: "John Doe" },
          { label: "Email Address", icon: Mail, value: email, onChange: setEmail, placeholder: "you@university.edu", keyboard: "email-address" as const },
          { label: "Phone Number", icon: Phone, value: phone, onChange: setPhone, placeholder: "+254 712 345 678", keyboard: "phone-pad" as const },
        ].map((field) => (
          <View key={field.label}>
            <Text className="text-foreground text-sm font-dm-sans-medium mb-2">{field.label}</Text>
            <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
              <field.icon size={18} color="#1a56db" />
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={field.placeholder}
                placeholderTextColor="#9ca3af"
                keyboardType={field.keyboard}
                autoCapitalize="none"
                className="flex-1 py-4 text-foreground font-dm-sans text-[15px]"
              />
            </View>
          </View>
        ))}

        <View>
          <Text className="text-foreground text-sm font-dm-sans-medium mb-2">University</Text>
          <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
            <User size={18} color="#1a56db" />
            <TextInput
              value={university}
              onChangeText={setUniversity}
              placeholder="Your university"
              placeholderTextColor="#9ca3af"
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
              placeholder="Min 6 characters"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              className="flex-1 py-4 text-foreground font-dm-sans text-[15px]"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
            </Pressable>
          </View>
        </View>

        <View>
          <Text className="text-foreground text-sm font-dm-sans-medium mb-2">Confirm Password</Text>
          <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
            <Lock size={18} color="#1a56db" />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repeat your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showConfirm}
              className="flex-1 py-4 text-foreground font-dm-sans text-[15px]"
            />
            <Pressable onPress={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
            </Pressable>
          </View>
        </View>

        <Text className="text-gray-500 text-xs font-dm-sans">
          By registering, you agree to our Terms of Service and Privacy Policy
        </Text>

        <Pressable
          onPress={handleRegister}
          disabled={loading}
          className="w-full py-4 bg-primary rounded-2xl items-center mt-2 active:opacity-90"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-jakarta">Create Account</Text>
          )}
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-500 text-sm font-dm-sans">Already have an account? </Text>
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-sm font-dm-sans-medium">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
