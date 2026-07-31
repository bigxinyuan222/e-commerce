import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiPut } from '@/api/common';
import { userApi } from '@/api/user';
import styles from '@/styles/user/account-name.module.scss';

const AccountNamePage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const [accountName, setAccountName] = useState(userInfo?.accountName || '');
  const [canModify] = useState(true);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleConfirm = () => {
    if (!accountName || accountName.length < 6) {
      Taro.showToast({ title: '账号名至少6位', icon: 'none' });
      return;
    }

    if (/[\s@#$%^&*()+=|{}':;',.<>/?~]/.test(accountName)) {
      Taro.showToast({ title: '账号名不能包含特殊字符', icon: 'none' });
      return;
    }

    Taro.showModal({
      title: '确认更改',
      content: '账号名一年仅允许更改一次，确定要更改吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            Taro.showLoading({ title: '保存中...' });
            await apiPut(userApi.updateProfile, { accountName });
            Taro.hideLoading();
            const updatedUser = { ...userInfo!, accountName, isLoggedIn: true };
            setUserInfo(updatedUser);
            Taro.showToast({ title: '修改成功', icon: 'success' });
            setTimeout(() => { Taro.navigateBack(); }, 1500);
          } catch (err: any) {
            Taro.hideLoading();
            // 即使接口失败，也本地更新
            const updatedUser = { ...userInfo!, accountName, isLoggedIn: true };
            setUserInfo(updatedUser);
            Taro.showToast({ title: err.message || '修改失败，已本地保存', icon: 'none' });
            setTimeout(() => { Taro.navigateBack(); }, 1500);
          }
        }
      }
    });
  };

  return (
    <View className={styles.accountNamePage}>
      {/* 顶部导航栏 */}
      <View className={styles.header}>
        <View className={styles.backBtn} onClick={handleBack}>
          <Text className={styles.backIcon}>‹</Text>
        </View>
        <Text className={styles.headerTitle}>认证</Text>
        <View className={styles.headerRight}></View>
      </View>

      {/* 内容区域 */}
      <View className={styles.content}>
        <View className={styles.infoBox}>
          <Text className={styles.label}>账号名</Text>
          <View className={styles.inputRow}>
            <Input
              className={styles.input}
              type="text"
              placeholder="请输入账号名"
              value={accountName}
              onInput={(e) => setAccountName(e.detail.value)}
              disabled={!canModify}
            />
          </View>
          <Text className={styles.tip}>账号名是账号的唯一凭证，一年仅允许更改一次</Text>
        </View>

        <View className={styles.confirmBtn} onClick={handleConfirm}>
          <Text className={styles.btnText}>确认更改</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountNamePage;
