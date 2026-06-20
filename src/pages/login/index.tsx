import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { userInfo } from '@/data/user';
import styles from './index.module.scss';

const LoginPage: React.FC = () => {
  const { setUserInfo } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'wechat' | 'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 发送验证码
  const sendCode = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    setCountdown(60);
    let timer = 60;
    const interval = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    Taro.showToast({ title: '验证码已发送', icon: 'success' });
  };

  // 验证邮箱格式
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 手机号登录/注册
  const handlePhoneLogin = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    if (!code || code.length !== 6) {
      Taro.showToast({ title: '请输入6位验证码', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: isRegister ? '注册中...' : '登录中...' });

    setTimeout(() => {
      Taro.hideLoading();
      
      const loggedInUser = {
        ...userInfo,
        id: `user-${Date.now()}`,
        phone: phone,
        isLoggedIn: true
      };

      setUserInfo(loggedInUser);
      Taro.setStorageSync('userInfo', loggedInUser);

      Taro.showToast({ 
        title: isRegister ? '注册成功' : '登录成功', 
        icon: 'success' 
      });
      
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }, 1500);
  };

  // 邮箱登录/注册
  const handleEmailLogin = () => {
    if (!email || !validateEmail(email)) {
      Taro.showToast({ title: '请输入正确的邮箱地址', icon: 'none' });
      return;
    }

    if (!password || password.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }

    if (isRegister && password !== confirmPassword) {
      Taro.showToast({ title: '两次密码输入不一致', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: isRegister ? '注册中...' : '登录中...' });

    setTimeout(() => {
      Taro.hideLoading();
      
      const loggedInUser = {
        ...userInfo,
        id: `user-${Date.now()}`,
        nickname: email.split('@')[0],
        email: email,
        phone: '',
        isLoggedIn: true
      };

      setUserInfo(loggedInUser);
      Taro.setStorageSync('userInfo', loggedInUser);

      Taro.showToast({ 
        title: isRegister ? '注册成功' : '登录成功', 
        icon: 'success' 
      });
      
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }, 1500);
  };

  // 微信登录
  const handleWechatLogin = () => {
    Taro.showToast({ title: '微信登录功能开发中', icon: 'none' });
  };

  // 切换登录/注册模式
  const toggleRegisterMode = () => {
    setIsRegister(!isRegister);
    setCode('');
    setPassword('');
    setConfirmPassword('');
  };

  // 切换登录方式
  const switchLoginMethod = (method: 'wechat' | 'phone' | 'email') => {
    setLoginMethod(method);
    setCode('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <View className={styles.loginPage}>
      <View className={styles.logoSection}>
        <View className={styles.logo}>🛒</View>
        <Text className={styles.appName}>商城</Text>
      </View>

      <View className={styles.loginForm}>
        {loginMethod === 'phone' && (
          <>
            <Text className={styles.formTitle}>
              {isRegister ? '手机号注册' : '手机号登录'}
            </Text>
            
            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>手机号</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>📱</Text>
                <Input
                  className={styles.input}
                  type="number"
                  maxlength={11}
                  placeholder="请输入手机号"
                  value={phone}
                  onInput={(e) => setPhone(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>验证码</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>🔐</Text>
                <Input
                  className={styles.input}
                  type="number"
                  maxlength={6}
                  placeholder="请输入验证码"
                  value={code}
                  onInput={(e) => setCode(e.detail.value)}
                />
                <View 
                  className={`${styles.codeBtn} ${countdown > 0 ? styles.disabled : ''}`}
                  onClick={countdown === 0 ? sendCode : undefined}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </View>
              </View>
            </View>
          </>
        )}

        {loginMethod === 'email' && (
          <>
            <Text className={styles.formTitle}>
              {isRegister ? '邮箱注册' : '邮箱登录'}
            </Text>
            
            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>邮箱</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>📧</Text>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="请输入邮箱"
                  value={email}
                  onInput={(e) => setEmail(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>密码</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>🔑</Text>
                <Input
                  className={styles.input}
                  password
                  placeholder="请输入密码（至少6位）"
                  value={password}
                  onInput={(e) => setPassword(e.detail.value)}
                />
              </View>
            </View>

            {isRegister && (
              <View className={styles.inputGroup}>
                <Text className={styles.inputLabel}>确认密码</Text>
                <View className={styles.inputRow}>
                  <Text className={styles.inputIcon}>🔑</Text>
                  <Input
                    className={styles.input}
                    password
                    placeholder="请再次输入密码"
                    value={confirmPassword}
                    onInput={(e) => setConfirmPassword(e.detail.value)}
                  />
                </View>
              </View>
            )}
          </>
        )}

        {loginMethod === 'wechat' && (
          <View className={styles.wechatLoginBox}>
            <Text className={styles.formTitle}>微信登录</Text>
            <View className={styles.wechatHint}>
              <Text>点击下方微信图标进行登录</Text>
            </View>
          </View>
        )}

        <View 
          className={styles.loginBtn} 
          onClick={loginMethod === 'phone' ? handlePhoneLogin : loginMethod === 'email' ? handleEmailLogin : handleWechatLogin}
        >
          {isRegister ? '注册' : '登录'}
        </View>

        <View className={styles.toggleMode}>
          <Text className={styles.toggleText}>
            {isRegister ? '已有账号？' : '没有账号？'}
          </Text>
          <Text 
            className={styles.toggleLink}
            onClick={toggleRegisterMode}
          >
            {isRegister ? '立即登录' : '立即注册'}
          </Text>
        </View>
      </View>

      <View className={styles.thirdPartyLogin}>
        <View className={styles.divider}>
          <View className={styles.dividerLine} />
          <Text className={styles.dividerText}>其他登录方式</Text>
          <View className={styles.dividerLine} />
        </View>
        
        <View className={styles.loginMethods}>
          <View className={styles.methodItem} onClick={() => switchLoginMethod('wechat')}>
            <View className={styles.methodIcon}>
              <Text className={styles.iconText}>微</Text>
            </View>
            <Text className={styles.methodLabel}>微信</Text>
          </View>
          
          <View className={styles.methodItem} onClick={() => switchLoginMethod('phone')}>
            <View className={styles.methodIcon}>
              <Text className={styles.iconText}>📱</Text>
            </View>
            <Text className={styles.methodLabel}>手机</Text>
          </View>
          
          <View className={styles.methodItem} onClick={() => switchLoginMethod('email')}>
            <View className={styles.methodIcon}>
              <Text className={styles.iconText}>📧</Text>
            </View>
            <Text className={styles.methodLabel}>邮箱</Text>
          </View>
        </View>
      </View>

      <View className={styles.agreement}>
        {isRegister ? '注册即表示同意' : '登录即表示同意'}
        <Text className={styles.link}>《用户协议》</Text>
        和
        <Text className={styles.link}>《隐私政策》</Text>
      </View>
    </View>
  );
};

export default LoginPage;
