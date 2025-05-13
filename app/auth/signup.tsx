import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';
import Button from '@/components/Button';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const colors = Colors.light;

  const handleSignup = async () => {
    try {
      setError(null);
      
      // Basic validation
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      // TODO: Implement actual signup
      router.replace('/(tabs)');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.header}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.headerImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to start ordering</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).duration(300)}
          style={styles.form}
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <User size={20} color={colors.textTertiary} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.textTertiary} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.textTertiary} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <Text style={styles.terms}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <Button
            title="Create Account"
            onPress={handleSignup}
            variant="primary"
            size="large"
            fullWidth
            rightIcon={<ArrowRight size={20} color={colors.background} />}
            style={styles.signupButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              title="Google"
              onPress={() => {}}
              variant="outlined"
              style={styles.socialButton}
            />
            <Button
              title="Apple"
              onPress={() => {}}
              variant="outlined"
              style={styles.socialButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 300,
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    ...typography.heading2,
    color: Colors.light.background,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body1,
    color: Colors.light.backgroundSecondary,
  },
  form: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    ...shadows.lg,
  },
  errorContainer: {
    backgroundColor: Colors.light.errorLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.body2,
    color: Colors.light.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundTertiary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    ...typography.body1,
    color: Colors.light.text,
  },
  terms: {
    ...typography.body2,
    color: Colors.light.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  termsLink: {
    color: Colors.light.primary,
  },
  signupButton: {
    marginBottom: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    ...typography.body2,
    color: Colors.light.textTertiary,
    marginHorizontal: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  socialButton: {
    flex: 0.48,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.body2,
    color: Colors.light.textSecondary,
  },
  loginText: {
    ...typography.body2,
    color: Colors.light.primary,
  },
});