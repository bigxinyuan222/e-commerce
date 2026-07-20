import React, { useState, useEffect } from 'react';
import { View, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import styles from '@/styles/user/personal-info.module.scss';

const PersonalInfoPage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();
  
  const [formData, setFormData] = useState({
    avatar: userInfo?.avatar || 'https://picsum.photos/id/64/200/200',
    accountName: userInfo?.accountName || 'xgqfpKztPcYe',
    nickname: userInfo?.nickname || '乐享购用户',
    gender: userInfo?.gender || '保密',
    birthday: userInfo?.birthday || '请填写您的生日',
    registerDate: userInfo?.registerDate || '2023-08-15'
  });

  // 切换账号
  const handleSwitchAccount = () => {
    Taro.showModal({
      title: '切换账号',
      content: '确定要切换到其他账号吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          Taro.removeStorageSync('userInfo');
          setUserInfo({
            id: '',
            avatar: '',
            nickname: '',
            phone: '',
            gender: '',
            birthday: '',
            registerDate: '',
            accountName: '',
            email: '',
            isLoggedIn: false
          });
          // 跳转到登录页面
          Taro.navigateTo({ url: '/pages/user/login/index' });
        }
      }
    });
  };

  // 退出登录
  const handleLogout = () => {
    Taro.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          Taro.removeStorageSync('userInfo');
          setUserInfo({
            id: '',
            avatar: '',
            nickname: '',
            phone: '',
            gender: '',
            birthday: '',
            registerDate: '',
            accountName: '',
            email: '',
            isLoggedIn: false
          });
          // 返回首页
          Taro.switchTab({ url: '/pages/home/index' });
        }
      }
    });
  };

  // 日期选择器相关状态
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  
  // 头像选择弹窗状态
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  // 昵称修改弹窗状态
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  
  // 性别选择弹窗状态
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  // 生成年份列表（1900-2100）
  const generateYears = () => {
    const years: number[] = [];
    for (let i = 1900; i <= 2100; i++) {
      years.push(i);
    }
    return years;
  };

  // 生成月份列表
  const generateMonths = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  };

  // 生成日期列表
  const generateDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // 处理日期选择确认
  const handleDateConfirm = () => {
    const birthdayStr = `${selectedYear}年${String(selectedMonth).padStart(2, '0')}月${String(selectedDay).padStart(2, '0')}日`;
    setFormData({ ...formData, birthday: birthdayStr });
    setUserInfo({ ...userInfo!, birthday: birthdayStr });
    setShowDatePicker(false);
    Taro.showToast({ title: '修改成功', icon: 'success' });
  };

  const handleItemClick = (title: string) => {
    switch (title) {
      case '头像':
        setShowAvatarPicker(true);
        break;
      case '账号/手机号':
        Taro.navigateTo({ url: '/pages/user/account-name/index' });
        break;
      case '昵称':
        setNicknameInput(formData.nickname);
        setShowNicknameModal(true);
        break;
      case '性别':
        setShowGenderPicker(true);
        break;
      case '出生日期':
        if (formData.birthday !== '请填写您的生日') {
          const match = formData.birthday.match(/(\d+)年(\d+)月(\d+)日/);
          if (match) {
            setSelectedYear(parseInt(match[1]));
            setSelectedMonth(parseInt(match[2]));
            setSelectedDay(parseInt(match[3]));
          }
        }
        setShowDatePicker(true);
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    Taro.navigateBack({
      fail: () => {
        Taro.switchTab({ url: '/pages/user/mine/index' });
      }
    });
  };

  // 监听年份或月份变化，确保日期有效
  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedYear, selectedMonth]);

  const years = generateYears();
  const months = generateMonths();
  const days = generateDays();

  return (
    <View className={styles.personalInfoPage}>
      {/* 顶部导航栏 */}
      <View className={styles.header}>
        <View className={styles.backBtn} onClick={handleBack}>
          <Text className={styles.backIcon}>‹</Text>
        </View>
        <Text className={styles.headerTitle}>个人信息</Text>
        <View className={styles.headerRight}></View>
      </View>

      {/* 内容区域 */}
      <View className={styles.content}>
        {/* 头像 */}
        <View className={styles.infoItem} onClick={() => handleItemClick('头像')}>
          <Text className={styles.itemLabel}>头像</Text>
          <View className={styles.itemContent}>
            <Image src={formData.avatar} className={styles.avatar} mode="aspectFill" />
            <Text className={styles.itemArrow}>›</Text>
          </View>
        </View>

        {/* 账号/手机号 */}
        <View className={styles.infoItem} onClick={() => handleItemClick('账号/手机号')}>
          <Text className={styles.itemLabel}>账号/手机号</Text>
          <View className={styles.itemContent}>
            <Text className={styles.itemValue}>{formData.accountName}</Text>
            <Text className={styles.itemArrow}>›</Text>
          </View>
        </View>

        {/* 昵称 */}
        <View className={styles.infoItem} onClick={() => handleItemClick('昵称')}>
          <Text className={styles.itemLabel}>昵称</Text>
          <View className={styles.itemContent}>
            <Text className={styles.itemValue}>{formData.nickname}</Text>
            <Text className={styles.itemArrow}>›</Text>
          </View>
        </View>

        {/* 性别 */}
        <View className={styles.infoItem} onClick={() => handleItemClick('性别')}>
          <Text className={styles.itemLabel}>性别</Text>
          <View className={styles.itemContent}>
            <Text className={styles.itemValue}>{formData.gender}</Text>
            <Text className={styles.itemArrow}>›</Text>
          </View>
        </View>

        {/* 出生日期 */}
        <View className={styles.infoItem} onClick={() => handleItemClick('出生日期')}>
          <Text className={styles.itemLabel}>出生日期</Text>
          <View className={styles.itemContent}>
            <Text className={styles.itemValue}>{formData.birthday}</Text>
            <Text className={styles.itemArrow}>›</Text>
          </View>
        </View>

        {/* 注册日期 */}
        <View className={styles.infoItem}>
          <Text className={styles.itemLabel}>注册日期</Text>
          <Text className={styles.itemValue}>{formData.registerDate}</Text>
        </View>
      </View>

      {/* 账号操作区域 */}
      <View className={styles.accountSection}>
        <View className={styles.accountBtn} onClick={handleSwitchAccount}>
          <Text className={styles.accountBtnText}>切换账号</Text>
        </View>
        <View className={styles.accountBtn + ' ' + styles.accountBtnLogout} onClick={handleLogout}>
          <Text className={styles.accountBtnText}>退出登录</Text>
        </View>
      </View>

      {/* 日期选择器弹窗 */}
      {showDatePicker && (
        <View className={styles.datePickerOverlay} onClick={() => setShowDatePicker(false)}>
          <View className={styles.datePickerContent} onClick={(e) => e.stopPropagation()}>
            {/* 日期选择器头部 */}
            <View className={styles.datePickerHeader}>
              <Text className={styles.datePickerCancel} onClick={() => setShowDatePicker(false)}>取消</Text>
              <Text className={styles.datePickerConfirm} onClick={handleDateConfirm}>确定</Text>
            </View>
            
            {/* 日期选择器滚轮区域 */}
            <View className={styles.datePickerWheels}>
              {/* 年份选择 */}
              <View className={styles.wheel}>
                {years.map((year) => (
                  <Text 
                    key={year}
                    className={`${styles.wheelItem} ${selectedYear === year ? styles.wheelItemActive : ''}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}年
                  </Text>
                ))}
              </View>
              
              {/* 月份选择 */}
              <View className={styles.wheel}>
                {months.map((month) => (
                  <Text 
                    key={month}
                    className={`${styles.wheelItem} ${selectedMonth === month ? styles.wheelItemActive : ''}`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {String(month).padStart(2, '0')}月
                  </Text>
                ))}
              </View>
              
              {/* 日期选择 */}
              <View className={styles.wheel}>
                {days.map((day) => (
                  <Text 
                    key={day}
                    className={`${styles.wheelItem} ${selectedDay === day ? styles.wheelItemActive : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {String(day).padStart(2, '0')}日
                  </Text>
                ))}
              </View>
            </View>
            
            {/* 选中线 */}
            <View className={styles.datePickerLine}></View>
          </View>
        </View>
      )}

      {/* 头像选择弹窗 */}
      {showAvatarPicker && (
        <View className={styles.avatarPickerOverlay} onClick={() => setShowAvatarPicker(false)}>
          <View className={styles.avatarPickerContent} onClick={(e) => e.stopPropagation()}>
            <View className={styles.avatarPickerHeader}>
              <Text className={styles.avatarPickerTitle}>选择图片</Text>
              <Text className={styles.avatarPickerClose} onClick={() => setShowAvatarPicker(false)}>×</Text>
            </View>
            <View className={styles.avatarPickerBody}>
                <View className={styles.avatarPickerOption} onClick={() => { setShowAvatarPicker(false); Taro.showToast({ title: '从相册选择', icon: 'none' }); }}>
                  <Text className={styles.avatarPickerOptionText}>从相册选择</Text>
                </View>
                <View className={styles.avatarPickerDivider}></View>
                <View className={styles.avatarPickerOption} onClick={() => { setShowAvatarPicker(false); Taro.showToast({ title: '拍照功能', icon: 'none' }); }}>
                  <Text className={styles.avatarPickerOptionText}>拍照</Text>
                </View>
              </View>
            <View className={styles.avatarPickerCancel} onClick={() => setShowAvatarPicker(false)}>
              <Text className={styles.avatarPickerCancelText}>取消</Text>
            </View>
          </View>
        </View>
      )}

      {/* 昵称修改弹窗 */}
      {showNicknameModal && (
        <View className={styles.nicknameModalOverlay} onClick={() => setShowNicknameModal(false)}>
          <View className={styles.nicknameModalContent} onClick={(e) => e.stopPropagation()}>
            <View className={styles.nicknameModalHeader}>
              <Text className={styles.nicknameModalTitle}>修改昵称</Text>
            </View>
            <View className={styles.nicknameModalBody}>
              <Input 
                className={styles.nicknameInput} 
                value={nicknameInput}
                onInput={(e: any) => setNicknameInput(e.detail.value)}
                placeholder="请输入新昵称"
                maxlength={20}
              />
            </View>
            <View className={styles.nicknameModalFooter}>
              <View className={styles.nicknameModalBtn} onClick={() => setShowNicknameModal(false)}>
                <Text className={styles.nicknameModalBtnText}>取消</Text>
              </View>
              <View className={styles.nicknameModalBtn} onClick={() => {
                if (nicknameInput.trim()) {
                  setFormData({ ...formData, nickname: nicknameInput.trim() });
                  setUserInfo({ ...userInfo!, nickname: nicknameInput.trim() });
                  setShowNicknameModal(false);
                  Taro.showToast({ title: '修改成功', icon: 'success' });
                } else {
                  Taro.showToast({ title: '请输入昵称', icon: 'none' });
                }
              }}>
                <Text className={styles.nicknameModalBtnText + ' ' + styles.nicknameModalBtnConfirm}>确定</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 性别选择弹窗 */}
      {showGenderPicker && (
        <View className={styles.genderPickerOverlay} onClick={() => setShowGenderPicker(false)}>
          <View className={styles.genderPickerContent} onClick={(e) => e.stopPropagation()}>
            <View className={styles.genderPickerHeader}>
              <Text className={styles.genderPickerTitle}>选择性别</Text>
              <Text className={styles.genderPickerClose} onClick={() => setShowGenderPicker(false)}>×</Text>
            </View>
            <View className={styles.genderPickerBody}>
              <View className={styles.genderPickerOption} onClick={() => {
                setFormData({ ...formData, gender: '男' });
                setUserInfo({ ...userInfo!, gender: '男' });
                setShowGenderPicker(false);
              }}>
                <Text className={styles.genderPickerOptionText}>男</Text>
              </View>
              <View className={styles.genderPickerDivider}></View>
              <View className={styles.genderPickerOption} onClick={() => {
                setFormData({ ...formData, gender: '女' });
                setUserInfo({ ...userInfo!, gender: '女' });
                setShowGenderPicker(false);
              }}>
                <Text className={styles.genderPickerOptionText}>女</Text>
              </View>
              <View className={styles.genderPickerDivider}></View>
              <View className={styles.genderPickerOption} onClick={() => {
                setFormData({ ...formData, gender: '保密' });
                setUserInfo({ ...userInfo!, gender: '保密' });
                setShowGenderPicker(false);
              }}>
                <Text className={styles.genderPickerOptionText}>保密</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PersonalInfoPage;
