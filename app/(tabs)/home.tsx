import { HostelCard } from "@/components/HostelCard";
import { LocationPicker } from "@/components/LocationPicker";
import { useApp } from "@/contexts/AppContext";
import { getHostelsByUniversity, hostels } from "@/data/hostels";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bell, ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const categories = ["All", "Nearby", "Budget", "Premium", "Single", "Shared"];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favoriteIds, toggleFavorite, location, setLocation } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const nearbyHostels = useMemo(
    () => (location ? getHostelsByUniversity(location.id) : hostels),
    [location]
  );

  const featured = nearbyHostels.filter((h) => h.featured);

  const filtered = useMemo(() => {
    const pool = location ? nearbyHostels : hostels;

    return pool
      .filter((h) => {
        if (activeCategory === "Budget") return h.price <= 6500;
        if (activeCategory === "Premium") return h.price >= 9000;
        if (activeCategory === "Single") return h.type === "Single Room";
        if (activeCategory === "Shared") return h.type === "Shared Room";
        return true;
      })
      .filter(
        (h) =>
          h.name.toLowerCase().includes(query.toLowerCase()) ||
          h.location.toLowerCase().includes(query.toLowerCase()) ||
          h.universityName.toLowerCase().includes(query.toLowerCase())
      );
  }, [activeCategory, query, nearbyHostels, location]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient
          colors={["#1a56db", "#1e40af"]}
          className="px-5 rounded-b-[2rem]"
          style={{ paddingTop: insets.top + 12, paddingBottom: 24 }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-blue-200 text-sm font-dm-sans">Good morning 👋</Text>
              <Text className="text-white text-2xl font-jakarta">Find your hostel</Text>
            </View>
            <View className="relative">
              <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Bell size={20} color="#fff" />
              </View>
              <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-primary" />
            </View>
          </View>

          <Pressable
            onPress={() => setShowPicker(true)}
            className="flex-row items-center gap-1.5 bg-white/15 rounded-2xl px-3 py-2 mb-4 active:bg-white/25"
          >
            <MapPin size={13} color="#bfdbfe" />
            <Text className="text-blue-100 text-xs font-dm-sans-medium flex-1" numberOfLines={1}>
              {location ? `${location.name}, ${location.city}` : "Tap to set your campus location"}
            </Text>
            <ChevronDown size={13} color="#bfdbfe" />
          </Pressable>

          <View className="flex-row gap-3">
            <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 gap-3">
              <Search size={18} color="#9ca3af" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search hostels, locations..."
                placeholderTextColor="#9ca3af"
                className="flex-1 py-3.5 text-foreground font-dm-sans text-sm"
              />
            </View>
            <Pressable className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
              <SlidersHorizontal size={20} color="#fff" />
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 pt-5"
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === cat ? "bg-primary" : "bg-white border border-blue-100"
              }`}
            >
              <Text
                className={`text-sm font-dm-sans-medium ${
                  activeCategory === cat ? "text-white" : "text-muted"
                }`}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {activeCategory === "All" && !query && (
          <View className="px-5 pt-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-foreground text-lg font-jakarta">Featured Hostels</Text>
              <Text className="text-primary text-sm font-dm-sans-medium">See all</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
              {featured.map((h) => (
                <HostelCard
                  key={h.id}
                  hostel={h}
                  onPress={() => router.push(`/hostel/${h.id}`)}
                  onFavorite={toggleFavorite}
                  isFavorite={favoriteIds.includes(h.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View className="px-5 pt-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-foreground text-lg font-jakarta">
              {query
                ? "Search Results"
                : location
                  ? `Hostels near ${location.name}`
                  : "All Hostels in Kenya"}
            </Text>
            <Text className="text-muted text-sm font-dm-sans">{filtered.length} found</Text>
          </View>
          <View className="gap-3">
            {filtered.map((h) => (
              <HostelCard
                key={h.id}
                hostel={h}
                compact
                onPress={() => router.push(`/hostel/${h.id}`)}
                onFavorite={toggleFavorite}
                isFavorite={favoriteIds.includes(h.id)}
              />
            ))}
            {filtered.length === 0 && (
              <Text className="text-center py-12 text-muted font-dm-sans">
                No hostels found matching your search.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <LocationPicker
        visible={showPicker}
        current={location}
        onSelect={(loc) => {
          setLocation(loc);
          setShowPicker(false);
        }}
        onClose={() => setShowPicker(false)}
      />
    </View>
  );
}
