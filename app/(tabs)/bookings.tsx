import { bookingService } from "@/services/bookingService";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Booking } from "@/models/booking";

function formatPeriod(from: Date, to: Date) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(from)} – ${fmt(to)}`;
}

export default function BookingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    bookingService.getUserBookings("current").then(setBookings);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient
          colors={["#1a56db", "#1e40af"]}
          className="px-5 rounded-b-[2rem]"
          style={{ paddingTop: insets.top + 12, paddingBottom: 32 }}
        >
          <Text className="text-white text-3xl font-jakarta">My Bookings</Text>
          <Text className="text-blue-200 mt-1 text-sm font-dm-sans">Track your reservations</Text>
        </LinearGradient>

        <View className="px-5 pt-5 gap-4">
          {bookings.map((b) => {
            const statusLabel = bookingService.getStatusLabel(b.status);
            const isActive = b.status === "confirmed";
            return (
              <Pressable
                key={b.id}
                onPress={() => router.push(`/hostel/${b.hostelId}`)}
                className="bg-white rounded-3xl overflow-hidden border border-blue-50 active:opacity-90"
              >
                <Image source={{ uri: b.hostelImage }} className="w-full h-36 bg-blue-100" />
                <View className="p-4">
                  <View className="flex-row items-start justify-between gap-2">
                    <Text className="text-foreground text-sm font-jakarta flex-1" numberOfLines={2}>
                      {b.hostelName}
                    </Text>
                    <View
                      className={`px-2.5 py-1 rounded-full ${
                        isActive ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-dm-sans-medium ${
                          isActive ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {statusLabel}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-muted text-xs font-dm-sans mt-1">
                    {formatPeriod(b.checkInDate, b.checkOutDate)}
                  </Text>
                  <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-blue-50">
                    <Text className="text-muted text-xs font-dm-sans">Ref: {b.reference}</Text>
                    <Text className="text-primary text-sm font-jakarta">
                      KSh {b.totalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
