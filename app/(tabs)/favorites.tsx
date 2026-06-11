import { HostelCard } from "@/components/HostelCard";
import { useApp } from "@/contexts/AppContext";
import { hostels } from "@/data/hostels";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favoriteIds, toggleFavorite } = useApp();
  const saved = hostels.filter((h) => favoriteIds.includes(h.id));

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient
          colors={["#1a56db", "#1e40af"]}
          className="px-5 rounded-b-[2rem]"
          style={{ paddingTop: insets.top + 12, paddingBottom: 32 }}
        >
          <Text className="text-white text-3xl font-jakarta">Saved Hostels</Text>
          <Text className="text-blue-200 mt-1 text-sm font-dm-sans">
            {saved.length} hostel{saved.length !== 1 ? "s" : ""} saved
          </Text>
        </LinearGradient>

        <View className="px-5 pt-5">
          {saved.length === 0 ? (
            <View className="items-center justify-center py-20 gap-4">
              <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center">
                <Heart size={36} color="#1a56db" />
              </View>
              <View className="items-center">
                <Text className="text-foreground text-lg font-jakarta">No saved hostels yet</Text>
                <Text className="text-muted text-sm font-dm-sans mt-1 text-center">
                  Tap the heart icon on any hostel to save it here
                </Text>
              </View>
            </View>
          ) : (
            <View className="gap-3">
              {saved.map((h) => (
                <HostelCard
                  key={h.id}
                  hostel={h}
                  compact
                  onPress={() => router.push(`/hostel/${h.id}`)}
                  onFavorite={toggleFavorite}
                  isFavorite
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
