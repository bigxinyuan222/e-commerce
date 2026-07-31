import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiPost, apiGet } from '@/api/common';
import { authApi, userApi } from '@/api/user';
import { normalizeUserProfile } from '@/api/user/normalize';
import styles from '@/styles/user/login.module.scss';

const LoginPage: React.FC = () => {
  const { setUserInfo } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'account' | 'phone'>('account');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 微信登录相关状态
  const [isWechatLogin, setIsWechatLogin] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [wechatTempToken, setWechatTempToken] = useState('');
  const [wechatSetPassword, setWechatSetPassword] = useState('');
  const [wechatConfirmPassword, setWechatConfirmPassword] = useState('');

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const saveUserSession = (result: any) => {
    const payload = result?.data ?? result ?? {};
    const token = payload.token ?? payload.accessToken ?? payload.tempToken ?? '';
    const user = payload.user_login ?? payload.user ?? payload.userInfo ?? payload;

    Taro.setStorageSync('lxg_user', JSON.stringify({ token, user }));

    const loggedInUser = {
      id: String(user.id || user.userId || ''),
      nickname: user.nickname || user.phone || phone,
      avatar: user.avatar || '',
      phone: user.phone || phone,
      accountName: user.accountName || user.phone || phone,
      gender: user.gender || '保密',
      birthday: user.birthday || '请填写您的生日',
      registerDate: user.registerDate || user.created_at || getCurrentDate(),
      email: user.email || '',
      isLoggedIn: true
    };

    setUserInfo(loggedInUser);
    return loggedInUser;
  };

  const startCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setCountdown(60);
    let timer = 60;
    countdownRef.current = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer <= 0 && countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    }, 1000);
  };

  const sendCode = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '发送中...' });
    try {
      await apiPost(authApi.registerSendCode, { phone }, {}, {}, true);
      Taro.hideLoading();
      startCountdown();
      Taro.showToast({ title: '验证码已发送', icon: 'success' });
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '验证码发送失败', icon: 'none' });
    }
  };

  const doLogin = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    if (!password || password.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '登录中...' });
    try {
      const result = await apiPost(authApi.login, { phone, password }, {}, {}, true);
      const loggedInUser = saveUserSession(result);
      // 登录成功后获取完整用户信息
      try {
        const profileRes = await apiGet(userApi.profile);
        const normalized = normalizeUserProfile(profileRes);
        setUserInfo({
          id: normalized.id || loggedInUser.id,
          nickname: normalized.nickname || loggedInUser.nickname,
          avatar: normalized.avatar || loggedInUser.avatar,
          phone: normalized.phone || loggedInUser.phone,
          accountName: normalized.accountName || loggedInUser.accountName,
          gender: normalized.gender || loggedInUser.gender,
          birthday: normalized.birthday || loggedInUser.birthday,
          registerDate: normalized.registerDate || loggedInUser.registerDate,
          email: normalized.email || loggedInUser.email,
          isLoggedIn: true
        });
      } catch (profileErr) {
        console.error('获取用户信息失败，使用登录返回信息:', profileErr);
      }
      Taro.hideLoading();
      Taro.showToast({ title: '登录成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '登录失败', icon: 'none' });
    }
  };

  const doRegister = async () => {
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

    Taro.showLoading({ title: '注册中...' });
    try {
      const result = await apiPost(authApi.register, { phone, code, password }, {}, {}, true);
      Taro.hideLoading();
      saveUserSession(result);
      Taro.showToast({ title: '注册成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '注册失败', icon: 'none' });
    }
  };

  const handleAccountLogin = () => {
    if (isRegister) {
      doRegister();
    } else {
      doLogin();
    }
  };

  const handlePhoneLogin = () => {
    if (isRegister) {
      doRegister();
    } else {
      doLogin();
    }
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

  // 微信登录
  const handleWechatLogin = async () => {
    setIsWechatLogin(true);

    try {
      // #ifdef WEAPP
      Taro.login({
        success: async (res) => {
          if (res.code) {
            Taro.showLoading({ title: '微信登录中...' });
            try {
              const result = await apiPost(authApi.wechatLogin, { code: res.code }, {}, {}, true);
              Taro.hideLoading();
              handleWechatLoginResult(result);
            } catch (error: any) {
              Taro.hideLoading();
              // 如果返回需要设置密码的错误码
              const errCode = error?.code;
              const tempToken = error?.response?.data?.tempToken || error?.response?.data?.token || '';
              if (tempToken && (errCode === 403 || errCode === 422 || errCode === 400)) {
                setWechatTempToken(tempToken);
                setShowSetPasswordModal(true);
                Taro.showToast({ title: '请设置登录密码', icon: 'none' });
              } else {
                Taro.showToast({ title: error.message || '微信登录失败', icon: 'none' });
              }
            }
          } else {
            Taro.showToast({ title: '获取微信授权失败', icon: 'none' });
            setIsWechatLogin(false);
          }
        },
        fail: () => {
          Taro.showToast({ title: '微信登录失败', icon: 'none' });
          setIsWechatLogin(false);
        }
      });
      // #endif

      // #ifdef H5
      Taro.showLoading({ title: '微信登录中...' });
      // H5端模拟微信登录，实际需要跳转到微信授权页面
      // 这里先调用后端接口进行测试
      try {
        const result = await apiPost(authApi.wechatLogin, { openid: 'test_h5_openid' }, {}, {}, true);
        Taro.hideLoading();
        handleWechatLoginResult(result);
      } catch (error: any) {
        Taro.hideLoading();
        const errCode = error?.code;
        const tempToken = error?.response?.data?.tempToken || error?.response?.data?.token || '';
        if (tempToken && (errCode === 403 || errCode === 422 || errCode === 400)) {
          setWechatTempToken(tempToken);
          setShowSetPasswordModal(true);
          Taro.showToast({ title: '请设置登录密码', icon: 'none' });
        } else {
          Taro.showToast({ title: error.message || '微信登录失败', icon: 'none' });
        }
      }
      // #endif
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '微信登录失败', icon: 'none' });
    } finally {
      setIsWechatLogin(false);
    }
  };

  const handleWechatLoginResult = (result: any) => {
    const payload = result?.data ?? result ?? {};
    const needSetPassword = payload.needSetPassword || payload.need_set_password || false;
    const tempToken = payload.tempToken || payload.temp_token || '';

    if (needSetPassword && tempToken) {
      setWechatTempToken(tempToken);
      setShowSetPasswordModal(true);
      Taro.showToast({ title: '请设置登录密码', icon: 'none' });
    } else {
      saveUserSession(result);
      Taro.showToast({ title: '登录成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }
  };

  // 设置密码
  const handleSetPassword = async () => {
    if (!wechatSetPassword || wechatSetPassword.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }
    if (wechatSetPassword !== wechatConfirmPassword) {
      Taro.showToast({ title: '两次密码输入不一致', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '设置密码中...' });
    try {
      const result = await apiPost(authApi.setPassword, {
        tempToken: wechatTempToken,
        password: wechatSetPassword
      }, {}, {}, true);
      Taro.hideLoading();

      // 设置密码成功后自动登录
      const payload = result?.data ?? result ?? {};
      const token = payload.token ?? payload.accessToken ?? wechatTempToken;
      const user = payload.user_login ?? payload.user ?? payload.userInfo ?? payload;

      Taro.setStorageSync('lxg_user', JSON.stringify({ token, user }));

      const loggedInUser = {
        id: String(user.id || user.userId || ''),
        nickname: user.nickname || user.phone || '',
        avatar: user.avatar || '',
        phone: user.phone || '',
        accountName: user.accountName || user.phone || '',
        gender: user.gender || '保密',
        birthday: user.birthday || '请填写您的生日',
        registerDate: user.registerDate || user.created_at || getCurrentDate(),
        email: user.email || '',
        isLoggedIn: true
      };

      setUserInfo(loggedInUser);
      setShowSetPasswordModal(false);
      setWechatSetPassword('');
      setWechatConfirmPassword('');
      setWechatTempToken('');

      Taro.showToast({ title: '设置成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '设置密码失败', icon: 'none' });
    }
  };

  const toggleRegisterMode = () => {
    setIsRegister(!isRegister);
    setPassword('');
    setConfirmPassword('');
    setCode('');
  };

  const switchToPhoneLogin = () => {
    setLoginMethod('phone');
    setPassword('');
    setConfirmPassword('');
  };

  const switchToAccountLogin = () => {
    setLoginMethod('account');
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
            <View 
              className={`${styles.methodItem} ${isWechatLogin ? styles.disabledMethod : ''}`} 
              onClick={isWechatLogin ? undefined : handleWechatLogin}
            >
              <View className={styles.methodIcon}>
                <Text className={styles.iconText}>💬</Text>
              </View>
              <Text className={styles.methodLabel}>微信</Text>
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

      {/* 设置密码弹窗 */}
      {showSetPasswordModal && (
        <View className={styles.modalOverlay} onClick={() => setShowSetPasswordModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>设置登录密码</Text>
            <Text className={styles.modalDesc}>微信登录成功，请设置您的登录密码</Text>
            
            <View className={styles.inputGroup}>
              <Text className={styles.inputLabel}>新密码</Text>
              <View className={styles.inputRow}>
                <Text className={styles.inputIcon}>🔑</Text>
                <Input
                  className={styles.input}
                  password
                  placeholder="请输入密码（至少6位）"
                  value={wechatSetPassword}
                  onInput={(e) => setWechatSetPassword(e.detail.value)}
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
                  placeholder="请再次输入密码"
                  value={wechatConfirmPassword}
                  onInput={(e) => setWechatConfirmPassword(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.modalBtn} onClick={handleSetPassword}>
              确认设置
            </View>
            <View className={styles.modalCancel} onClick={() => {
              setShowSetPasswordModal(false);
              setWechatTempToken('');
              setWechatSetPassword('');
              setWechatConfirmPassword('');
            }}>
              取消
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginPage;
