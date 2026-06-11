import { HostelLogo } from "@/components/HostelLogo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/(auth)/login"), 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={["#1a56db", "#1d4ed8", "#1e40af"]}
      className="flex-1"
    >
      <View className="absolute top-[-80px] right-[-60px] w-64 h-64 rounded-full bg-white/5" />
      <View className="absolute bottom-[-60px] left-[-80px] w-80 h-80 rounded-full bg-white/5" />

      <View className="flex-1 items-center justify-center gap-6">
        <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center shadow-lg">
          <HostelLogo size={52} />
        </View>
        <View className="items-center">
          <Text className="text-white text-4xl font-jakarta tracking-tight">HostelHub</Text>
          <Text className="text-blue-200 mt-2 text-base font-dm-sans">Your home away from home</Text>
        </View>
      </View>

      <View
        className="px-8 gap-4 items-center"
        style={{ paddingBottom: insets.bottom + 48 }}
      >
        <Text className="text-blue-100 text-center text-sm font-dm-sans">
          Find, compare & book student hostels near your campus
        </Text>
        <Pressable
          onPress={() => router.replace("/(auth)/login")}
          className="w-full py-4 bg-white rounded-2xl items-center active:opacity-90"
        >
          <Text className="text-primary text-base font-jakarta">Get Started</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
