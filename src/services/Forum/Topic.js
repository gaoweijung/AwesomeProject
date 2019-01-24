import axios from 'axios';

import appPathList from '../services';

const { rootPath } = appPathList;

// 列出所有主题
/**
 * pageNum 页数
 * pageSize 主题/页
 * sort 主题排序根据
 * sort = 1 创建时间顺序
 * sort = 2 评论数倒序
 * sort = 3 关注数倒序
 * title 主题名
 */
const getTopicList = () => axios.get(`${rootPath}/topic/list.shtml`);

export { getTopicList };

// 获取评论
/**
 * @params
 * topicId 主题id
 * @return
 * promis
 */
const getTopicComment = () => axios.get(`${rootPath}/comment/listCommentForTopic.shtml`);

export { getTopicComment };
