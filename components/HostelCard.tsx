import { Hostel } from "@/models/hostel";
import { Heart, MapPin, Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  hostel: Hostel;
  onPress: () => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  compact?: boolean;
}

export function HostelCard({ hostel, onPress, onFavorite, isFavorite, compact }: Props) {
  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        className="flex-row gap-3 bg-white rounded-2xl p-3 border border-blue-50 active:opacity-90"
      >
        <Image source={{ uri: hostel.image }} className="w-20 h-20 rounded-xl bg-blue-100" />
        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-2">
            <Text className="text-foreground text-sm font-jakarta flex-1" numberOfLines={1}>
              {hostel.name}
            </Text>
            <Pressable onPress={() => onFavorite(hostel.id)} hitSlop={8}>
              <Heart
                size={16}
                color={isFavorite ? "#ef4444" : "#d1d5db"}
                fill={isFavorite ? "#ef4444" : "transparent"}
              />
            </Pressable>
          </View>
          <View className="flex-row items-center gap-1 mt-1">
            <MapPin size={12} color="#1a56db" />
            <Text className="text-muted text-xs font-dm-sans flex-1" numberOfLines={1}>
              {hostel.location}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center gap-1">
              <Star size={12} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-foreground text-xs font-dm-sans-medium">{hostel.rating}</Text>
              <Text className="text-gray-400 text-xs">({hostel.reviews})</Text>
            </View>
            <Text className="text-primary text-sm font-jakarta">
              KSh {hostel.price.toLocaleString()}
              <Text className="text-xs text-gray-400 font-dm-sans">/mo</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className="bg-white rounded-3xl overflow-hidden border border-blue-50 w-56 active:opacity-90">
      <View className="relative">
        <Image source={{ uri: hostel.image }} className="w-full h-36 bg-blue-100" />
        <Pressable
          onPress={() => onFavorite(hostel.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
        >
          <Heart
            size={15}
            color={isFavorite ? "#ef4444" : "#9ca3af"}
            fill={isFavorite ? "#ef4444" : "transparent"}
          />
        </Pressable>
        {hostel.featured && (
          <View className="absolute top-3 left-3 bg-primary px-2 py-0.5 rounded-full">
            <Text className="text-white text-xs font-dm-sans-medium">Featured</Text>
          </View>
        )}
      </View>
      <View className="p-3">
        <Text className="text-foreground text-sm font-jakarta" numberOfLines={1}>
          {hostel.name}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <MapPin size={11} color="#1a56db" />
          <Text className="text-muted text-xs font-dm-sans flex-1" numberOfLines={1}>
            {hostel.location}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center gap-1">
            <Star size={11} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-foreground text-xs font-dm-sans-medium">{hostel.rating}</Text>
          </View>
          <Text className="text-primary text-sm font-jakarta">
            KSh {hostel.price.toLocaleString()}
            <Text className="text-xs text-gray-400 font-dm-sans">/mo</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
