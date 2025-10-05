// src/screens/LoginScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LoginScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [loginType, setLoginType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [signupVisible, setSignupVisible] = useState(false);

  const backgrounds = [
    require('../../assets/images/bg_login1.jpg'),
    require('../../assets/images/bg_login2.jpg'),
    require('../../assets/images/bg_login3.jpg'),
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    generateCaptcha();
    const t = setInterval(
      () => setBgIndex(i => (i + 1) % backgrounds.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  function generateCaptcha() {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < 6; i++)
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(s);
    setCaptchaInput('');
  }

  function goToStep2() {
    if (!loginType) {
      Alert.alert('Please select a login type');
      return;
    }
    setStep(2);
    generateCaptcha();
  }

  function onLoginPress() {
    if (captchaInput.trim() !== captcha) {
      Alert.alert('Captcha does not match. Please try again.');
      generateCaptcha();
      return;
    }
    // NO backend: navigate to dashboard with userType param
    navigation.replace('Dashboard', { userType: loginType || 'User' });
  }

  return (
    <ImageBackground source={backgrounds[bgIndex]} style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <Image
            source={require('../../assets/images/login_header.png')}
            style={styles.headerImg}
            resizeMode="contain"
          />
          <View style={styles.box}>
            {step === 1 && (
              <View>
                <Text style={styles.h5}>Select Login Type</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={loginType}
                    onValueChange={setLoginType}
                    mode="dropdown"
                    style={{ color: 'grey' }}
                  >
                    <Picker.Item label="-- Choose --" value="" />
                    <Picker.Item label="BMMU" value="bmmu" />
                    <Picker.Item label="DMMU" value="dmmu" />
                    <Picker.Item label="SMMU" value="smmu" />
                    <Picker.Item
                      label="Training Partner"
                      value="training_partner"
                    />
                    <Picker.Item
                      label="Master Trainer"
                      value="master_trainer"
                    />
                    <Picker.Item label="Admin" value="admin" />
                  </Picker>
                </View>
                <TouchableOpacity style={styles.btn} onPress={goToStep2}>
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 2 && (
              <View>
                <Text style={styles.h5}>Login</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  placeholderTextColor={"grey"}
                  onChangeText={setUsername}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  placeholderTextColor={"grey"}
                  onChangeText={setPassword}
                />
                <View style={{ marginVertical: 10 }}>
                  <View style={styles.captchaBox}>
                    <Text style={styles.captchaText}>{captcha}</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Captcha"
                    value={captchaInput}
                    placeholderTextColor={"grey"}
                    onChangeText={setCaptchaInput}
                  />
                </View>
                <TouchableOpacity style={styles.btn} onPress={onLoginPress}>
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={{ marginTop: 8 }}
                >
                  <Text style={styles.link}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Modal
        visible={signupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSignupVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
              Sign Up
            </Text>
            <Text style={{ marginBottom: 6 }}>
              Signup simulated (no server).
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setSignupVisible(false)}
            >
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  headerImg: {
    width: 360,
    height: 290,
    marginBottom: -40,
    marginTop: -200,
    alignSelf: 'center',
    zIndex: 9999
  },
  box: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 20,
  },
  h5: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#ff6600',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: { color: '#fff', fontWeight: '700' },
  link: { color: '#777', textAlign: 'center' },
  captchaBox: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  captchaText: { fontWeight: '700', letterSpacing: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '88%',
    maxWidth: 360,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
});

export default LoginScreen;
