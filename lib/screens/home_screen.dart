import 'package:flutter/material.dart';
import '../models/hostel_model.dart';
import '../services/hostel_service.dart';
import '../utils/app_constants.dart';
import '../widgets/common_widgets.dart';
import '../widgets/hostel_widgets.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _hostelService = HostelService();
  final _searchController = TextEditingController();
  List<Hostel> _hostels = [];
  List<Hostel> _filteredHostels = [];
  bool _isLoading = true;
  bool _isSearching = false;
  Set<String> _favorites = {};

  @override
  void initState() {
    super.initState();
    _loadHostels();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _loadHostels() async {
    try {
      final hostels = await _hostelService.getAllHostels();
      if (mounted) {
        setState(() {
          _hostels = hostels;
          _filteredHostels = hostels;
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

  void _searchHostels(String query) async {
    if (query.isEmpty) {
      setState(() {
        _filteredHostels = _hostels;
        _isSearching = false;
      });
      return;
    }

    setState(() => _isSearching = true);

    try {
      final results = await _hostelService.searchHostels(query);
      if (mounted) {
        setState(() {
          _filteredHostels = results;
          _isSearching = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSearching = false);
      }
    }
  }

  void _toggleFavorite(String hostelId) {
    setState(() {
      if (_favorites.contains(hostelId)) {
        _favorites.remove(hostelId);
        _hostelService.removeFromFavorites(hostelId);
      } else {
        _favorites.add(hostelId);
        _hostelService.addToFavorites(hostelId);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              color: AppColors.primary,
              padding: const EdgeInsets.all(AppDimensions.paddingMedium),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    AppStrings.home,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      color: AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.paddingSmall),
                  Text(
                    'Find your perfect hostel',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.white.withOpacity(0.9),
                    ),
                  ),
                ],
              ),
            ),
            // Search bar
            Padding(
              padding: const EdgeInsets.all(AppDimensions.paddingMedium),
              child: TextField(
                controller: _searchController,
                onChanged: _searchHostels,
                decoration: InputDecoration(
                  hintText: 'Search hostels...',
                  prefixIcon: const Icon(Icons.search, color: AppColors.primary),
                  suffixIcon: _searchController.text.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear),
                          onPressed: () {
                            _searchController.clear();
                            _searchHostels('');
                          },
                        )
                      : null,
                  border: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(AppDimensions.radiusLarge),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(AppDimensions.radiusLarge),
                    borderSide: const BorderSide(color: AppColors.greyLight),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: AppDimensions.paddingMedium,
                    vertical: AppDimensions.paddingSmall,
                  ),
                ),
              ),
            ),
            // Content
            Expanded(
              child: _isLoading
                  ? const LoadingIndicator(message: 'Loading hostels...')
                  : _filteredHostels.isEmpty
                      ? EmptyStateWidget(
                          message: 'No hostels found',
                          subMessage:
                              'Try adjusting your search criteria',
                          icon: Icons.search_off,
                        )
                      : GridView.builder(
                          padding: const EdgeInsets.all(
                              AppDimensions.paddingMedium),
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 0.75,
                            crossAxisSpacing:
                                AppDimensions.paddingSmall,
                            mainAxisSpacing:
                                AppDimensions.paddingSmall,
                          ),
                          itemCount: _filteredHostels.length,
                          itemBuilder: (context, index) {
                            final hostel = _filteredHostels[index];
                            return HostelCard(
                              hostel: hostel,
                              isFavorited: _favorites.contains(hostel.id),
                              onTap: () {
                                Navigator.of(context).pushNamed(
                                  '/hostel-details',
                                  arguments: hostel,
                                );
                              },
                              onFavoriteTap: () {
                                _toggleFavorite(hostel.id);
                              },
                            );
                          },
                        ),
            ),
          ],
        ),
      ),
    );
  }
}
