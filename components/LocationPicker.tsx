import { allLocations, Location, recentLocationIds } from "@/data/locations";
import { CheckCircle2, ChevronRight, MapPin, Search, X } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  current: Location | null;
  onSelect: (loc: Location) => void;
  onClose: () => void;
}

function LocationRow({
  loc,
  selected,
  onSelect,
}: {
  loc: Location;
  selected: boolean;
  onSelect: (l: Location) => void;
}) {
  return (
    <Pressable
      onPress={() => onSelect(loc)}
      className={`flex-row items-center gap-3 w-full px-4 py-3.5 rounded-2xl mb-1 ${
        selected ? "bg-secondary border border-primary/30" : "bg-white"
      }`}
    >
      <View
        className={`w-9 h-9 rounded-xl items-center justify-center ${
          selected ? "bg-primary" : "bg-secondary"
        }`}
      >
        <MapPin size={16} color={selected ? "#ffffff" : "#1a56db"} />
      </View>
      <View className="flex-1">
        <Text className={`text-foreground text-sm font-dm-sans-medium ${selected ? "font-dm-sans-medium" : ""}`}>
          {loc.name}
        </Text>
        <Text className="text-muted text-xs font-dm-sans">
          {loc.city}{loc.county ? `, ${loc.county}` : ""} · {loc.type ?? "University"}
        </Text>
      </View>
      {selected ? (
        <CheckCircle2 size={18} color="#1a56db" />
      ) : (
        <ChevronRight size={16} color="#d1d5db" />
      )}
    </Pressable>
  );
}

export function LocationPicker({ visible, current, onSelect, onClose }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? allLocations.filter(
        (l) =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.city.toLowerCase().includes(query.toLowerCase()) ||
          l.county?.toLowerCase().includes(query.toLowerCase()) ||
          l.country.toLowerCase().includes(query.toLowerCase())
      )
    : allLocations;

  const recents = allLocations.filter((l) => recentLocationIds.includes(l.id));

  const groupedByCounty = filtered.reduce<Record<string, Location[]>>((acc, loc) => {
    const key = loc.county ?? loc.city;
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <Pressable
          className="bg-background rounded-t-[2rem] max-h-[88%]"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </View>

          <View className="flex-row items-center justify-between px-5 pb-4">
            <View>
              <Text className="text-foreground text-xl font-jakarta">Choose Location</Text>
              <Text className="text-muted text-xs font-dm-sans mt-0.5">
                Select your university campus
              </Text>
            </View>
            <Pressable onPress={onClose} className="w-9 h-9 bg-white rounded-full items-center justify-center border border-blue-100">
              <X size={18} color="#5a6a8a" />
            </Pressable>
          </View>

          <View className="px-5 pb-4">
            <View className="flex-row items-center bg-white rounded-2xl border border-blue-100 px-4 gap-3">
              <Search size={17} color="#1a56db" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search university or city..."
                placeholderTextColor="#9ca3af"
                className="flex-1 py-3.5 text-foreground font-dm-sans text-sm"
              />
              {query ? (
                <Pressable onPress={() => setQuery("")}>
                  <X size={15} color="#9ca3af" />
                </Pressable>
              ) : null}
            </View>
          </View>

          <ScrollView className="px-5 pb-8" keyboardShouldPersistTaps="handled">
            {!query && (
              <View className="mb-4">
                <Text className="text-muted text-xs font-dm-sans-medium uppercase tracking-wider mb-2">
                  Recently Used
                </Text>
                {recents.map((loc) => (
                  <LocationRow
                    key={loc.id}
                    loc={loc}
                    selected={current?.id === loc.id}
                    onSelect={onSelect}
                  />
                ))}
              </View>
            )}

            {filtered.length === 0 ? (
              <Text className="text-center py-10 text-muted font-dm-sans">
                No universities found for "{query}"
              </Text>
            ) : query ? (
              filtered.map((loc) => (
                <LocationRow
                  key={loc.id}
                  loc={loc}
                  selected={current?.id === loc.id}
                  onSelect={onSelect}
                />
              ))
            ) : (
              Object.entries(groupedByCounty)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([county, locs]) => (
                  <View key={county} className="mb-4">
                    <Text className="text-muted text-xs font-dm-sans-medium uppercase tracking-wider mb-2">
                      {county} ({locs.length})
                    </Text>
                    {locs.map((loc) => (
                      <LocationRow
                        key={loc.id}
                        loc={loc}
                        selected={current?.id === loc.id}
                        onSelect={onSelect}
                      />
                    ))}
                  </View>
                ))
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
