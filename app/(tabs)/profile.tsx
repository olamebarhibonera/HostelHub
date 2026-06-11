import { useApp } from "@/contexts/AppContext";
import { getInitials } from "@/models/user";
import { bookingService } from "@/services/bookingService";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bell, ChevronRight, HelpCircle, LogOut, Shield } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const settings = [
  { icon: Bell, label: "Notifications", desc: "Manage your alerts" },
  { icon: Shield, label: "Privacy & Security", desc: "Control your data" },
  { icon: HelpCircle, label: "Help & Support", desc: "Get assistance" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, favoriteIds, logout } = useApp();
  const [bookingCount, setBookingCount] = useState("0");

  useEffect(() => {
    bookingService.getUserBookings(user?.id ?? "demo").then((b) => setBookingCount(String(b.length)));
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Alex Mwangi";
  const displayEmail = user?.email ?? "alex.mwangi@uon.ac.ke";
  const initials = user ? getInitials(user) : "AM";

  const bookingHistory = [
    {
      id: "1",
      hostel: "Sunrise Student Residence",
      date: "Jan 2026 – Jun 2026",
      status: "Active",
      image: "https://images.unsplash.com/photo-1768355680597-c1650acb43cf?w=200&h=120&fit=crop&auto=format",
    },
    {
      id: "2",
      hostel: "BluePeak Hostel",
      date: "Jul 2025 – Dec 2025",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1780367261684-4f65bcf2f128?w=200&h=120&fit=crop&auto=format",
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient
          colors={["#1a56db", "#1e40af"]}
          className="px-5 rounded-b-[2rem]"
          style={{ paddingTop: insets.top + 12, paddingBottom: 40 }}
        >
          <View className="flex-row items-center gap-4">
            <View className="w-[72px] h-[72px] rounded-2xl bg-white/20 items-center justify-center">
              <Text className="text-white text-3xl font-jakarta">{initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-jakarta">{displayName}</Text>
              <Text className="text-blue-200 text-sm font-dm-sans">{displayEmail}</Text>
              <View className="bg-white/20 px-2 py-0.5 rounded-full self-start mt-1">
                <Text className="text-blue-100 text-xs font-dm-sans">
                  {user?.university ?? "University of Nairobi"}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-4 mt-6">
            {[
              { label: "Bookings", value: bookingCount },
              { label: "Saved", value: String(favoriteIds.length) },
              { label: "Reviews", value: "3" },
            ].map((s) => (
              <View key={s.label} className="flex-1 bg-white/15 rounded-2xl py-3 items-center">
                <Text className="text-white text-xl font-jakarta">{s.value}</Text>
                <Text className="text-blue-200 text-xs font-dm-sans">{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View className="px-5 pt-5 gap-5">
          <View>
            <Text className="text-foreground text-lg font-jakarta mb-3">Booking History</Text>
            <View className="gap-3">
              {bookingHistory.map((b) => (
                <View
                  key={b.id}
                  className="bg-white rounded-2xl p-4 border border-blue-50 flex-row gap-3 items-center"
                >
                  <Image source={{ uri: b.image }} className="w-16 h-14 rounded-xl bg-blue-100" />
                  <View className="flex-1">
                    <Text className="text-foreground text-sm font-jakarta" numberOfLines={1}>
                      {b.hostel}
                    </Text>
                    <Text className="text-muted text-xs font-dm-sans mt-0.5">{b.date}</Text>
                  </View>
                  <View
                    className={`px-2.5 py-1 rounded-full ${
                      b.status === "Active" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-dm-sans-medium ${
                        b.status === "Active" ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {b.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text className="text-foreground text-lg font-jakarta mb-3">Settings</Text>
            <View className="bg-white rounded-2xl border border-blue-50 overflow-hidden">
              {settings.map((s, i) => (
                <Pressable
                  key={s.label}
                  className={`flex-row items-center gap-4 px-4 py-4 active:bg-blue-50 ${
                    i < settings.length - 1 ? "border-b border-blue-50" : ""
                  }`}
                >
                  <View className="w-9 h-9 bg-secondary rounded-xl items-center justify-center">
                    <s.icon size={18} color="#1a56db" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-foreground text-sm font-dm-sans-medium">{s.label}</Text>
                    <Text className="text-muted text-xs font-dm-sans">{s.desc}</Text>
                  </View>
                  <ChevronRight size={16} color="#9ca3af" />
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 py-4 bg-red-50 rounded-2xl border border-red-100 active:opacity-90"
          >
            <LogOut size={18} color="#dc2626" />
            <Text className="text-red-600 font-jakarta">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
