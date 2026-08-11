// ============================================
// 用户信息字段规范化
// 兼容后端可能返回的 snake_case / PascalCase / camelCase 字段
// ============================================

export interface NormalizedUserProfile {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  accountName: string;
  gender: string;
  birthday: string;
  registerDate: string;
  email: string;
}

/**
 * 从原始后端响应中提取字符串值，兼容多种字段命名风格
 */
function pickStr(obj: any, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== '') return String(v);
  }
  return '';
}

/**
 * 规范化用户信息接口返回数据
 * 兼容 id/ID/userId/UserId, nickname/NickName/nick_name 等字段
 */
export function normalizeUserProfile(raw: any): NormalizedUserProfile {
  if (!raw || typeof raw !== 'object') {
    return {
      id: '', nickname: '', avatar: '', phone: '',
      accountName: '', gender: '保密', birthday: '请填写您的生日',
      registerDate: '', email: ''
    };
  }

  // 后端返回可能包裹在 data 字段内
  const data = raw.data ?? raw;

  return {
    id: pickStr(data, ['id', 'ID', 'userId', 'UserId', 'user_id', 'uid', 'Uid']),
    nickname: pickStr(data, ['nickname', 'NickName', 'nick_name', 'name', 'Name', 'userName', 'UserName', 'user_name']),
    avatar: pickStr(data, ['avatar', 'Avatar', 'avatarUrl', 'AvatarUrl', 'avatar_url', 'headImg', 'head_img', 'HeadImg']),
    phone: pickStr(data, ['phone', 'Phone', 'mobile', 'Mobile', 'phoneNum', 'phone_num', 'PhoneNumber', 'phoneNumber']),
    accountName: pickStr(data, ['accountName', 'AccountName', 'account_name', 'account', 'Account', 'loginName', 'login_name']),
    gender: pickStr(data, ['gender', 'Gender', 'sex', 'Sex']) || '保密',
    birthday: pickStr(data, ['birthday', 'Birthday', 'birth', 'Birth', 'birthDate', 'birth_date']) || '请填写您的生日',
    registerDate: pickStr(data, ['registerDate', 'RegisterDate', 'register_date', 'created_at', 'createdAt', 'CreatedAt', 'createTime', 'create_time']),
    email: pickStr(data, ['email', 'Email', 'eMail', 'mail', 'Mail'])
  };
}
