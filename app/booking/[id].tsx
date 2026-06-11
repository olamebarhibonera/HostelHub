import { useApp } from "@/contexts/AppContext";
import { Booking } from "@/models/booking";
import { bookingService } from "@/services/bookingService";
import { hostelService } from "@/services/hostelService";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, ChevronDown, ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Hostel } from "@/models/hostel";

const roomTypes = ["Single Room", "Shared Room (2)", "Shared Room (4)", "En-Suite Room"];
const monthOptions = ["1", "2", "3", "6", "12"];

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [step, setStep] = useState<"form" | "success">("form");
  const [roomType, setRoomType] = useState("");
  const [moveIn, setMoveIn] = useState("2026-07-01");
  const [months, setMonths] = useState("6");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("UoN/2024/001234");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [showMonths, setShowMonths] = useState(false);

  useEffect(() => {
    if (id) {
      hostelService.getHostelById(id).then((h) => {
        setHostel(h);
        if (h) setRoomType(h.type);
      });
    }
    if (user) {
      setName(`${user.firstName} ${user.lastName}`);
      setPhone(user.phoneNumber);
    }
  }, [id, user]);

  if (!hostel) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#1a56db" />
      </View>
    );
  }

  const price = hostel.price * parseInt(months || "1", 10);

  const handleConfirm = async () => {
    setLoading(true);
    const checkIn = new Date(moveIn);
    const checkOut = new Date(checkIn);
    checkOut.setMonth(checkOut.getMonth() + parseInt(months, 10));

    const booking = await bookingService.createBooking({
      userId: user?.id ?? "demo",
      hostelId: hostel.id,
      hostelName: hostel.name,
      hostelImage: hostel.image,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfMonths: parseInt(months, 10),
      roomType,
      totalPrice: price,
      status: "confirmed",
      specialRequests: undefined,
    });
    setLoading(false);

    if (booking) {
      setConfirmedBooking(booking);
      setStep("success");
    }
  };

  if (step === "success" && confirmedBooking) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6 gap-6">
        <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center">
          <CheckCircle2 size={52} color="#22c55e" />
        </View>
        <View className="items-center">
          <Text className="text-foreground text-2xl font-jakarta">Booking Confirmed!</Text>
          <Text className="text-muted mt-2 text-sm font-dm-sans text-center">
            Your booking at <Text className="text-foreground font-dm-sans-medium">{hostel.name}</Text> has been confirmed. We'll contact you within 24 hours.
          </Text>
        </View>
        <View className="w-full bg-white rounded-3xl p-5 border border-blue-100">
          {[
            { label: "Booking Reference", value: confirmedBooking.reference },
            { label: "Room Type", value: roomType },
            { label: "Move-in Date", value: moveIn },
            { label: "Duration", value: `${months} months` },
            { label: "Total Amount", value: `KSh ${price.toLocaleString()}` },
          ].map((r) => (
            <View key={r.label} className="flex-row justify-between py-1.5">
              <Text className="text-muted text-sm font-dm-sans">{r.label}</Text>
              <Text className="text-foreground text-sm font-dm-sans-medium">{r.value}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => router.replace("/(tabs)/home")}
          className="w-full py-4 bg-primary rounded-2xl items-center active:opacity-90"
        >
          <Text className="text-white text-base font-jakarta">Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 140 }}>
        <LinearGradient
          colors={["#1a56db", "#1e40af"]}
          className="px-5 rounded-b-[2rem]"
          style={{ paddingTop: insets.top + 12, paddingBottom: 32 }}
        >
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-1 mb-4">
            <ChevronLeft size={20} color="#bfdbfe" />
            <Text className="text-blue-200 text-sm font-dm-sans">Back</Text>
          </Pressable>
          <Text className="text-white text-2xl font-jakarta">Book Room</Text>
          <Text className="text-blue-200 text-sm font-dm-sans mt-1">{hostel.name}</Text>
        </LinearGradient>

        <View className="px-5 pt-6 gap-5">
          <View className="flex-row gap-3 bg-white rounded-2xl p-4 border border-blue-100">
            <Image source={{ uri: hostel.image }} className="w-16 h-16 rounded-xl bg-blue-100" />
            <View className="flex-1">
              <Text className="text-foreground text-sm font-jakarta">{hostel.name}</Text>
              <Text className="text-muted text-xs font-dm-sans mt-0.5">{hostel.location}</Text>
              <Text className="text-primary text-sm font-jakarta mt-1">
                KSh {hostel.price.toLocaleString()}/month
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-foreground text-base font-jakarta mb-3">Student Details</Text>
            <View className="gap-3">
              {[
                { label: "Full Name", value: name, onChange: setName },
                { label: "Student ID", value: studentId, onChange: setStudentId },
                { label: "Phone Number", value: phone, onChange: setPhone },
              ].map((f) => (
                <View key={f.label}>
                  <Text className="text-muted text-xs font-dm-sans mb-1">{f.label}</Text>
                  <TextInput
                    value={f.value}
                    onChangeText={f.onChange}
                    className="bg-white border border-blue-100 rounded-2xl px-4 py-3.5 text-foreground font-dm-sans text-[15px]"
                  />
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text className="text-foreground text-base font-jakarta mb-3">Room Type</Text>
            <View className="gap-2">
              {roomTypes.map((rt) => (
                <Pressable
                  key={rt}
                  onPress={() => setRoomType(rt)}
                  className={`flex-row items-center justify-between px-4 py-3.5 rounded-2xl border ${
                    roomType === rt ? "border-primary bg-secondary" : "border-blue-100 bg-white"
                  }`}
                >
                  <Text className="text-foreground text-sm font-dm-sans-medium">{rt}</Text>
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      roomType === rt ? "border-primary" : "border-gray-300"
                    }`}
                  >
                    {roomType === rt && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View>
            <Text className="text-foreground text-base font-jakarta mb-3">Booking Details</Text>
            <View className="gap-3">
              <View>
                <Text className="text-muted text-xs font-dm-sans mb-1">Move-in Date</Text>
                <TextInput
                  value={moveIn}
                  onChangeText={setMoveIn}
                  placeholder="YYYY-MM-DD"
                  className="bg-white border border-blue-100 rounded-2xl px-4 py-3.5 text-foreground font-dm-sans text-[15px]"
                />
              </View>
              <View>
                <Text className="text-muted text-xs font-dm-sans mb-1">Duration (months)</Text>
                <Pressable
                  onPress={() => setShowMonths(!showMonths)}
                  className="bg-white border border-blue-100 rounded-2xl px-4 py-3.5 flex-row items-center justify-between"
                >
                  <Text className="text-foreground font-dm-sans text-[15px]">
                    {months} month{months !== "1" ? "s" : ""}
                  </Text>
                  <ChevronDown size={16} color="#9ca3af" />
                </Pressable>
                {showMonths && (
                  <View className="bg-white border border-blue-100 rounded-2xl mt-1 overflow-hidden">
                    {monthOptions.map((m) => (
                      <Pressable
                        key={m}
                        onPress={() => {
                          setMonths(m);
                          setShowMonths(false);
                        }}
                        className="px-4 py-3 border-b border-blue-50 active:bg-blue-50"
                      >
                        <Text className="text-foreground font-dm-sans">
                          {m} month{m !== "1" ? "s" : ""}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-blue-50 px-5 py-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-muted text-sm font-dm-sans">Total for {months} month(s)</Text>
          <Text className="text-foreground text-xl font-jakarta">KSh {price.toLocaleString()}</Text>
        </View>
        <Pressable
          onPress={handleConfirm}
          disabled={loading}
          className="w-full py-4 bg-primary rounded-2xl items-center active:opacity-90"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-jakarta">Confirm Booking</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
