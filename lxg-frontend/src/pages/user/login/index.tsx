import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { userInfo } from '@/data/user/user';
import styles from '@/styles/user/login.module.scss';

const LoginPage: React.FC = () => {
  const { setUserInfo } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'account' | 'phone'>('account');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const handleAccountLogin = () => {
    if (isRegister) {
      if (!phone || phone.length !== 11) {
        Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
        return;
      }

      if (!code || code.length !== 6) {
        Taro.showToast({ title: '请输入6位验证码', icon: 'none' });
        return;
      }

      if (!password || password.length < 6) {
        Taro.showToast({ title: '密码至少6位', icon: 'none' });
        return;
      }
    } else {
      if (!username || username.length < 3) {
        Taro.showToast({ title: '账号至少3个字符', icon: 'none' });
        return;
      }

      if (!password || password.length < 6) {
        Taro.showToast({ title: '密码至少6位', icon: 'none' });
        return;
      }
    }

    Taro.showLoading({ title: isRegister ? '注册中...' : '登录中...' });

    setTimeout(() => {
      Taro.hideLoading();
      
      const loggedInUser = {
        ...userInfo,
        id: `user-${Date.now()}`,
        phone: isRegister ? phone : userInfo.phone,
        accountName: isRegister ? phone : username,
        isLoggedIn: true,
        registerDate: isRegister ? getCurrentDate() : userInfo.registerDate
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

  const handleForgotPassword = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    if (!code || code.length !== 6) {
      Taro.showToast({ title: '请输入6位验证码', icon: 'none' });
      return;
    }

    if (!password || password.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }

    if (password !== confirmPassword) {
      Taro.showToast({ title: '两次密码输入不一致', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '重置密码中...' });

    setTimeout(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '密码重置成功', icon: 'success' });
      
      setTimeout(() => {
        setIsForgotPassword(false);
        setPhone('');
        setCode('');
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    }, 1500);
  };

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
        accountName: isRegister ? `user_${Date.now()}` : (userInfo.accountName || ''),
        isLoggedIn: true,
        registerDate: isRegister ? getCurrentDate() : userInfo.registerDate
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

  const toggleRegisterMode = () => {
    setIsRegister(!isRegister);
    setPassword('');
    setConfirmPassword('');
    setCode('');
  };

  const switchToPhoneLogin = () => {
    setLoginMethod('phone');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchToAccountLogin = () => {
    setLoginMethod('account');
    setPhone('');
    setCode('');
  };

  return (
    <View className={styles.loginPage}>
      <View className={styles.logoSection}>
        <View className={styles.logo}>🛒</View>
        <Text className={styles.appName}>乐享购</Text>
      </View>

      <View className={styles.loginForm}>
        {isForgotPassword ? (
          <>
            <Text className={styles.formTitle}>忘记密码</Text>
            
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

            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>新密码</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>🔑</Text>
                <Input
                  className={styles.input}
                  password
                  placeholder="请输入新密码（至少6位）"
                  value={password}
                  onInput={(e) => setPassword(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>确认密码</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>🔑</Text>
                <Input
                  className={styles.input}
                  password
                  placeholder="请再次输入新密码"
                  value={confirmPassword}
                  onInput={(e) => setConfirmPassword(e.detail.value)}
                />
              </View>
            </View>

            <View 
              className={styles.loginBtn} 
              onClick={handleForgotPassword}
            >
              重置密码
            </View>

            <View className={styles.toggleMode}>
              <Text className={styles.toggleLink} onClick={() => {
                setIsForgotPassword(false);
                setPhone('');
                setCode('');
                setPassword('');
                setConfirmPassword('');
              }}>
                返回登录
              </Text>
            </View>
          </>
        ) : loginMethod === 'account' ? (
          <>
            <Text className={styles.formTitle}>
              {isRegister ? '手机号注册' : '账号登录'}
            </Text>
            
            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>{isRegister ? '手机号' : '账号'}</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>{isRegister ? '📱' : '👤'}</Text>
                <Input
                  className={styles.input}
                  type={isRegister ? 'number' : 'text'}
                  maxlength={isRegister ? 11 : undefined}
                  placeholder={isRegister ? '请输入手机号' : '请输入账号'}
                  value={isRegister ? phone : username}
                  onInput={(e) => isRegister ? setPhone(e.detail.value) : setUsername(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>{isRegister ? '验证码' : '密码'}</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>{isRegister ? '🔐' : '🔑'}</Text>
                <Input
                  className={styles.input}
                  type={isRegister ? 'number' : 'text'}
                  password={!isRegister}
                  maxlength={isRegister ? 6 : undefined}
                  placeholder={isRegister ? '请输入验证码' : '请输入密码（至少6位）'}
                  value={isRegister ? code : password}
                  onInput={(e) => isRegister ? setCode(e.detail.value) : setPassword(e.detail.value)}
                />
                {isRegister && (
                  <View 
                    className={`${styles.codeBtn} ${countdown > 0 ? styles.disabled : ''}`}
                    onClick={countdown === 0 ? sendCode : undefined}
                  >
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </View>
                )}
              </View>
            </View>

            {isRegister && (
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
            )}

            <View 
              className={styles.loginBtn} 
              onClick={handleAccountLogin}
            >
              {isRegister ? '注册' : '登录'}
            </View>

            <View className={styles.toggleMode}>
              {isRegister ? (
                <>
                  <Text className={styles.toggleText}>已有账号？</Text>
                  <Text className={styles.toggleLink} onClick={toggleRegisterMode}>
                    立即登录
                  </Text>
                </>
              ) : (
                <>
                  <Text className={styles.toggleLink} onClick={() => {
                    setIsForgotPassword(true);
                    setUsername('');
                    setPassword('');
                  }}>
                    忘记密码
                  </Text>
                  <Text className={styles.divider}>|</Text>
                  <Text className={styles.toggleLink} onClick={toggleRegisterMode}>
                    立即注册
                  </Text>
                </>
              )}
            </View>
          </>
        ) : (
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

            <View 
              className={styles.loginBtn} 
              onClick={handlePhoneLogin}
            >
              {isRegister ? '注册' : '登录'}
            </View>

            <View className={styles.toggleMode}>
              {isRegister ? (
                <>
                  <Text className={styles.toggleText}>已有账号？</Text>
                  <Text className={styles.toggleLink} onClick={toggleRegisterMode}>
                    立即登录
                  </Text>
                </>
              ) : (
                <>
                  <Text className={styles.toggleLink} onClick={() => {
                    setIsForgotPassword(true);
                    setPhone('');
                    setCode('');
                  }}>
                    忘记密码
                  </Text>
                  <Text className={styles.divider}>|</Text>
                  <Text className={styles.toggleLink} onClick={toggleRegisterMode}>
                    立即注册
                  </Text>
                </>
              )}
            </View>
          </>
        )}
      </View>

      {!isRegister && !isForgotPassword && (
        <View className={styles.thirdPartyLogin}>
          <View className={styles.divider}>
            <View className={styles.dividerLine} />
            <Text className={styles.dividerText}>其他登录方式</Text>
            <View className={styles.dividerLine} />
          </View>
          
          <View className={styles.loginMethods}>
            <View className={styles.methodItem} onClick={switchToAccountLogin}>
              <View className={styles.methodIcon}>
                <Text className={styles.iconText}>👤</Text>
              </View>
              <Text className={styles.methodLabel}>账号</Text>
            </View>
            <View className={styles.methodItem} onClick={switchToPhoneLogin}>
              <View className={styles.methodIcon}>
                <Text className={styles.iconText}>📱</Text>
              </View>
              <Text className={styles.methodLabel}>手机</Text>
            </View>
          </View>
        </View>
      )}

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