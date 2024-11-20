
import { withSequence, withRepeat, withTiming, Easing, withDelay } from 'react-native-reanimated';

export const Animations = ({
    pulsating: withRepeat(
        withDelay(800,
            withSequence(
                withTiming(1.3, { duration: 200, easing: Easing.ease }), // Quick scale up
                withTiming(1, { duration: 200, easing: Easing.ease }),   // Scale back to normal
                withTiming(1.2, { duration: 150, easing: Easing.ease }), // Slight scale up
                withTiming(1, { duration: 300, easing: Easing.ease })    // Back to normal, slower
            ),
        ),
        -1, // Infinite repeats
        false // No reverse
    ),
    quickSelection:withSequence(
        withTiming(1.03, { duration: 100, easing: Easing.ease }), // Scale up
        withTiming(1, { duration: 200, easing: Easing.ease })   // Scale down
      )
});