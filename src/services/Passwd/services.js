import axios from 'axios';

import appPathList from '../services';

const { newMobileTelephoneCode, updatePassword } = appPathList;

// 获取修改密码短信验证码
/**
 *
 * @param {电话号码} telephone
 */
const fetchPhoneCode = async (telephone) => {
  const res = axios({
    method: 'post',
    url: newMobileTelephoneCode,
    data: { telephone },
  });
  return res;
};


/**
 *
 * @param {电话, 短信验证码, 初始化密码, 确认密码, uuid} params
 */
const updatePasswd = async (params) => {
  const res = axios({
    method: 'post',
    url: updatePassword,
    data: params,
  });
  return res;
};

export { fetchPhoneCode, updatePasswd };
