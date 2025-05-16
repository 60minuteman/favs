import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const GRADIENT_SIZE = Math.sqrt(width * width + height * height) * 2;

interface MeshGradientProps {
  colors?: {
    primary: string;
    secondary: string;
  };
  style?: any;
  intensity?: number;
  speed?: number;
}

export const MeshGradient: React.FC<MeshGradientProps> = ({ 
  colors = {
    primary: '#000000',
    secondary: '#000000'
  },
  style,
  intensity = 0.7,
  speed = 1
}) => {
  const rotation1 = new Animated.Value(0);
  const rotation2 = new Animated.Value(0);
  const rotation3 = new Animated.Value(0);
  const rotation4 = new Animated.Value(0);
  
  const translateX1 = new Animated.Value(0);
  const translateY1 = new Animated.Value(0);
  const translateX2 = new Animated.Value(0);
  const translateY2 = new Animated.Value(0);
  
  const scale1 = new Animated.Value(4);
  const scale2 = new Animated.Value(3);
  const scale3 = new Animated.Value(5);
  const scale4 = new Animated.Value(2);
  
  const opacity1 = new Animated.Value(0);
  const opacity2 = new Animated.Value(0);
  const opacity3 = new Animated.Value(0);
  const opacity4 = new Animated.Value(0);

  useEffect(() => {
    const animate = () => {
      Animated.parallel([
        // Spiral rotations
        Animated.loop(
          Animated.timing(rotation1, {
            toValue: 1,
            duration: 20000 / speed,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.timing(rotation2, {
            toValue: 1,
            duration: 15000 / speed,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.timing(rotation3, {
            toValue: 1,
            duration: 25000 / speed,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.timing(rotation4, {
            toValue: 1,
            duration: 30000 / speed,
            useNativeDriver: true,
          })
        ),
        
        // Spiral translations
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX1, {
              toValue: 200,
              duration: 10000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(translateX1, {
              toValue: -200,
              duration: 10000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateY1, {
              toValue: 200,
              duration: 10000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(translateY1, {
              toValue: -200,
              duration: 10000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX2, {
              toValue: -200,
              duration: 15000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(translateX2, {
              toValue: 200,
              duration: 15000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateY2, {
              toValue: -200,
              duration: 15000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(translateY2, {
              toValue: 200,
              duration: 15000 / speed,
              useNativeDriver: true,
            })
          ])
        ),

        // Pulsing scales
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale1, {
              toValue: 1,
              duration: 8000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(scale1, {
              toValue: 3,
              duration: 8000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale2, {
              toValue: 2,
              duration: 12000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(scale2, {
              toValue: 0.5,
              duration: 12000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale3, {
              toValue: 1.5,
              duration: 10000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(scale3, {
              toValue: 4,
              duration: 10000 / speed,
              useNativeDriver: true,
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale4, {
              toValue: 3,
              duration: 15000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(scale4, {
              toValue: 1,
              duration: 15000 / speed,
              useNativeDriver: true,
            })
          ])
        ),

        // Opacity pulses
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity1, {
              toValue: intensity,
              duration: 4000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(opacity1, {
              toValue: intensity * 0.2,
              duration: 4000 / speed,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity2, {
              toValue: intensity * 0.8,
              duration: 6000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(opacity2, {
              toValue: intensity * 0.1,
              duration: 6000 / speed,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity3, {
              toValue: intensity * 0.9,
              duration: 5000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(opacity3, {
              toValue: intensity * 0.3,
              duration: 5000 / speed,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity4, {
              toValue: intensity * 0.7,
              duration: 7000 / speed,
              useNativeDriver: true,
            }),
            Animated.timing(opacity4, {
              toValue: intensity * 0.2,
              duration: 7000 / speed,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    animate();
    return () => {
      [rotation1, rotation2, rotation3, rotation4,
       translateX1, translateY1, translateX2, translateY2,
       scale1, scale2, scale3, scale4,
       opacity1, opacity2, opacity3, opacity4]
        .forEach(animation => animation.stopAnimation());
    };
  }, [speed, intensity]);

  const spin1 = rotation1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  const spin2 = rotation2.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '-720deg'],
  });

  const spin3 = rotation3.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '1440deg'],
  });

  const spin4 = rotation4.interpolate({
    inputRange: [0, 1],
    outputRange: ['-270deg', '-1080deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.gradientContainer}>
        {[
          { 
            spin: spin1, 
            scale: scale1, 
            opacity: opacity1,
            translateX: translateX1,
            translateY: translateY1,
            colors: [colors.primary, colors.secondary] as [string, string]
          },
          { 
            spin: spin2, 
            scale: scale2, 
            opacity: opacity2,
            translateX: translateX2,
            translateY: translateY2,
            colors: [colors.secondary, colors.primary] as [string, string]
          },
          { 
            spin: spin3, 
            scale: scale3, 
            opacity: opacity3,
            translateX: translateX1,
            translateY: translateY2,
            colors: [colors.primary, colors.secondary] as [string, string]
          },
          { 
            spin: spin4, 
            scale: scale4, 
            opacity: opacity4,
            translateX: translateX2,
            translateY: translateY1,
            colors: [colors.secondary, colors.primary] as [string, string]
          }
        ].map((layer, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.gradientWrapper, 
              { 
                transform: [
                  { translateX: layer.translateX },
                  { translateY: layer.translateY },
                  { rotate: layer.spin },
                  { scale: layer.scale }
                ], 
                opacity: layer.opacity 
              }
            ]}
          >
            <LinearGradient
              colors={layer.colors}
              start={{ x: 0, y: index % 2 === 0 ? 0 : 1 }}
              end={{ x: 1, y: index % 2 === 0 ? 1 : 0 }}
              style={styles.gradient}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradientContainer: {
    position: 'absolute',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  gradientWrapper: {
    position: 'absolute',
    width: GRADIENT_SIZE,
    height: GRADIENT_SIZE,
    top: -(GRADIENT_SIZE - height) / 2,
    left: -(GRADIENT_SIZE - width) / 2,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: GRADIENT_SIZE / 2,
  },
});