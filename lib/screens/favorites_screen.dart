import 'package:flutter/material.dart';
import '../models/hostel_model.dart';
import '../services/hostel_service.dart';
import '../utils/app_constants.dart';
import '../widgets/common_widgets.dart';
import '../widgets/hostel_widgets.dart';
import '../widgets/form_widgets.dart';
class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({Key? key}) : super(key: key);

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  final _hostelService = HostelService();
  List<Hostel> _favorites = [];
  bool _isLoading = true;
  Set<String> _favoriteIds = {};

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  void _loadFavorites() async {
    try {
      final favorites = await _hostelService.getFavorites();
      if (mounted) {
        setState(() {
          _favorites = favorites;
          _favoriteIds = favorites.map((h) => h.id).toSet();
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  void _removeFavorite(String hostelId) {
    _hostelService.removeFromFavorites(hostelId);
    setState(() {
      _favorites.removeWhere((h) => h.id == hostelId);
      _favoriteIds.remove(hostelId);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Removed from favorites'),
        backgroundColor: AppColors.success,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        title: AppStrings.favorites,
        backgroundColor: AppColors.primary,
      ),
      body: _isLoading
          ? const LoadingIndicator(message: 'Loading favorites...')
          : _favorites.isEmpty
              ? EmptyStateWidget(
                  message: 'No favorites yet',
                  subMessage: 'Add hostels to your favorites to see them here',
                  icon: Icons.favorite_border,
                  onAction: () {
                    Navigator.of(context).pushNamed('/home');
                  },
                  actionLabel: 'Browse Hostels',
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(
                      AppDimensions.paddingMedium),
                  itemCount: _favorites.length,
                  itemBuilder: (context, index) {
                    final hostel = _favorites[index];
                    return HostelListItem(
                      hostel: hostel,
                      isFavorited: _favoriteIds.contains(hostel.id),
                      onTap: () {
                        Navigator.of(context).pushNamed(
                          '/hostel-details',
                          arguments: hostel,
                        );
                      },
                      onFavoriteTap: () {
                        _removeFavorite(hostel.id);
                      },
                    );
                  },
                ),
    );
  }
}
