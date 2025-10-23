import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

// AdMob configuration
const AD_UNIT_IDS = {
  // Test IDs for development
  BANNER: "ca-app-pub-3940256099942544/6300978111",
  INTERSTITIAL: "ca-app-pub-3940256099942544/1033173712",
  REWARDED: "ca-app-pub-3940256099942544/5224354917",

  // Production IDs (replace with your actual AdMob unit IDs)
  // BANNER: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  // INTERSTITIAL: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  // REWARDED: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};

class AdService {
  constructor() {
    this.interstitialLoaded = false;
    this.rewardedLoaded = false;
    this.loadInterstitial();
    this.loadRewarded();
  }

  // Load interstitial ad
  loadInterstitial = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(AD_UNIT_IDS.INTERSTITIAL);
      await AdMobInterstitial.requestAdAsync();
      this.interstitialLoaded = true;
      console.log("Interstitial ad loaded");
    } catch (error) {
      console.error("Error loading interstitial ad:", error);
      this.interstitialLoaded = false;
    }
  };

  // Load rewarded ad
  loadRewarded = async () => {
    try {
      await AdMobRewarded.setAdUnitID(AD_UNIT_IDS.REWARDED);
      await AdMobRewarded.requestAdAsync();
      this.rewardedLoaded = true;
      console.log("Rewarded ad loaded");
    } catch (error) {
      console.error("Error loading rewarded ad:", error);
      this.rewardedLoaded = false;
    }
  };

  // Show interstitial ad
  showInterstitial = async () => {
    try {
      if (this.interstitialLoaded) {
        await AdMobInterstitial.showAdAsync();
        this.interstitialLoaded = false;
        // Load next ad
        this.loadInterstitial();
        return true;
      } else {
        console.log("Interstitial ad not loaded");
        return false;
      }
    } catch (error) {
      console.error("Error showing interstitial ad:", error);
      return false;
    }
  };

  // Show rewarded ad
  showRewarded = async () => {
    try {
      if (this.rewardedLoaded) {
        await AdMobRewarded.showAdAsync();
        this.rewardedLoaded = false;
        // Load next ad
        this.loadRewarded();
        return true;
      } else {
        console.log("Rewarded ad not loaded");
        return false;
      }
    } catch (error) {
      console.error("Error showing rewarded ad:", error);
      return false;
    }
  };

  // Show ad based on user actions
  showAdForAction = async (action) => {
    const adFrequency = {
      medication_taken: 0.3, // 30% chance
      blood_pressure_recorded: 0.2, // 20% chance
      delivery_reminder: 0.4, // 40% chance
      premium_feature: 1.0, // 100% chance for premium features
    };

    const chance = adFrequency[action] || 0.1;

    if (Math.random() < chance) {
      return await this.showInterstitial();
    }

    return false;
  };

  // Show rewarded ad for premium features
  showRewardedForPremiumFeature = async (feature) => {
    try {
      const success = await this.showRewarded();
      if (success) {
        // Grant temporary access to premium feature
        return this.grantTemporaryPremiumAccess(feature);
      }
      return false;
    } catch (error) {
      console.error("Error showing rewarded ad for premium feature:", error);
      return false;
    }
  };

  // Grant temporary premium access
  grantTemporaryPremiumAccess = (feature) => {
    const accessDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const accessData = {
      feature,
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + accessDuration).toISOString(),
    };

    // Store in AsyncStorage
    try {
      // This would be implemented with AsyncStorage
      console.log("Temporary premium access granted:", accessData);
      return accessData;
    } catch (error) {
      console.error("Error granting temporary premium access:", error);
      return null;
    }
  };

  // Check if user has premium access
  hasPremiumAccess = async () => {
    try {
      // Check if user has purchased premium
      // This would integrate with Google Play Billing
      return false; // Placeholder
    } catch (error) {
      console.error("Error checking premium access:", error);
      return false;
    }
  };

  // Check if temporary premium access is valid
  hasTemporaryPremiumAccess = async (feature) => {
    try {
      // Check AsyncStorage for temporary access
      // This would be implemented with AsyncStorage
      return false; // Placeholder
    } catch (error) {
      console.error("Error checking temporary premium access:", error);
      return false;
    }
  };

  // Initialize AdMob
  initialize = async () => {
    try {
      // Set up ad event listeners
      AdMobInterstitial.addEventListener("interstitialDidLoad", () => {
        console.log("Interstitial ad loaded");
        this.interstitialLoaded = true;
      });

      AdMobInterstitial.addEventListener(
        "interstitialDidFailToLoad",
        (error) => {
          console.error("Interstitial ad failed to load:", error);
          this.interstitialLoaded = false;
        }
      );

      AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
        console.log("Rewarded ad loaded");
        this.rewardedLoaded = true;
      });

      AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", (error) => {
        console.error("Rewarded ad failed to load:", error);
        this.rewardedLoaded = false;
      });

      // Load initial ads
      await this.loadInterstitial();
      await this.loadRewarded();

      console.log("AdMob initialized successfully");
      return true;
    } catch (error) {
      console.error("Error initializing AdMob:", error);
      return false;
    }
  };

  // Clean up
  cleanup = () => {
    try {
      AdMobInterstitial.removeAllListeners();
      AdMobRewarded.removeAllListeners();
      console.log("AdMob cleanup completed");
    } catch (error) {
      console.error("Error during AdMob cleanup:", error);
    }
  };
}

// Export singleton instance
export const adService = new AdService();
export default adService;
