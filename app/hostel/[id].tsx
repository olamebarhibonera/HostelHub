import { useApp } from "@/contexts/AppContext";
import { amenityIcons } from "@/data/hostels";
import { hostelService } from "@/services/hostelService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Heart, MapPin, Share2, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Hostel } from "@/models/hostel";

const galleryImages = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1767884162402-683fdd430046?w=600&h=400&fit=crop&auto=format",
];

export default function HostelDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favoriteIds, toggleFavorite } = useApp();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (id) hostelService.getHostelById(id).then(setHostel);
  }, [id]);

  if (!hostel) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-muted font-dm-sans">Loading...</Text>
      </View>
    );
  }

  const allImages = [hostel.image, ...galleryImages.slice(0, 2)];
  const isFavorite = favoriteIds.includes(hostel.id);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="relative">
          <Image source={{ uri: allImages[activeImg] }} className="w-full h-72 bg-blue-100" />
          <View
            className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5"
            style={{ paddingTop: insets.top + 8 }}
          >
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
            >
              <ChevronLeft size={20} color="#0d1b3e" />
            </Pressable>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => toggleFavorite(hostel.id)}
                className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
              >
                <Heart
                  size={18}
                  color={isFavorite ? "#ef4444" : "#0d1b3e"}
                  fill={isFavorite ? "#ef4444" : "transparent"}
                />
              </Pressable>
              <Pressable className="w-10 h-10 bg-white/90 rounded-full items-center justify-center">
                <Share2 size={18} color="#0d1b3e" />
              </Pressable>
            </View>
          </View>
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {allImages.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => setActiveImg(i)}
                className={`rounded-full ${i === activeImg ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
              />
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 pt-4"
          contentContainerStyle={{ gap: 8 }}
        >
          {allImages.map((img, i) => (
            <Pressable
              key={i}
              onPress={() => setActiveImg(i)}
              className={`w-16 h-12 rounded-xl overflow-hidden border-2 ${
                i === activeImg ? "border-primary" : "border-transparent"
              }`}
            >
              <Image source={{ uri: img }} className="w-full h-full bg-blue-100" />
            </Pressable>
          ))}
        </ScrollView>

        <View className="px-5 pt-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="text-foreground text-2xl font-jakarta leading-snug">{hostel.name}</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <MapPin size={14} color="#1a56db" />
                <Text className="text-muted text-sm font-dm-sans">{hostel.location}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl">
              <Star size={14} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-foreground text-sm font-jakarta">{hostel.rating}</Text>
              <Text className="text-gray-400 text-xs">({hostel.reviews})</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mt-4">
            {[
              { label: "Distance", value: hostel.distance },
              { label: "Room Type", value: hostel.type },
              { label: "Availability", value: "Available" },
            ].map((stat) => (
              <View key={stat.label} className="flex-1 bg-white rounded-2xl p-3 border border-blue-50 items-center">
                <Text className="text-foreground text-xs font-jakarta text-center">{stat.value}</Text>
                <Text className="text-muted text-xs font-dm-sans mt-0.5">{stat.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-5">
            <Text className="text-foreground text-base font-jakarta mb-2">About</Text>
            <Text className="text-muted text-sm font-dm-sans leading-6">{hostel.description}</Text>
          </View>

          <View className="mt-5">
            <Text className="text-foreground text-base font-jakarta mb-3">Amenities</Text>
            <View className="flex-row flex-wrap gap-2">
              {hostel.amenities.map((a) => (
                <View
                  key={a}
                  className="flex-row items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2"
                >
                  <Text>{amenityIcons[a] ?? "✓"}</Text>
                  <Text className="text-foreground text-sm font-dm-sans-medium">{a}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-blue-50 px-5 py-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-muted text-xs font-dm-sans">Monthly rent</Text>
            <Text className="text-foreground text-2xl font-jakarta">
              KSh {hostel.price.toLocaleString()}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push(`/booking/${hostel.id}`)}
            className="px-8 py-4 bg-primary rounded-2xl active:opacity-90"
          >
            <Text className="text-white text-base font-jakarta">Book Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
