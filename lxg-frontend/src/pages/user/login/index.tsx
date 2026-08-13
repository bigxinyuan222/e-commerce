import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import Taro, { useDidHide } from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiPost, apiGet } from '@/api/common';
import { authApi, userApi } from '@/api/user';
import { normalizeUserProfile } from '@/api/user/normalize';
import styles from '@/styles/user/login.module.scss';

/**
 * 将微信登录相关的后端错误映射为更易理解的提示
 * 主要用于区分"后端配置错误"与"用户操作错误"，方便排查
 */
function mapWechatError(err: any): string {
  const msg = err?.message || err?.msg || '';
  const statusCode = err?.statusCode;
  // 后端 500 内部错误（panic / 未捕获异常）
  if (statusCode === 500) {
    console.error('[微信登录] 后端 500 内部错误，请后端查看服务日志定位 panic 原因', err);
    return '登录服务异常，请稍后重试或联系客服';
  }
  // 后端调用微信接口时缺失 AppSecret
  if (msg.includes('41004') || /appsecret\s*missing/i.test(msg)) {
    console.error('[微信登录] 后端配置错误：缺失 AppSecret (41004)，请后端检查 WECHAT_APPSECRET 环境变量');
    return '微信登录服务配置异常，请联系客服';
  }
  // AppSecret 值错误
  if (msg.includes('40125') || /invalid\s*appsecret/i.test(msg)) {
    console.error('[微信登录] 后端配置错误：AppSecret 值无效 (40125)，请后端校验密钥');
    return '微信登录服务配置异常，请联系客服';
  }
  // code 无效或已过期
  if (msg.includes('40029') || /invalid\s*code/i.test(msg)) {
    return '微信授权已过期，请重试';
  }
  // code 已被使用
  if (msg.includes('40163') || /code\s*been\s*used/i.test(msg)) {
    return '登录请求重复，请重试';
  }
  // 缺少 code 参数
  if (msg.includes('41008') || /missing\s*code/i.test(msg)) {
    return '微信授权失败，请重试';
  }
  // 临时 token 过期
  if (/token\s*is\s*expired/i.test(msg) || /token\s*expired/i.test(msg) || msg.includes('token解析失败')) {
    return '登录超时，请重新登录';
  }
  // 兜底：如果是 HTTP 错误且后端未返回可读消息，显示通用提示
  if (statusCode && statusCode >= 500) {
    return '登录服务异常，请稍后重试';
  }
  return msg || '微信登录失败';
}

const LoginPage: React.FC = () => {
  const { setUserInfo } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'account'>('account');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 微信登录相关状态
  const [isWechatLogin, setIsWechatLogin] = useState(false);
  const [showPhoneAuthModal, setShowPhoneAuthModal] = useState(false);
  const [wechatTempToken, setWechatTempToken] = useState('');
  // 防抖：避免快速重复点击导致同一 code 被多次发送
  const wechatLoginLockRef = useRef(false);
  // 记录临时 token 获取时间，用于判断是否过期（临时 token 有效期 1 分钟）
  const wechatTempTokenTimeRef = useRef<number>(0);

  // H5 宽屏隐藏微信登录：屏幕宽度大于 768px 视为非移动端，不显示微信登录
  const [showWechatLogin, setShowWechatLogin] = useState(true);
  useEffect(() => {
    const checkScreenWidth = () => {
      // #ifdef H5
      const width = window.innerWidth;
      setShowWechatLogin(width <= 768);
      // #endif
      // #ifdef WEAPP
      setShowWechatLogin(true);
      // #endif
    };
    checkScreenWidth();
    // #ifdef H5
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
    // #endif
  }, []);

  // 微信登录后设置密码相关状态
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, []);

  // 页面隐藏时立即清除定时器，避免微信框架内部页面帧已销毁导致 __subPageFrameEndTime__ 报错
  useDidHide(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  });

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 登录/注册成功后跳转：有上一页则返回，否则跳到首页（避免直接进入登录页时 navigateBack 失败）
  const goBackOrHome = () => {
    const pages = Taro.getCurrentPages();
    if (pages.length > 1) {
      Taro.navigateBack();
    } else {
      Taro.switchTab({ url: '/pages/home/index' });
    }
  };

  const saveUserSession = (result: any, source = '登录') => {
    // data 可能为空字符串 ""（后端异常），需降级为空对象
    const rawData = result?.data;
    const payload = (rawData && typeof rawData === 'object') ? rawData
      : (result && typeof result === 'object' ? result : {});
    console.log(`[${source}] saveUserSession 原始响应:`, JSON.stringify(result));
    console.log(`[${source}] saveUserSession payload:`, JSON.stringify(payload));
    // 注意：不包含 tempToken —— 临时 token 不能作为登录态保存
    // 兼容 token 在顶层或嵌套在 user 对象中的多种返回结构
    const token = payload.token ?? payload.Token ?? payload.accessToken ?? payload.access_token
      ?? payload.userToken ?? payload.user_token
      ?? payload.user?.token ?? payload.user?.Token ?? payload.user?.accessToken ?? payload.user?.access_token
      ?? payload.user?.userToken ?? payload.user?.user_token
      ?? payload.data?.token ?? payload.data?.Token ?? '';
    const user = payload.user_login ?? payload.user ?? payload.userInfo ?? payload.data?.user ?? payload;

    console.log(`[${source}] 提取的 token:`, token ? `${token.substring(0, 10)}...（长度:${token.length}）` : '空');
    console.log(`[${source}] 提取的 user:`, user ? JSON.stringify(user).substring(0, 100) : '空');

    if (!token) {
      console.error(`[${source}] 响应中未找到有效 token，完整响应:`, JSON.stringify(result));
      throw new Error('登录失败：未获取到用户凭证');
    }

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

  const sendCode = async (scene: 'register' | 'reset' = 'register') => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '发送中...' });
    try {
      // 注册场景用 registerofsendcode（表单格式）；忘记密码场景用 resetpassword/sendcode（JSON 格式）
      if (scene === 'reset') {
        await apiPost(authApi.resetPasswordSendCode, { phone }, {}, {}, false, false);
      } else {
        await apiPost(authApi.registerSendCode, { phone }, {}, {}, true);
      }
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
      const loggedInUser = saveUserSession(result, '账号登录');
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
        goBackOrHome();
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
      // 步骤1：调用注册接口。注册成功后 data 为空是正常设计（注册接口不返回 token）
      await apiPost(authApi.register, { phone, code, password }, {}, {}, true);
      // 步骤2：注册成功后，用刚注册的手机号 + 密码调用登录接口获取 token
      Taro.showLoading({ title: '登录中...' });
      const loginResult = await apiPost(authApi.login, { phone, password }, {}, {}, true);
      const loggedInUser = saveUserSession(loginResult, '账号登录');
      // 步骤3：登录成功后获取完整用户信息
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
      Taro.showToast({ title: '注册成功', icon: 'success' });
      setTimeout(() => {
        goBackOrHome();
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

  const handleForgotPassword = async () => {
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
    try {
      // 调用 POST /api/v1/auth/resetpassword/reset，JSON 格式 { phone, code, password }
      await apiPost(authApi.resetPassword, { phone, code, password }, {}, {}, false, false);
      Taro.hideLoading();
      Taro.showToast({ title: '密码重置成功', icon: 'success' });

      setTimeout(() => {
        setIsForgotPassword(false);
        setPhone('');
        setCode('');
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '重置密码失败', icon: 'none' });
    }
  };

  // 微信登录
  const handleWechatLogin = async () => {
    // 防抖：防止快速重复点击
    if (wechatLoginLockRef.current || isWechatLogin) return;
    wechatLoginLockRef.current = true;
    setIsWechatLogin(true);

    // 清除可能残留的旧 token，避免污染本次登录
    Taro.removeStorageSync('lxg_user');

    try {
      // #ifdef WEAPP
      // 弹性模式：封装 Taro.login 为 Promise，便于重试时重新获取 code
      const fetchWechatCode = (): Promise<string> => new Promise((resolve, reject) => {
        Taro.login({
          success: (res) => res.code ? resolve(res.code) : reject(new Error('获取微信授权失败')),
          fail: () => reject(new Error('微信登录失败')),
        });
      });

      // 核心登录逻辑：传入 code，调用后端接口并处理结果
      const callWeixinLogin = async (code: string) => {
        const result = await apiPost(authApi.wechatLogin, { code }, {}, {}, false);

        // 步骤3：解析返回的 token 和布尔值
        const payload = result?.data ?? result ?? {};
        const needPhone = payload.needPhone ?? payload.need_phone ?? payload.NeedPhone
          ?? payload.isNewUser ?? payload.is_new_user ?? payload.IsNewUser
          ?? payload.bindPhone ?? payload.bind_phone ?? payload.BindPhone
          ?? payload.needBindPhone ?? payload.need_bind_phone
          ?? payload.isRegister ?? payload.is_register ?? payload.IsRegister
          ?? false;
        // 提取 token 并 trim，防止首尾空白/BOM 导致后端解析失败
        const rawToken = payload.token ?? payload.Token ?? payload.tempToken ?? payload.temp_token ?? '';
        const token = typeof rawToken === 'string' ? rawToken.trim() : '';

        // 诊断日志：分析 weixinlogin 返回的 token 结构，帮助后端定位 weixinphone 解析失败问题
        const tokenParts = token ? token.split('.') : [];
        console.log('[微信登录] weixinlogin 返回:', {
          needPhone,
          hasToken: !!token,
          tokenLength: token.length,
          tokenPrefix: token ? token.substring(0, 20) : '',
          tokenSuffix: token ? token.substring(Math.max(0, token.length - 20)) : '',
          // JWT 由 3 段用 . 分隔的 base64 组成；若分段数≠3 说明不是标准 JWT
          isJwtFormat: tokenParts.length === 3,
          tokenPartsCount: tokenParts.length,
          payloadFields: Object.keys(payload),
          rawPayload: JSON.stringify(payload).substring(0, 300)
        });

        if (needPhone && token) {
          // 步骤4：布尔值为 true，token 是专用于第二个接口的临时 token（1分钟有效期）
          setWechatTempToken(token);
          wechatTempTokenTimeRef.current = Date.now();
          setShowPhoneAuthModal(true);
        } else {
          // 步骤5：布尔值为 false，token 是正常的 240 小时用户 token
          saveUserSession(result, '微信登录');
          Taro.showToast({ title: '登录成功', icon: 'success' });
          setTimeout(() => { goBackOrHome(); }, 1500);
        }
      };

      // 判断是否为可重试的瞬时错误（40029 invalid code 等）
      const isRetryableWechatError = (err: any): boolean => {
        const msg = err?.message || err?.msg || '';
        return msg.includes('40029') || /invalid\s*code/i.test(msg)
          || msg.includes('40163') || /code\s*been\s*used/i.test(msg);
      };

      Taro.showLoading({ title: '微信登录中...' });
      try {
        // 步骤1：获取 code
        const code = await fetchWechatCode();
        console.log(`[微信登录] code 获取成功，前缀: ${code.substring(0, 8)}...，长度: ${code.length}`);

        // 步骤2：调用微信登录接口
        try {
          await callWeixinLogin(code);
        } catch (error: any) {
          // 弹性重试：遇到 40029 等瞬时错误时，重新获取 code 并重试一次
          if (isRetryableWechatError(error)) {
            console.warn('[微信登录] 首次请求失败（瞬时错误），重新获取 code 并重试:', error.message);
            Taro.showLoading({ title: '重新登录中...' });
            const freshCode = await fetchWechatCode();
            console.log(`[微信登录] 重试 code 获取成功，前缀: ${freshCode.substring(0, 8)}...`);
            await callWeixinLogin(freshCode);
          } else {
            throw error;
          }
        }
      } catch (error: any) {
        Taro.showToast({ title: mapWechatError(error), icon: 'none' });
      } finally {
        Taro.hideLoading();
        setIsWechatLogin(false);
        wechatLoginLockRef.current = false;
      }
      // #endif

      // #ifdef H5
      // H5 端无法调用 Taro.login 获取微信 code，提示用户在微信小程序中打开
      Taro.showToast({ title: '请在微信小程序中打开', icon: 'none' });
      setIsWechatLogin(false);
      wechatLoginLockRef.current = false;
      // #endif
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: mapWechatError(error), icon: 'none' });
      setIsWechatLogin(false);
      wechatLoginLockRef.current = false;
    }
  };

  // 获取微信手机号
  // 步骤4（续）：用户点击「获取手机号」按钮后，微信返回一个与登录 code 不同的 phone code
  // 然后调用第二个接口 weixinphone，传递参数：code, token
  const handleGetPhoneNumber = async (e: any) => {
    // 用户拒绝授权
    if (e.detail.errMsg && e.detail.errMsg.indexOf('ok') === -1) {
      Taro.showToast({ title: '已取消手机号授权', icon: 'none' });
      return;
    }

    const phoneCode = e.detail.code;
    if (!phoneCode) {
      Taro.showToast({ title: '获取手机号授权码失败', icon: 'none' });
      return;
    }

    if (!wechatTempToken) {
      Taro.showToast({ title: '登录态异常，请重新登录', icon: 'none' });
      setShowPhoneAuthModal(false);
      return;
    }

    // 刷新临时 token：重新获取 loginCode 并调用 weixinlogin
    // 用于 token 过期或快过期时自动刷新，避免用户重新操作
    const refreshTempToken = async (): Promise<string> => {
      console.log('[微信登录] 临时 token 过期，自动刷新中...');
      Taro.showLoading({ title: '刷新登录态...' });
      const newCode = await new Promise<string>((resolve, reject) => {
        Taro.login({
          success: (res) => res.code ? resolve(res.code) : reject(new Error('获取微信授权失败')),
          fail: () => reject(new Error('微信登录失败')),
        });
      });
      const loginResult = await apiPost(authApi.wechatLogin, { code: newCode }, {}, {}, false);
      const loginPayload = loginResult?.data ?? loginResult ?? {};
      const rawNewToken = loginPayload.token ?? loginPayload.Token ?? loginPayload.tempToken ?? loginPayload.temp_token ?? '';
      const newToken = typeof rawNewToken === 'string' ? rawNewToken.trim() : '';
      if (!newToken) throw new Error('刷新登录态失败');
      setWechatTempToken(newToken);
      wechatTempTokenTimeRef.current = Date.now();
      console.log('[微信登录] 临时 token 刷新成功，长度:', newToken.length);
      return newToken;
    };

    // 检查临时 token 是否快过期（超过 40 秒就刷新，确保 weixinphone 调用时 token 仍有效）
    let currentToken = wechatTempToken;
    const tokenAge = Date.now() - wechatTempTokenTimeRef.current;
    try {
      if (tokenAge > 40000) {
        console.warn(`[微信登录] 临时 token 年龄 ${Math.floor(tokenAge / 1000)}秒，自动刷新`);
        currentToken = await refreshTempToken();
      } else {
        console.log(`[微信登录] 临时 token 年龄: ${Math.floor(tokenAge / 1000)}秒，有效`);
      }

      Taro.showLoading({ title: '登录中...' });
      // 调用第二个接口：获取微信手机号，传递 code 和 token
      // 后端 weixinphone 接口需要 Authorization 头认证（临时 token）
      // 同时请求体也传 token，满足后端双重校验需求
      console.log('[微信登录] 调用 weixinphone，参数:', {
        phoneCodePrefix: phoneCode.substring(0, 8) + '...',
        phoneCodeLength: phoneCode.length,
        tokenPrefix: currentToken.substring(0, 15) + '...',
        tokenLength: currentToken.length,
        authHeader: `Bearer ${currentToken.substring(0, 15)}...`
      });
      const result = await apiPost(authApi.wechatPhone, {
        code: phoneCode,
        token: currentToken
      }, {}, {}, false, false, {
        'Authorization': `Bearer ${currentToken}`
      });
      Taro.hideLoading();

      // 步骤6：获取登录成功响应
      saveUserSession(result, '微信手机号');

      // 校验是否成功提取到用户 token
      const savedToken = JSON.parse(Taro.getStorageSync('lxg_user') || '{}').token;
      if (!savedToken) {
        console.error('[微信登录] weixinphone 响应中未找到用户 token，响应结构:', JSON.stringify(result));
        Taro.showToast({ title: '登录异常，请重试', icon: 'none' });
        return;
      }

      // 登录成功后：关闭手机号弹窗，弹出设置密码弹窗
      // 微信新用户无密码，需要设置密码以便后续账号密码登录
      setShowPhoneAuthModal(false);
      setWechatTempToken('');
      setShowSetPasswordModal(true);
    } catch (error: any) {
      Taro.hideLoading();
      // 如果是 token 过期/解析失败，尝试刷新 token 并重试一次（phoneCode 仍有效）
      const errMsg = error?.message || error?.msg || '';
      if (/token\s*(is\s*)?expired/i.test(errMsg) || errMsg.includes('token解析失败') || errMsg.includes('缺少认证信息')) {
        console.warn('[微信登录] weixinphone 调用失败（token 问题），尝试刷新 token 并重试:', errMsg);
        try {
          const freshToken = await refreshTempToken();
          Taro.showLoading({ title: '登录中...' });
          const retryResult = await apiPost(authApi.wechatPhone, {
            code: phoneCode,
            token: freshToken
          }, {}, {}, false, false, {
            'Authorization': `Bearer ${freshToken}`
          });
          Taro.hideLoading();
          saveUserSession(retryResult, '微信手机号');
          const retryToken = JSON.parse(Taro.getStorageSync('lxg_user') || '{}').token;
          if (!retryToken) {
            console.error('[微信登录] 重试后仍未找到用户 token，响应结构:', JSON.stringify(retryResult));
            Taro.showToast({ title: '登录异常，请重试', icon: 'none' });
            return;
          }
          // 重试成功：同样弹出设置密码弹窗
          setShowPhoneAuthModal(false);
          setWechatTempToken('');
          setShowSetPasswordModal(true);
          return;
        } catch (retryError: any) {
          Taro.hideLoading();
          console.error('[微信登录] 刷新 token 重试失败:', retryError);
          setWechatTempToken('');
          Taro.showToast({ title: mapWechatError(retryError), icon: 'none' });
          return;
        }
      }
      setWechatTempToken('');
      // 步骤6：获取登录失败响应
      Taro.showToast({ title: mapWechatError(error), icon: 'none' });
    }
  };

  // 微信登录后设置密码
  // 调用 POST /api/v1/auth/setpassword，需用户已登录（带正式 token）
  const handleSetPassword = async () => {
    if (isSettingPassword) return;
    if (!newPassword || newPassword.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Taro.showToast({ title: '两次密码输入不一致', icon: 'none' });
      return;
    }

    setIsSettingPassword(true);
    Taro.showLoading({ title: '设置中...' });
    try {
      // setpassword 接口使用 JSON 格式提交，复用登录态 token（已写入 storage）
      await apiPost(authApi.setPassword, { password: newPassword }, {}, {}, false);
      Taro.hideLoading();
      setShowSetPasswordModal(false);
      setNewPassword('');
      setConfirmNewPassword('');
      Taro.showToast({ title: '密码设置成功', icon: 'success' });
      setTimeout(() => {
        goBackOrHome();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      console.error('[微信登录] 设置密码失败:', error);
      Taro.showToast({ title: error?.message || '设置密码失败', icon: 'none' });
    } finally {
      setIsSettingPassword(false);
    }
  };

  // 跳过设置密码，直接返回上一页
  const skipSetPassword = () => {
    setShowSetPasswordModal(false);
    setNewPassword('');
    setConfirmNewPassword('');
    goBackOrHome();
  };

  const toggleRegisterMode = () => {
    setIsRegister(!isRegister);
    setPassword('');
    setConfirmPassword('');
    setCode('');
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
                  onClick={countdown === 0 ? () => sendCode('reset') : undefined}
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
                    onClick={countdown === 0 ? () => sendCode('register') : undefined}
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
            <View
              className={`${styles.methodItem} ${isWechatLogin ? styles.disabledMethod : ''} ${showWechatLogin ? '' : styles.methodItemHidden}`}
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

      {/* 微信手机号授权弹窗 */}
      {showPhoneAuthModal && (
        <View className={styles.modalOverlay} onClick={() => setShowPhoneAuthModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>绑定手机号</Text>
            <Text className={styles.modalDesc}>微信登录需要绑定手机号，请尽快点击下方按钮完成授权（1分钟内有效）</Text>

            {/* #ifdef WEAPP */}
            <Button
              className={styles.modalBtn}
              openType="getPhoneNumber"
              onGetPhoneNumber={handleGetPhoneNumber}
            >
              获取手机号
            </Button>
            {/* #endif */}

            {/* #ifdef H5 */}
            <View className={styles.modalBtn} onClick={() => {
              // H5 端模拟获取手机号
              handleGetPhoneNumber({ detail: { code: 'test_h5_phone_code', errMsg: 'getPhoneNumber:ok' } });
            }}>
              获取手机号
            </View>
            {/* #endif */}

            <View className={styles.modalCancel} onClick={() => {
              setShowPhoneAuthModal(false);
              setWechatTempToken('');
              wechatTempTokenTimeRef.current = 0;
            }}>
              取消
            </View>
          </View>
        </View>
      )}

      {/* 微信登录后设置密码弹窗 */}
      {showSetPasswordModal && (
        <View className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>设置登录密码</Text>
            <Text className={styles.modalDesc}>微信登录成功，请为账号设置登录密码，以便后续使用账号密码登录</Text>

            <View className={styles.modalInputGroup}>
              <Text className={styles.modalInputLabel}>新密码</Text>
              <View className={styles.modalInputRow}>
                <Text className={styles.modalInputIcon}>🔑</Text>
                <Input
                  className={styles.modalInput}
                  password
                  placeholder="请输入新密码（至少6位）"
                  value={newPassword}
                  onInput={(e) => setNewPassword(e.detail.value)}
                />
              </View>
            </View>

            <View className={styles.modalInputGroup}>
              <Text className={styles.modalInputLabel}>确认密码</Text>
              <View className={styles.modalInputRow}>
                <Text className={styles.modalInputIcon}>🔑</Text>
                <Input
                  className={styles.modalInput}
                  password
                  placeholder="请再次输入新密码"
                  value={confirmNewPassword}
                  onInput={(e) => setConfirmNewPassword(e.detail.value)}
                />
              </View>
            </View>

            <View
              className={`${styles.modalLoginBtn} ${isSettingPassword ? styles.disabled : ''}`}
              onClick={isSettingPassword ? undefined : handleSetPassword}
            >
              {isSettingPassword ? '设置中...' : '确认设置'}
            </View>

            <View className={styles.modalCancel} onClick={skipSetPassword}>
              跳过
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginPage;
